// components/NotificationCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome } from '@expo/vector-icons';

const NotificationCard = ({ item }: any) => {
    return (
        <View style={tw`bg-gray-700 p-4 rounded-lg mb-4 flex-row items-center`}>
            <Image source={{ uri: item.avatar }} style={tw`w-12 h-12 rounded-full mr-4`} />
            <View style={tw`flex-1`}>
                <Text style={tw`text-white font-bold`}>{item.title}</Text>
                <Text style={tw`text-gray-400 mt-1`}>{item.message}</Text>
                <Text style={tw`text-gray-500 mt-2 text-sm`}>{item.time}</Text>
            </View>
            <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
        </View>
    );
};

export default NotificationCard;
