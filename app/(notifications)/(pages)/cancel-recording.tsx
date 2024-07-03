import Buttons from '@/components/(buttons)/button';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { editCancelOrder, fetchAllData } from '@/helpers/api-function/notifications/notifications';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CancelRecording = () => {
  const { cancelData, setCancelData } = useNotificationsStore();

  const toggleSwitch = () => setCancelData({ ...cancelData, isActive: !cancelData.isActive });
  const onMessageChange = (text: string) => setCancelData({ ...cancelData, text });

  useEffect(() => {
    fetchAllData(setCancelData, 'CANCEL_ORDER');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.navigationMenu}>
          <NavigationMenu name='Напоминание об отмене' />
        </View>
        <View style={styles.content}>
          <View style={styles.switchContainer}>
            <View style={{ width: 250 }}>
              <Text style={styles.label}>Отправлять напоминание об отмене</Text>
            </View>
            <View>
              <Switch
                onValueChange={toggleSwitch}
                value={cancelData.isActive}
              />
            </View>
          </View>
          {cancelData.isActive && (
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>Шаблон сообщения</Text>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={10}
                onChangeText={onMessageChange}
                value={cancelData.text}
              />
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Buttons title="Сохранить" onPress={() => editCancelOrder(cancelData.isActive, cancelData.text)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CancelRecording;

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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#B9B9C9',
    padding: 13,
    borderRadius: 15
  },
  label: {
    color: '#000',
    fontSize: 17,
  },
  messageContainer: {
    backgroundColor: '#B9B9C9',
    padding: 15,
    borderRadius: 15,
  },
  messageLabel: {
    color: '#000',
    marginBottom: 10,
    fontSize: 16,
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
