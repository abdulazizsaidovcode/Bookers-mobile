import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

type ClientCardProps = {
    salon:string;
    imageUrl: string;
    name: string;
    zaps:string;
    masterType: string;
    orders: number;
    clients: number;
    address: string;
    onPress?:(()=> void)
};

const ClientCard: React.FC<ClientCardProps | any> = ({ salon,imageUrl, name, masterType, orders, clients, address, zaps, onPress }) => {
    const hasNumber = (number: number) => {
    };
    const starNumbers = [1, 2, 3, 4, 5];

    return (
        <View style={[tw`p-3 rounded-2xl`, { backgroundColor: '#B9B9C9' }]}>
            <View style={tw`flex flex-row items-center mb-4`}>
                <Image
                    source={{ uri: imageUrl }}
                    style={tw`w-16 h-16 rounded-full mr-3`}
                />
                <View style={tw`flex`}>
                    <Text style={tw`text-lg font-bold`}>{name}</Text>
                    <Text style={tw`border border-gray-600 px-3 rounded-lg`}>{salon}</Text>
                    <Text style={tw`text-sm text-gray-600`}>{masterType}</Text>
                </View>
                <View style={tw`flex items-center ml-11`}>
                    <View style={tw`flex flex-row`}>
                        {starNumbers.map((num) => (
                            <FontAwesome
                                key={num}
                                name="star"
                                size={20}
                                color= 'red'
                                style={tw`ml-2`}
                            />
                        ))}
                    </View>
                    <Text style={tw`mt-1`}>{orders} заказа, {clients} клиентов</Text>
                </View>
            </View>
            <View>
                <Text style={tw`text-gray-600 text-lg mb-2`}>{address}</Text>
                <Text style={tw`text-black text-lg font-bold`}>Ближайшая запись:{zaps}</Text>
            </View>
            <View style={tw`mt-4 flex flex-row items-center justify-between`}>
                <TouchableOpacity activeOpacity={0.8}>
                    <Text style={[tw`px-20 py-4 rounded-xl text-white text-xl`, { backgroundColor: '#9C0A35' }]}>Записаться</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={[tw`rounded-full p-3 ml-1`, { backgroundColor: '#9C0A35' }]}>
                    <SimpleLineIcons name="location-pin" size={30} color="white" onPress={onPress} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ClientCard;
