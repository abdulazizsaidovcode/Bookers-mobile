import React, { useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import tw from 'tailwind-react-native-classnames';
import RadioGroup from 'react-native-radio-buttons-group';

type ClientCardDetailProps = {
  type: string;
  services?: string[];
  price: any;
  img?: string;
  description: string;
  subDescription: string;
};

const ClientCardDetail: React.FC<ClientCardDetailProps> = ({ type, services = [], price, img, description, subDescription }) => {
  const radioButtons = useMemo(() => ([
    {
      id: '1', 
      label: `${type}`,
      value: 'option1'
    },
  ]), []);
  const [selectedId, setSelectedId] = useState(false);

  console.log(selectedId);
  
  return (
    <View style={[tw`p-4 rounded-2xl`, { backgroundColor: "#B9B9C9" }]}>
      <View style={tw`flex-row items-center mb-4`}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
        />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10, marginBottom: 5 }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={tw`flex-row mb-4`}>
          {services.map((service, index) => (
            <TouchableOpacity key={index} style={tw`p-2 ml-2 border border-gray-600 rounded-lg ${index !== 0 ? 'mr-2' : ''}`}>
              <Text style={tw`text-center text-gray-600`}>
                {service}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={tw`flex-row items-center mb-4`}>
        <Text style={[tw`text-2xl font-bold`, {color:'#9C0A35'}]}>{price} сум</Text>
      </View>
      {img && (
        <Image
          source={{ uri: img }}
          style={tw`w-full h-40 rounded-lg mb-4`}
        />
      )}
      <Text style={tw`text-black mb-4`}>{description}</Text>
      <Text style={tw`text-black mb-4`}>{subDescription}</Text>
      <TouchableOpacity
        activeOpacity={.8}
        style={[tw` w-1/2 p-3 rounded-lg`, { backgroundColor: '#9C0A35' }]}>
        <Text style={[tw`text-center text-xl`, { color: '#FFFFFF' }]}>Подробнее</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClientCardDetail;
