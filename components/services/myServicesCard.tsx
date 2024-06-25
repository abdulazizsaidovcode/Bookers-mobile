import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MyServicesProps } from '@/type/services/myServices';

// Define the interface for the props


const MyServicesCard: React.FC<MyServicesProps> = ({ title, subTitle, onPress }) => {
    return (
       <View style = {[tw`mt-3 rounded-xl`, {backgroundColor:'#ffff'}]}>
            <TouchableOpacity
            
                style={tw`bg-white rounded-2xl p-1 flex-row justify-between items-center`}
                onPress={onPress}
            >
                <View>
                    <Text style={tw`text-black text-lg font-bold p-2`}>{title}</Text>
                </View>
                <Text style={tw`text-gray-500 text-3xl p-2`}>{'>'}</Text>
            </TouchableOpacity>
     </View>
      
    );
}

export default MyServicesCard;
