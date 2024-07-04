import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MyServicesProps } from '@/type/services/myServices';
import { AntDesign } from '@expo/vector-icons';

// Define the interface for the props


const MyServicess: React.FC<MyServicesProps> = ({ title, subTitle, onPress }) => {
    return (
       <View style = {[tw`mt-3 rounded-xl`, {backgroundColor:'#ffff'}]}>
        <View style = {[tw`mt-3 rounded-xl`, {backgroundColor:'#ffff'}]}>
            <TouchableOpacity
            activeOpacity={.8}
                style={tw`bg-white rounded-2xl  p-4 flex-row justify-between items-center`}
                onPress={onPress}
            >
                <View>
                    <Text style={tw`text-black text-lg font-bold`}>{title}</Text>
                    <Text style={tw`text-gray-500`}>{subTitle}</Text>
                </View>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
        </View>
       </View> 
        
    );
}

export default MyServicess;
