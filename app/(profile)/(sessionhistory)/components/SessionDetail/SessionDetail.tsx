import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const sessionDetails = [
    {
        id: '1',
        name: 'Гузаль Шерматова',
        phone: '+998 93 123-45-67',
        services: 'Стрижка, Укладка, Окантовка',
        price: '350 000 сум',
        date: 'Пн, 05 февраля',
        startTime: '08:00',
        endTime: '08:30',
        avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '2',
        name: 'Наргиза Ахмедова',
        phone: '+998 93 123-45-67',
        services: 'Стрижка, Укладка, Окрашивание',
        price: '350 000 сум',
        date: 'Пн, 05 февраля',
        startTime: '08:00',
        endTime: '08:30',
        avatar: 'https://via.placeholder.com/50',
    },
];

const SessionDetail = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }: any) => (
        <View style={tw`bg-gray-700 p-4 rounded-lg mb-4`}>
            <View style={tw`flex-row items-center mb-4`}>
                <Image source={{ uri: item.avatar }} style={tw`w-12 h-12 rounded-full mr-4`} />
                <View>
                    <Text style={tw`text-white font-bold`}>{item.name}</Text>
                    <Text style={tw`text-gray-400`}>{item.phone}</Text>
                </View>
            </View>
            <Text style={tw`text-gray-400 mb-2`}>{item.services}</Text>
            <Text style={tw`text-red-500 font-bold mb-2`}>{item.price}</Text>
            <Text style={tw`text-gray-400 mb-4`}>{item.date}</Text>
            <View style={tw`flex-row justify-between mb-4`}>
                <Text style={tw`text-gray-400`}>{item.startTime}</Text>
                <Text style={tw`text-gray-400`}>{item.endTime}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
                <TouchableOpacity style={tw`bg-red-700 p-2 rounded-lg flex-row items-center`}>
                    <Text style={tw`text-white mr-2`}>Написать сообщение</Text>
                    <FontAwesome name="envelope" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-gray-500 p-2 rounded-lg flex-row items-center`}>
                    <FontAwesome name="phone" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={tw`flex-1 bg-gray-900 p-4`}>
            <Text style={tw`text-white text-2xl font-bold mb-4`}>Предстоящие записи</Text>
            <FlatList
                data={sessionDetails}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default SessionDetail;
