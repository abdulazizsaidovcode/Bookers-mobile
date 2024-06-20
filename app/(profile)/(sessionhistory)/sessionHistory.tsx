import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const sessionData = [
    { id: '1', title: 'Предстоящие записи', icon: 'calendar', count: 2, screen: '(profile)/(sessionhistory)/components/Upcomingentries/Upcomingentries' },
    { id: '2', title: 'Прошедшие записи', icon: 'history', count: 2, screen: '(profile)/(sessionhistory)/components/Pastentries/Pastentries' },
    { id: '3', title: 'Отменённые записи', icon: 'times-circle', count: 1, screen: '(profile)/(sessionhistory)/components/Canceledentries/Canceledentries' },
];

const SessionHistory = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={tw`bg-gray-700 p-4 rounded-lg mb-4 flex-row justify-between items-center`}
            onPress={() => navigation.navigate(item.screen)}
        >
            <View style={tw`flex-row items-center`}>
                <FontAwesome name={item.icon} size={24} color="#E74C3C" style={tw`mr-4`} />
                <Text style={tw`text-white font-bold`}>{item.title}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
                <Text style={tw`text-white font-bold`}>{item.count}</Text>
                <FontAwesome name="chevron-right" size={24} color="#E74C3C" style={tw`ml-4`} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={tw`flex-1 bg-gray-900 p-4`}>
            <Text style={tw`text-white text-2xl font-bold mb-4`}>История сеансов</Text>
            <FlatList
                data={sessionData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default SessionHistory;
