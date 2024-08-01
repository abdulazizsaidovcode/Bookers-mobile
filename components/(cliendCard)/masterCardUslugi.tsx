import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome6, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { router, useNavigation } from 'expo-router';
import webPageStore from '@/helpers/state_managment/wepPage/wepPage';
import { ClientData } from '@/helpers/state_managment/uslugi/uslugiStore';
import { addFavouriteOrder, haveOrNot } from '@/helpers/api-function/favourite-orders/favourite-orders';
import { FavouriteOrdersType } from '@/type/favourite-orders/favourite-orders';


type ClientCardItem = {
    item: ClientData | null
    onPress?: () => void;
    favouriteOrders: FavouriteOrdersType[]
};

const MasterCardUslugi: React.FC<ClientCardItem> = ({ onPress, item , favouriteOrders}) => {
    const { getme } = webPageStore();
    const navigate = useNavigation<any>();

    const generateStars = (count: number) => {
        let stars = '';
        for (let i = 1; i < count; i++) {
            stars += '★';
        }
        for (let i = count; i < 5; i++) {
            stars += '☆';
        }
        return stars;
    };

    return (
        <View style={[tw`p-4 rounded-2xl shadow-lg`, { backgroundColor: '#B9B9C9' }]}>
            <View style={tw`flex-row items-center mb-4`}>
                <Image
                    source={item.attachmentId && item.attachmentId ? {} : require('../../assets/avatar.png')}
                    style={tw`w-16 h-16 rounded-full mr-3`}
                />
                <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center mb-1`}>
                        <Text style={tw`text-lg font-bold`}>{item.fullName || "No data"}</Text>
                        <View style={tw`border border-gray-600 px-2 py-1 rounded-lg ml-2`}>
                            <Text style={tw`text-xs text-gray-600`}>{item.salonName}</Text>
                        </View>
                    </View>
                    <Text style={tw`text-sm text-gray-600`}>{item.masterSpecialization || "Не найдено"}</Text>
                </View>
                <View style={tw`flex items-end`}>
                    <Text style={[tw`text-lg`, { color: '#9C0A35' }]}>{generateStars(item.feedbackCount || 0)}</Text>
                    <Text style={tw`text-xs text-gray-600`}>{item.orderCount} заказа, {item.clientCount} клиентов</Text>
                </View>
            </View>
            <Text style={tw`text-gray-600 text-lg mb-2`}>{`${item.street}, ${item.house}` || "Address is not found"}</Text>
            <View style={tw`flex mb-3 flex-row items-center justify-center`}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[tw`px-3 py-3 rounded-full mx-2`, { backgroundColor: '#9C0A35' }]} // Changed ml-2 to mx-2 for equal spacing
                >
                    <SimpleLineIcons name="location-pin" size={24} color="white"
                        onPress={() => {
                            navigate.navigate('(client)/(map)/(master-locations)/master-locations', { id: item.id });
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => Linking.openURL(`tel:${item.phone}`)}
                    style={[tw`px-3 py-3 rounded-full mx-2`, { backgroundColor: '#9C0A35' }]} // Customize the style as needed
                >
                    <FontAwesome6 name="phone" size={24} color="white" />
                </TouchableOpacity>
                {haveOrNot(item.id, favouriteOrders)}
            </View>


            <View style={tw`flex-row justify-center items-center`}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[tw`px-10 py-2 rounded-xl`, { backgroundColor: '#9C0A35' }]}
                    onPress={onPress}
                >
                    <Text style={tw`text-white text-xl`}>Написать сообщение</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default MasterCardUslugi;
