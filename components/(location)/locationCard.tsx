import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

interface AddressCardProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    onPress?: () => void;
}

const LocationCard: React.FC<AddressCardProps> = ({icon, title, subtitle, onPress}) => {
    return (
        <TouchableOpacity activeOpacity={.7}
                          style={tw`p-5 bg-gray-200 rounded-xl flex-row`}
                          onPress={onPress}>
            <Ionicons name={icon} size={24} style={tw`text-red-600 `}/>
            <View>
                <Text style={tw`text-lg font-bold`}>{title}</Text>
                <Text style={tw`text-gray-600`}>{subtitle}</Text>
            </View>
            <View style={tw`flex-1 items-end`}>
                <MaterialIcons name="navigate-next" style={tw`text-gray-600 text-2xl mt-2`}/>
            </View>
        </TouchableOpacity>
    );
};

export default LocationCard;
