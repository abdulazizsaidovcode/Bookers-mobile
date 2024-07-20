import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { router } from 'expo-router';
import webPageStore from '@/helpers/state_managment/wepPage/wepPage';
import { Feather } from '@expo/vector-icons';

type ClientCardProps = {
    salon: string;
    imageUrl: string;
    name: string;
    zaps: string;
    masterType: string;
    orders: number;
    clients: number;
    address: string;
    services?: string[];
    feedbackCount: number;
    onPress?: () => void;
    btnTitle?: string;
    spicalist?:string
};

const ClintCardUslugi: React.FC<ClientCardProps> = ({
    salon, imageUrl, feedbackCount, services = [], name, masterType, orders, clients, address, zaps, onPress, btnTitle, spicalist
}) => {
    const { getme } = webPageStore();

    const generateStars = (count: number) => {
        let stars = '';
        for (let i = 0; i < count; i++) {
            stars += '★';
        }
        for (let i = count; i < 5; i++) {
            stars += '☆';
        }
        return stars;
    };

    return (
        <View style={tw`p-4 bg-gray-300 rounded-2xl shadow-lg`}>
            <View style={tw`flex-row items-center mb-5`}>
                <Image
                    source={getme && getme.attachmentId ? { uri: getme.attachmentId } : require('../../assets/avatar.png')}
                    style={tw`w-16 h-16 rounded-full mr-3`}
                />
                <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center mb-1`}>
                        <Text style={tw`text-lg font-bold`}>{name || "No data"}</Text>
                        <View style={tw`border border-gray-600 px-2 py-1 rounded-lg ml-2`}>
                            <Text style={tw`text-xs text-gray-600`}>{salon}</Text>
                        </View>
                    </View>
                    <Text style={tw`text-sm text-gray-600`}>{masterType}</Text>
                </View>
                <View style={tw`flex items-end`}>
                    <Text style={[tw`text-lg`, { color: '#9C0A35' }]}>{generateStars(feedbackCount || 0)}</Text>
                    <Text style={tw`text-xs text-gray-600 mb-1`}>{orders} заказа, {clients} клиентов</Text>
                    <Text style={[tw`border px-4 py-1 rounded-lg `, { borderColor: '#9C0A35', color:'#9C0A35' }]}>{spicalist}</Text>
                </View>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ gap: 10 }}
                showsHorizontalScrollIndicator={false}
            >
                <View style={tw`flex-row mb-3`}>
                    {services.map((service, index) => (
                        <TouchableOpacity key={index} style={tw`p-2 ml-2 border border-gray-600 rounded-lg ${index !== 0 ? 'mr-2' : ''}`}>
                            <Text style={tw`text-center text-gray-600`}>{service}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Text style={tw`text-gray-600 text-lg mb-4`}>{address || "Address is not found"}</Text>
            <View style={[tw`flex-row `, {justifyContent:'center',alignItems:'center',width:'100%'}]}>
                <TouchableOpacity activeOpacity={0.8} style={[tw`p-3 rounded-full mr-2`, { backgroundColor: '#9C0A35' }]}>
                    <SimpleLineIcons name="location-pin" size={30} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={[tw`p-3 rounded-full mr-2`, { backgroundColor: '#9C0A35' }]}>
                    <Feather name="phone" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={[tw`p-3 rounded-full mr-2`, { backgroundColor: '#9C0A35' }]}>
                    <Feather name="bookmark" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={tw`flex-row justify-between mt-4`}>
                <TouchableOpacity activeOpacity={0.8} style={[tw`flex-1 p-3 rounded-xl`, { backgroundColor: '#9C0A35' }]}>
                    <Text style={tw`text-white text-center text-xl`} onPress={onPress}>{btnTitle}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ClintCardUslugi;
