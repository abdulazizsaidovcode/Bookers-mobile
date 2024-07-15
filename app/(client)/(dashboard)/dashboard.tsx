import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');
const  Tab= createBottomTabNavigator();

const Dashboard = () => {
  const [value, setValue] = useState(1.5);

  return (
    <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
      <Text>ffff</Text>
    </View>
  );
};
export default Dashboard;
