import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const sessionDetails = [
    {
        id: '1',
        name: 'Гузаль Шерматова',
        phone: '+998 93 123-45-67',
        services: ['Стрижка', 'Укладка'],
        price: '350 000 сум',
        // avatar: 'https://via.placeholder.com/50',
    },
    {
        id: '2',
        name: 'Наргиза Ахмедова',
        phone: '+998 93 123-45-67',
        services: ['Стрижка', 'Укладка'],
        price: '350 000 сум',
        // avatar: 'https://via.placeholder.com/50',
    },
];

const PastEntries = () => {
    const [data, setData] = React.useState<any>(sessionDetails);
    return (
        <View style={tw`flex-1 bg-gray-900 p-4`}>
            {data && data.map((item: any) => (
                <View key={item.id} style={tw`bg-gray-700 p-4 rounded-lg mb-4 flex-row items-center`}>
                    {/* <Image source={{ uri: item.avatar }} style={tw`w-12 h-12 rounded-full mr-4`} /> */}
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-white font-bold`}>{item.name}</Text>
                        <Text style={tw`text-gray-400`}>{item.phone}</Text>
                        {/* <View style={tw`flex-row mt-2`}>
                            {item.services.map((service, index) => (
                                <Text key={index} style={tw`text-gray-300 bg-gray-800 px-2 py-1 rounded-full mr-2`}>{service}</Text>
                            ))}
                        </View> */}
                        <Text style={tw`text-red-500 font-bold mt-2`}>{item.price}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default PastEntries;
