import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { getFile } from '@/helpers/api';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { useNavigation } from 'expo-router';
import Buttons from '../(buttons)/button';

type ClientCardProps = {
  id: string | null;
  masterId: string | null;
  salon: string;
  attachmentId: string;
  name: string;
  zaps: string;
  masterType: string;
  orders: number;
  clients: number;
  address: string;
  feedbackCount: number;
  onPress?: () => void;
  locationIcon?: React.ReactNode;
  btntext?: string;
  InfoOnPress?: () => void;
};

const ClientCard1: React.FC<ClientCardProps> = ({
  id,
  salon, attachmentId, feedbackCount, name, masterType, orders, clients, address, zaps, onPress, locationIcon, btntext
}) => {

  const { selectedClient, setSelectedClient, clientData, setClientData } = ClientStory()
  const navigation = useNavigation<any>();
  const generateStars = (count: number) => {
    const roundedCount = Math.round(count);
    const starsCount = Math.min(roundedCount, 5);
    let stars = '';
    for (let i = 0; i < starsCount; i++) {
      stars += '★';
    }
    for (let i = starsCount; i < 5; i++) {
      stars += '☆';
    }
    return stars;
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={[tw`p-4 rounded-2xl shadow-lg`, { backgroundColor: '#B9B9C9' }]}>
        <View style={tw`flex-row items-center mb-4`}>
          <Image
            source={attachmentId ? { uri: getFile + attachmentId } : require('../../assets/avatar.png')}
            style={tw`w-16 h-16 rounded-full mr-3`}
          />
          <View style={tw`flex-1`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Text style={tw`text-lg font-bold`}>{name || "No data"}</Text>
              <View style={tw`border border-gray-600 px-2 py-1 rounded-lg ml-2`}>
                <Text style={tw`text-xs text-gray-600`}>{salon}</Text>
              </View>
            </View>
            <Text style={tw`text-sm text-gray-600`}>{masterType}</Text>
          </View>
          <View style={tw`flex items-end`}>
            <Text style={[tw`text-lg`, { color: '#9C0A35' }]}>{generateStars(feedbackCount || 0)}</Text>
            <Text style={tw`text-xs text-gray-600`}>{orders} заказа, {clients} клиентов</Text>
          </View>
        </View>
        <Text style={tw`text-gray-600 text-lg mb-2`}>{address || "Address is not found"}</Text>
        <Text style={tw`text-black text-lg font-bold mb-4`}>Ближайшая запись: {zaps}</Text>
        <View style={tw`flex-row items-center`}>
          <View style={tw`flex-1`}>
            <Buttons
              title='Записаться'
              onPress={onPress}
            />
          </View>
          {locationIcon && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[tw`px-3 py-3 rounded-full ml-3`, { backgroundColor: '#9C0A35' }]}
            >
              {locationIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClientCard1;
