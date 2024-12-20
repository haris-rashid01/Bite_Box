import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

export default function Welcome({email}) {
    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Home');
        }, 3000)
    }, [])
  return (
    <View className='flex-1 bg-white justify-center items-center'>
        <Text>Hi {email}</Text>
    </View>
  )
}