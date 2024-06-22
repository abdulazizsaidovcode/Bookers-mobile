import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import NotificationCard from './card/index';

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

const Notification: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.padding}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Уведомления</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    padding: 16,
  },
  padding: {
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Notification;
