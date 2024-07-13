import Buttons from '@/components/(buttons)/button';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { editChangingOrder, fetchAllData } from '@/helpers/api-function/notifications/notifications';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ChangingEnEntry = () => {
  const { changingData, setChangingData } = useNotificationsStore();
  const navigation = useNavigation();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchAllData(setChangingData, 'CHANGE_ORDER');
  }, []);

  const toggleSwitch = () => {
    setChangingData({ ...changingData, isActive: !changingData.isActive });
    setHasChanges(true);
  };

  const onMessageChange = (text: string) => {
    setChangingData({ ...changingData, text });
    setHasChanges(true);
  };

  const handleSave = () => {
    editChangingOrder(changingData.isActive, changingData.text, setHasChanges, navigation.goBack());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.navigationMenu}>
          <NavigationMenu name='Напонимание об изменении' />
        </View>
        <View style={styles.content}>
          <Text style={{ color: 'white', fontSize: 20 }}>Отправка сообщений клиенту об изменении времени сеанса</Text>
          <View style={styles.switchContainer}>
            <View style={{ width: 240 }}>
              <Text style={styles.label}>Отправлять наппоминание об изменении записи</Text>
            </View>
            <View>
              <Switch
                onValueChange={toggleSwitch}
                value={changingData.isActive}
                trackColor={{ false: "#767577", true: "#9C0A35" }}
                thumbColor={'#fff'}
              />
            </View>
          </View>
          {changingData.isActive && (
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>Шаблон сообщения</Text>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={10}
                onChangeText={onMessageChange}
                defaultValue={changingData.text}
              />
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Buttons title="Сохранить" onPress={handleSave} isDisebled={hasChanges} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangingEnEntry;

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
    height: screenHeight / 1.35,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#B9B9C9',
    padding: 13,
    borderRadius: 15,
    marginTop: 10,
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
    padding: 10,
  },
});
