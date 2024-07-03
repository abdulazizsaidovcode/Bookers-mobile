import Buttons from '@/components/(buttons)/button';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { editWindowOrder } from '@/helpers/api-function/notifications/notifications';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const RequestWindow = () => {
  const { windowData, setWindowData } = useNotificationsStore();

  const onMessageChange = (text: string) => setWindowData({ ...windowData, text })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.navigationMenu}>
          <NavigationMenu name='Напоминание о отзыве' />
        </View>
        <View style={styles.content}>
          <Text style={{ color: 'white', fontSize: 20 }}>Уведомление о попадании клиента в сводобное окошко</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.messageLabel}>Шаблон сообщения</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={10}
              onChangeText={onMessageChange}
              value={windowData.text}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons title="Сохранить" onPress={() => editWindowOrder(windowData.text)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestWindow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
  },
  navigationMenu: {
    padding: 16,
  },
  navigationTitle: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    padding: 16,
    height: screenHeight / 1.35
  },
  messageContainer: {
    backgroundColor: '#B9B9C9',
    padding: 15,
    borderRadius: 15,
    marginTop: 10
  },
  messageLabel: {
    color: '#000',
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold'
  },
  textInput: {
    backgroundColor: '#3a3a4e',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    height: 'auto',
    maxHeight: screenHeight / 3,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
    padding: 10
  },
});
