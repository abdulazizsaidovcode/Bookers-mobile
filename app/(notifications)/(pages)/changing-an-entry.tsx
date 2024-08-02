import Buttons from '@/components/(buttons)/button';
import LoadingButtons from '@/components/(buttons)/loadingButton';
import { Loading } from '@/components/loading/loading';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { editChangingOrder, fetchAllData } from '@/helpers/api-function/notifications/notifications';
import { getNumbers, putNumbers } from '@/helpers/api-function/numberSittings/numbersetting';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import numberSettingStore from '@/helpers/state_managment/numberSetting/numberSetting';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ChangingEnEntry = () => {
  const { setNumber } = numberSettingStore();
  const { changingData, isLoading, tariff, texts, setTexts, setIsloading, setChangingData } = useNotificationsStore();
  const navigation = useNavigation();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchAllData(setChangingData, 'CHANGE_ORDER');
    setTexts({ ...texts, changingText: changingData.text ? changingData.text : '' })
  }, []);

  const toggleSwitch = () => {
    setChangingData({ ...changingData, isActive: !changingData.isActive });
    setHasChanges(true);
  };

  const onMessageChange = (text: string) => {
    setTexts({ ...texts, changingText: text });
    setHasChanges(true);
  };

  const handleSave = () => {
    tariff === 'FREE' && putNumbers(7, () => getNumbers(setNumber))
    editChangingOrder(changingData.isActive, changingData.isActive ? texts.changingText : changingData.text, setHasChanges, navigation.goBack, setIsloading);
  };

  if (!changingData) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Loading />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="light" />
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
      </ScrollView>
      <View style={styles.buttonContainer}>
        {isLoading ? <LoadingButtons title='Сохранить' /> : <Buttons title="Сохранить" onPress={handleSave} isDisebled={hasChanges} />}
      </View>
    </SafeAreaView>
  );
};

export default ChangingEnEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    position: 'relative'
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
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#21212E'
  },
});
