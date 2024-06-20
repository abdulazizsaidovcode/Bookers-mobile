// screens/Notification.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import NotificationCard from './card/index';
import { FontAwesome } from '@expo/vector-icons';

const notifications = [
  {
    id: '1',
    title: 'Новый функционал',
    message: 'Добавлена новая функция, теперь вы можете открыть электронный ...',
    time: '20.04.2024 20:57:26',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    title: 'Отмена бронирования',
    message: 'Натали - Наращивание 2D ресниц Ваша заявка №12 на 23 февраля была отменена',
    time: '20.04.2024 20:57:26',
    avatar: 'https://picsum.photos/200/300',
  },
];

const Notification = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-gray-900 p-4`}>
      <View style={tw`flex-row justify-between items-center mb-6`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={tw`text-white text-lg font-bold`}>Уведомления</Text>
        <TouchableOpacity>
          <FontAwesome name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Notification;
