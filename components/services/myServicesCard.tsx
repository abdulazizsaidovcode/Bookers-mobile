import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MyServicesProps } from '@/type/services/myServices';
import { MaterialIcons } from '@expo/vector-icons';

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
                <MaterialIcons name="navigate-next" size={36} color='gray'/>
            </TouchableOpacity>
     </View>
      
    );
}

export default MyServicesCard;
