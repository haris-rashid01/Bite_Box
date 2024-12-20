import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { useNavigation } from 'expo-router';
import { featured } from '@/constants';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { themeColors } from '@/themes';
import * as Icon from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '@/slices/restaurantSlice';
import { emptyCart } from '@/slices/cartSlice';
import { Linking } from 'react-native';


export default function Delivery() {
    const restaurant = useSelector(selectRestaurant);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const cancelOrder = () => {
        navigation.navigate('Home');
        dispatch(emptyCart());
    }
    return (
        <View className='flex-1'>
            <MapView initialRegion={{ latitude: restaurant.lat, longitude: restaurant.lng, latitudeDelta: 0.01, longitudeDelta: 0.01 }} className='flex-1' mapType='standard'>
                <Marker coordinate={{ latitude: restaurant.lat, longitude: restaurant.lng }} title={restaurant.name}
                    description={restaurant.description} pinColor={themeColors.bgColor(1)} />
            </MapView>
            <View className='rounded-t-3xl -mt-12 bg-white relative'>
                <View className='flex-row justify-between px-5 pt-10'>
                    <View>
                        <Text className='text-lg text-gray-700 font-semibold'>
                            Estimated Arrival
                        </Text>
                        <Text className='text-3xl font-extrabold text-gray-700'>
                            25-40 minutes
                        </Text>
                        <Text className='mt-2 text-gray-700 font-semibold'>
                            Your order is own its way!
                        </Text>
                    </View>
                    <Image className='w-24 h-24' source={require('../assets/images/depositphotos_140617412-stock-illustration-delivery-vector-logo.jpg')}></Image>
                </View>
                <View style={{ backgroundColor: themeColors.bgColor(0.8) }} className='p-2 flex-row justify-between items-center rounded-full my-5 mx-2'>
                    <View className='p-1 rounded-full' style={{ backgroundColor: 'rgba(255,255,255,0.4' }}>
                        <Image className='h-16 w-16 rounded-full' source={require("../constants/rider.jpg")}></Image>
                    </View>
                    <View className='flex-1 ml-3'>
                        <Text className='text-lg font-bold text-white'>
                            Shahzad Ali
                        </Text>
                        <Text className='font-semibold text-white'> Your Rider</Text>
                    </View>
                    <View className='flex-row items-center space-x-3 mr-3'>
                        <TouchableOpacity
                            className='bg-white p-2 rounded-full'
                            onPress={() => {
                                const phoneNumber = 'tel:+923214385757'; // Replace with the rider's phone number
                                Linking.openURL(phoneNumber);
                            }}
                        >
                            <Icon.Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} />
                        </TouchableOpacity>

                        <TouchableOpacity className='bg-white p-2 rounded-full' onPress={
                            cancelOrder
                        }>
                            <Icon.X stroke={'red'} strokeWidth={4} />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        </View>
    )
}