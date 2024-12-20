import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

export default function OrderPreparing() {
    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Delivery');
        }, 3000)
    }, [])
  return (
    <View className='flex-1 bg-white justify-center items-center'>
        <Image source={require('../assets/images/a-man-is-riding-a-scooter-delivery-logo-template-free-vector.jpg')}></Image>
    </View>
  )
}