import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Navigation from '@/screens/navigation';
import * as Icon from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from '@/themes';
import categories from '../../components/categories';
import Categories from '../../components/categories';
import { featured, featured2 } from '../../constants/index';
import FeaturedRow from '@/components/featuredRow';
import { store } from '@/store';
import { Provider } from 'react-redux'
import { AppContext } from '@/screens/ContextApi';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
