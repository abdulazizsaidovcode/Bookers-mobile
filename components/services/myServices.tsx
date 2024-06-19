import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MyServicesProps } from '@/type/services/myServices';

// Define the interface for the props


const MyServicess: React.FC<MyServicesProps> = ({ title, subTitle, onPress }) => {
    return (
        <View style={tw`mt-3  `}>
            <TouchableOpacity
            activeOpacity={.7}
                style={tw`bg-white rounded-2xl  p-4 flex-row justify-between items-center`}
                onPress={onPress}
            >
                <View>
                    <Text style={tw`text-black text-lg font-bold`}>{title}</Text>
                    <Text style={tw`text-gray-500`}>{subTitle}</Text>
                </View>
                <Text style={tw`text-gray-500 text-lg`}>{'>'}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MyServicess;
