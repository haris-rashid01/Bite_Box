import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getCategories } from '../api';
import { urlFor } from '@/sanity';

export default function Categories({ user }) {
    const [activeCategory, setActiveCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data);
        });
    }, []);

    return (
        <View className="mt-4">
            {/* Welcome Bar */}

            {/* Horizontal ScrollView for Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="overflow-visible"
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
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
                                onPress={() => setActiveCategory(category._id)}
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
            <View className="bg-gray-100 p-4 rounded-lg shadow mb-4">
                    <Text className="text-lg font-bold text-gray-800">
                        Welcome, {user?.name || "User"}!
                    </Text>
                    <Text className="text-sm text-gray-600">Explore your favorite categories below</Text>
                </View>

        </View>
    );
}
