import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import { themeColors } from '@/themes';
import { useNavigation } from 'expo-router';
import CartIcon from './CartIcon';
import { urlFor } from '@/sanity';

export default function RestaurantCard({ item }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Restaurant', { ...item });
            }}
        >
            <View
                style={{
                    shadowColor: themeColors.bgColor(0.2),
                    shadowRadius: 10,
                    borderRadius: 15,
                    marginRight: 16,
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#ddd',
                }}
            >
                <Image
                    className="h-36 w-full"
                    style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
                    source={{ uri: urlFor(item.image).url() }}
                />
                <View className="p-4 space-y-3">
                    <Text className="text-xl font-semibold text-black">{item.name}</Text>
                    <View className="flex-row items-center space-x-2">
                        <Text className="text-green-600 font-semibold">{item.stars}</Text>
                        <Text className="text-gray-600 text-sm">({item.reviews} reviews)</Text>
                    </View>
                    <View className="flex-row items-center space-x-2">
                        <Icon.MapPin color="gray" width="16" height="16" />
                        <Text className="text-gray-600 text-xs">{item.address}</Text>
                    </View>
                    <View className="flex-row items-center space-x-2 mt-2">
                        <Text className="text-sm font-medium">{item?.type?.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
