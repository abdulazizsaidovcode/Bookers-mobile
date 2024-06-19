import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MyServicesProps } from '@/type/services/myServices';

// Define the interface for the props


const MyServices: React.FC<MyServicesProps> = ({ title, subTitle, onPress }) => {
    return (
        <View style={tw`p-2 bg-gray-100 flex-1`}>
            <TouchableOpacity 
                style={tw`bg-white rounded-2xl shadow-6 p-4 flex-row justify-between items-center`}
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

export default MyServices;
