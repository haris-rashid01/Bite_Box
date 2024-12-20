import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react'
import { themeColors } from '@/themes';
import RestaurantCard from './restaurantCard';

export default function FeaturedRow({ title, description, restaurants }) {
    return (
        <View flex-row justify-between items-center px-4>
            <View>
                <View className='px-3'>
                    <Text className='font-bold text-lg'>{title}</Text>
                    <Text className='text-gray-500 text-xs'>{description}</Text>

                </View>
                <TouchableOpacity>
                    <Text  style={{ color: themeColors.text }} className="font semi-bold px-3">
                        {/* See All */}
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                className='overflow-visible py-5'
            >
                {
                    restaurants.map((restaurant, index) => {
                        return (
                            <RestaurantCard
                                item={restaurant}
                                key={index}
                            />


                        )
                    })
                }
            </ScrollView>
        </View>

    )
}