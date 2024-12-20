import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import React, { useState } from 'react';
import { View, Text } from 'react-native'
import HomeScreen from './MainScreen';
import RestaurantScreen from './restaurantScreen';
import CartScreen from './CartScreen';
import OrderPreparing from './OrderPreparing';
import Delivery from './Delivery';
import LoginScreen from './login';
import RegisterScreen from './register';
import Welcome from './welcome';
const Stack = createNativeStackNavigator();
import { AppContext } from './ContextApi';


export default function Navigation() {

  // const [user, setUsers] = useState([{key:0, title:"Haris"}]);

  return (
    // <AppContext.Provider value={{user}}>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Home Screen'}} 
        />
         <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Home Screen'}} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home Screen'}} 
        />
        <Stack.Screen 
          name="Restaurant" 
          component={RestaurantScreen} 
          options={{ title: 'Details Screen' }} 
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{presentation:'modal' }} 
        />
        <Stack.Screen 
          name="OrderPreparing" 
          component={OrderPreparing} 
          options={{presentation:'fullScreenModal' }} 
        />
        <Stack.Screen 
          name="Delivery" 
          component={Delivery} 
          options={{presentation:'fullScreenModal' }} 
        />
        
      </Stack.Navigator>
      // {/* </AppContext> */}
  );
};

// export  Navigation;