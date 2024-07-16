import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type ClientCardDetailProps = {
  type: string;
  services?: string[];
  price: number;
  img: string;
  description: string;
  subDescription: string;
};

const ClientCardDetail: React.FC<ClientCardDetailProps> = ({ type, services = [], price, img, description, subDescription }) => {
  return (
    <View style={[tw`p-4 rounded-lg`, { backgroundColor: "#B9B9C9" }]}>
      <View style={tw`flex-row items-center mb-4`}>
        <Text style={tw`text-black text-lg font-bold`}>{type}</Text>
      </View>
      <View style={tw`flex-row mb-4`}>
        {services.map((service, index) => (
          <TouchableOpacity key={index} style={tw`p-2 ml-2 border border-gray-600 rounded-lg ${index !== 0 ? 'mr-2' : ''}`}>
            <Text style={tw`text-center text-gray-600`}>{service}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw`flex-row items-center mb-4`}>
        <Text style={tw`text-red-500 text-2xl font-bold`}>{price} сум</Text>
      </View>
      <Image
        source={{ uri: img }}
        style={tw`w-full h-40 rounded-lg mb-4`}
      />
      <Text style={tw`text-black mb-4`}>{description}</Text>
      <Text style={tw`text-black mb-4`}>{subDescription}</Text>
      <TouchableOpacity 
      activeOpacity={.8}
      style={[tw` w-1/2 p-3 rounded-lg`, {backgroundColor:'#9C0A35'}]}>
        <Text style={[tw`text-center text-xl`,{color:'#FFFFFF'}]}>Подробнее</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClientCardDetail;
