import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, Modal, Platform, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';

const RemindAboutAppointment = () => {
  const { isReminderEnabled, setIsReminderEnabled } = useNotificationsStore();

  const toggleSwitch = () => {
    setIsReminderEnabled(!isReminderEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <NavigationMenu name='Напоминание о записи' />
        <View style={{ padding: 15 }}>
          <View>
            <Text style={styles.title}>Отправка сообщений клиенту перед сеансом</Text>
          </View>
          <View style={styles.reminderContainer}>
            <View style={{ width: 200 }}>
              <Text style={styles.timeText}>Отправлять напоминание о записи клиенту</Text>
            </View>
            <View>
              <Switch
                onValueChange={toggleSwitch}
                value={isReminderEnabled}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E'
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#B9B9C9',
    padding: 12,
    borderRadius: 10
  },
  label: {
    color: '#fff',
    fontSize: 16
  },
  title: {
    color: 'white',
    fontSize: 17,
    marginBottom: 10
  },
  timeText: {
    color: '#000',
    fontSize: 16
  }
});

export default RemindAboutAppointment;
