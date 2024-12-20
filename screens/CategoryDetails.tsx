import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function CategoryDetails({ route }) {
  const { category } = route.params;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        {category.name}
      </Text>
      <Text style={{ fontSize: 16, color: 'gray' }}>
        {category.description || 'No description available for this category.'}
      </Text>
      {/* Add more details or components related to this category */}
    </ScrollView>
  );
}
