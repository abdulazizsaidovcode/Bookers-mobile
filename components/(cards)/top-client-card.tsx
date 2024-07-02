import { getFile } from '@/helpers/api';
import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import HomeCards from './homeCard';

const ClientCard = ({ items }: any) => {
    return (
        <View style={[tw`rounded-xl p-5 mb-4`, { backgroundColor: '#B9B9C9' }]}>
            <View style={[tw`flex-row justify-start`, { gap: 16 }]}>
                <Image
                    source={items.attachmentId !== null ?
                        { uri: `${getFile}${items.attachmentId}` }
                        : require('../../assets/avatar.png')}
                    style={[tw`w-14 h-14 rounded-full`]}
                />
                <View>
                    <Text style={[tw`text-2xl font-bold`]}>{items.firstName} {items.lastName}</Text>
                    <Text style={[tw`mb-4 mt-1 text-base`, { color: '#4F4F4F' }]}>
                        {items.phoneNumber}
                    </Text>
                    {items.status.map((status: string) => (
                        <View style={[tw`rounded-lg px-5 py-2 mb-2`,
                        {
                            backgroundColor: `${status === 'REGULAR_VISIT' ? '#217355' : '#9C0A35'}`, alignSelf: 'flex-start'
                        }]}
                        >
                            <Text style={[tw`text-sm`, { color: 'white' }]}>
                                {status === 'REGULAR_VISIT' ? 'постоянный клиент' : status === 'NOT_VISIT' ? 'Не посещать' : status}
                            </Text>
                        </View>
                    ))}
                    <Text style={[tw`text-2xl font-bold`, { color: '#9C0A35' }]}>{items.price} сум</Text>
                </View>
            </View>
        </View>
    );
};

export default ClientCard;
