import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import * as Icon from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { getFeaturedRestaurants, getCategories } from '@/api';
import { urlFor } from '@/sanity';
import FeaturedRow from '@/components/featuredRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from 'expo-router';

export default function HomeScreen({ user }) {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const scrollViewRef = useRef(null); // Ref for main ScrollView
  const categoryRefs = useRef({}); // Object to store refs for each category
  const auth = getAuth(); // Initialize Firebase auth
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch restaurants and categories
    getFeaturedRestaurants().then((data) => {
      setFeaturedRestaurants(data);
      setFilteredRestaurants(data); // Initialize filtered list
    });

    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  // Handle Search
  const handleSearch = (text) => {
    setSearchQuery(text);

    if (text.trim() === '') {
      setFilteredRestaurants(featuredRestaurants);
    } else {
      const filtered = featuredRestaurants.map((row) => ({
        ...row,
        restaurants: row.restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(text.toLowerCase())
        ),
      })).filter((row) => row.restaurants.length > 0);

      setFilteredRestaurants(filtered);
    }
  };

  // Open Google Maps
  const openGoogleMaps = () => {
    const url = 'https://www.google.com/maps/place/Lahore,+Pakistan';
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  // Scroll to the selected category
  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId); // Set active category
    if (categoryRefs.current[categoryId]) {
      // Scroll to the category ref
      categoryRefs.current[categoryId].measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
        }
      );
    }
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'Logged out successfully!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout Error:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView className="bg-white">
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-4 pb-2">
        <View className="flex-row items-center justify-between">
          {/* Welcome Message */}
          <Text className="text-lg font-bold text-gray-800">
            Welcome, {user?.name || 'User'}!
          </Text>

          {/* Logout Button */}
          <TouchableOpacity onPress={handleLogout}>
            <Icon.LogOut height="24" width="24" stroke="#FF4500" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center space-x-3 bg-gray-100 p-3 rounded-full shadow-sm mt-3">
          <View className="flex-row items-center flex-1 space-x-2">
            <Icon.Search height="20" width="20" stroke="gray" />
            <TextInput
              placeholder="Find your favorite food"
              className="flex-1 text-gray-800"
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#aaa"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon.XCircle height="20" width="20" stroke="gray" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={openGoogleMaps}
            className="flex-row items-center space-x-2"
          >
            <Icon.MapPin height="20" width="20" stroke="#007AFF" />
            <Text className="text-blue-500">Lahore, PK</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        ref={scrollViewRef} // Attach ref to main ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Categories */}
        <View className="mt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="overflow-visible"
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            {categories.map((category, index) => {
              const isActive = category._id === activeCategory;
              const btnClass = isActive ? ' bg-gray-600' : ' bg-gray-200';
              const textClass = isActive
                ? ' font-semibold text-gray-800'
                : ' text-gray-500';

              return (
                <View key={index} className="flex justify-center items-center mr-6">
                  <TouchableOpacity
                    onPress={() => scrollToCategory(category._id)} // Scroll to selected category
                    className={`p-1 rounded-full shadow ${btnClass}`}
                  >
                    <Image
                      style={{ height: 45, width: 45 }}
                      source={{ uri: urlFor(category.image).url() }}
                    />
                  </TouchableOpacity>
                  <Text className={`text-sm ${textClass}`}>{category.name}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured Rows */}
        {filteredRestaurants.map((item, index) => (
          <View
            key={index}
            ref={(ref) => {
              if (ref) categoryRefs.current[item._id] = ref; // Assign refs to categories
            }}
          >
            <FeaturedRow
              title={item.name}
              restaurants={item.restaurants}
              description={item.description}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
