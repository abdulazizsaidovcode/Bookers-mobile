import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const ClientCard = () => {
    return (
        <View style={[tw`rounded-xl p-5`, { backgroundColor: '#B9B9C9' }]}>
            <View style={[tw`flex-row justify-start`, { gap: 16 }]}>
                <Image
                    source={require('../../assets/images/auth/logo.png')}
                    style={[tw`w-14 h-14 rounded-full`]}
                />
                <View>
                    <Text style={[tw`text-2xl font-bold`]}>Гузаль Шерматова</Text>
                    <Text style={[tw`mb-4 mt-1 text-base`, { color: '#4F4F4F' }]}>+998 93 123-45-67</Text>
                    <View style={[tw`rounded-lg px-5 py-2 mb-3`, { backgroundColor: '#9C0A35', alignSelf: 'flex-start' }]}>
                        <Text style={[tw`text-sm`, { color: 'white' }]}>VIP клиент</Text>
                    </View>
                    <Text style={[tw`text-2xl font-bold`, { color: '#9C0A35' }]}>5 400 000 сум</Text>
                </View>
            </View>
        </View>
    );
};

export default ClientCard;
