import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { featured } from '@/constants';
import { themeColors } from '@/themes';
import * as Icon from 'react-native-feather';
import { useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '@/slices/restaurantSlice';
import { removeFromCart, selectCartItems, selectCartTotal } from '@/slices/cartSlice';
import { urlFor } from '@/sanity';

export default function CartScreen() {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [groupedItems, setGroupedItems] = useState({});
    const dispatch = useDispatch();
    const deliveryFee = 200;

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    useEffect(() => {
        const items = cartItems.reduce((group, item) => {
            if (group[item._id]) {
                group[item._id].push(item);
            } else {
                group[item._id] = [item];
            }
            return group;
        }, {});
        setGroupedItems(items);
    }, [cartItems]);

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        setShowPaymentModal(false); // Close modal after selection
    };

    return (
        <View className="bg-white flex-1">
            <View className="relative py-4 shadow-sm">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
                >
                    <Icon.ArrowLeft strokeWidth={3} stroke="white" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Your Cart</Text>
                    <Text className="text-center text-gray-500">{restaurant.name}</Text>
                </View>
            </View>

            {/* Delivery time */}
            <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="flex-row px-4 items-center">
                <Image className="w-20 h-20 rounded-full" source={require('../assets/images/bike-delivery-logo-icon-vector.jpg')} />
                <Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text className="font-bold" style={{ color: themeColors.text }}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Dishes */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50,
                }}
                className="bg-white pt-5"
            >
                {Object.entries(groupedItems).map(([key, items]) => {
                    let dish = items[0];
                    return (
                        <View
                            key={key}
                            className="font-bold items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
                        >
                            <Text className="font-bold" style={{ color: themeColors.text }}>
                                {items.length}x
                            </Text>
                            <Image className="h-14 rounded-full w-14" source={{ uri: urlFor(dish.image).url() }} />
                            <Text className="flex-1 font-bold text-gray-700">{dish.name}</Text>
                            <Text className="font-semibold text-base">PKR {dish.price}</Text>
                            <TouchableOpacity
                                onPress={() => dispatch(removeFromCart({ id: dish._id }))}
                                className="p-1 rounded-full"
                                style={{ backgroundColor: themeColors.bgColor(1) }}
                            >
                                <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>

            {/* Summary and Payment */}
            <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="p-6 px-8 rounded-t-3xl space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Subtotal</Text>
                    <Text className="text-gray-700">PKR {cartTotal}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Delivery Fee</Text>
                    <Text className="text-gray-700">PKR {deliveryFee}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Order Total</Text>
                    <Text className="text-gray-700">PKR {deliveryFee + cartTotal}</Text>
                </View>

                {/* Payment Method Section */}
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-700">Payment Method</Text>
                    <TouchableOpacity onPress={() => setShowPaymentModal(true)}>
                        <Text className="font-bold" style={{ color: themeColors.text }}>
                            {selectedPaymentMethod ? selectedPaymentMethod : 'Select'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('OrderPreparing')}
                        style={{ backgroundColor: themeColors.bgColor(1) }}
                        className="p-3 rounded-full"
                    >
                        <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Payment Method Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPaymentModal}
                onRequestClose={() => setShowPaymentModal(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}
                    >
                        <Text className="text-lg font-bold">Select Payment Method</Text>
                        <TouchableOpacity
                            onPress={() => handlePaymentMethodSelect('Credit Card')}
                            className="py-2"
                        >
                            <Text className="text-base">Credit Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePaymentMethodSelect('Cash on Delivery')}
                            className="py-2"
                        >
                            <Text className="text-base">Cash on Delivery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handlePaymentMethodSelect('Easypaisa')}
                            className="py-2"
                        >
                            <Text className="text-base">Easypaisa</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowPaymentModal(false)}
                            className="mt-4 p-3 rounded-full"
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                        >
                            <Text className="text-white text-center font-bold">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
