import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Buttons from '@/components/(buttons)/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Messengers = () => {
  const [isSmsEnabled, setIsSmsEnabled] = useState(false);

  const toggleSmsSwitch = () => setIsSmsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ height: screenHeight / 1.13 }}>
          <NavigationMenu name='Месенджеры'/>
          <Text style={styles.description}>Настройте через какие мессенджеры отправлять уведомления</Text>
          <View style={styles.switchContainer}>
            <View style={styles.optionContent}>
              <FontAwesome5 name="sms" size={24} color="#9C0A35" />
              <Text style={styles.label}>SMS</Text>
            </View>
            <Switch
              onValueChange={toggleSmsSwitch}
              value={isSmsEnabled}
            />
          </View>
        </View>
        <View style={{ height: screenHeight / 3 }}>
          <Buttons title='Сохранить' />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#21212E',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
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
    padding: 1,
    paddingHorizontal: 15,
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
});

export default Messengers;
