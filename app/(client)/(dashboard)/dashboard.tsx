import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import CommunitySlider from '@/components/communiytSlider/communitySlider';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  const [value, setValue] = useState(1.5);

  return (
    <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
      <CommunitySlider
        icon={<FontAwesome name="star" size={20} color="#8B1A1A" />}
        title="+"
      />
    </View>
  );
};
export default Dashboard;
