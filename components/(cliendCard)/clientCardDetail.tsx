import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type ClientCardDetailProps = {
  name: string;
  services?: string[];
  price: any;
  img?: string;
  description: string;
  subDescription: string;
  genderId: number[];
};

const genderMapping = {
  1: 'Мужчины для взрослых',
  2: 'Женщины для взрослых',
  3: 'Мужчины для мальчиков',
  4: 'Женщины для девочек',
};

const ClientCardDetail: React.FC<ClientCardDetailProps> = ({ name, services = [], price, img, description, subDescription, genderId }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(prevSelectedId => (prevSelectedId === id ? null : id));
  };

  return (
    <View style={[tw`p-4 rounded-2xl`, { backgroundColor: "#B9B9C9" }]}>
      <View style={tw`mb-4`}>
        {genderId.length > 0 ? (
          genderId.map(id => (
            <TouchableOpacity
              key={id}
              style={tw`flex-row items-center mb-2`}
              onPress={() => handleSelect(id)}
            >
              <View
                style={[
                  tw`w-5 h-5 rounded-full border`,
                  {
                    borderColor: selectedId === id ? '#9C0A35' : '#000',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                ]}
              >
                {selectedId === id && (
                  <View style={[tw`w-3 h-3 rounded-full`, { backgroundColor: '#9C0A35' }]} />
                )}
              </View>
              <Text style={[tw`ml-2 text-xl font-bold`, { color: '#000' }]}>
                {genderMapping[id] || 'Hamma uchun'}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <TouchableOpacity
            style={tw`flex-row items-center mb-2`}
            onPress={() => handleSelect(id)}
          >
            <View
              style={[
                tw`w-5 h-5 rounded-full border`,
                {
                  borderColor: selectedId === null ? '#9C0A35' : '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              ]}
            >
              {selectedId === null && (
                <View style={[tw`w-3 h-3 rounded-full`, { backgroundColor: '#9C0A35' }]} />
              )}
            </View>
            <Text style={[tw`ml-2 text-xl font-bold`, { color: '#000' }]}>
              Hamma uchun
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={tw`flex-row items-center mb-3 justify-between`}>
        <Text style={tw`border-gray-600 border px-3 py-2 rounded-lg`}>{name}</Text>
        <Text style={[tw`text-xl font-bold`, { color: '#9C0A35' }]}>{price} сум</Text>
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
        activeOpacity={0.8}
        style={[tw`w-1/2 p-3 rounded-lg`, { backgroundColor: '#9C0A35' }]}
      >
        <Text style={[tw`text-center text-xl`, { color: '#FFFFFF' }]}>Подробнее</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClientCardDetail;
