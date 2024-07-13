import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Buttons from '@/components/(buttons)/button';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { editMessenger, fetchAllData } from '@/helpers/api-function/notifications/notifications';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Messengers = () => {
  const navigation = useNavigation();
  const { smsData, setSmsData } = useNotificationsStore();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchAllData(setSmsData, 'MESSENGERS');
  }, []);

  const toggleSmsSwitch = () => {
    setSmsData({ ...smsData, isActive: !smsData.isActive });
    setHasChanges(true);
  };

  const handleSave = () => {
    editMessenger(!smsData.isActive, navigation.goBack(), setHasChanges);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContent}>
          <NavigationMenu name='Месенджеры' />
          <Text style={styles.description}>Настройте через какие мессенджеры отправлять уведомления</Text>
          <View style={styles.switchContainer}>
            <View style={styles.optionContent}>
              <FontAwesome5 name="sms" size={24} color="#9C0A35" />
              <Text style={styles.label}>SMS</Text>
            </View>
            <Switch
              onValueChange={toggleSmsSwitch}
              value={smsData.isActive}
              trackColor={{ false: "#767577", true: "#9C0A35" }}
              thumbColor={'#fff'}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons title='Сохранить' onPress={handleSave} isDisebled={hasChanges} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  mainContent: {
    flex: 1,
    height: screenHeight / 1.13,
  },
  description: {
    color: '#B0B0B0',
    fontSize: 13,
    marginBottom: 24,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#B9B9C9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonContainer: {
    marginVertical: 16,
  },
});

export default Messengers;
