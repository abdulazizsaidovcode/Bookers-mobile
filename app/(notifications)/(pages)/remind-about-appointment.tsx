import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, SafeAreaView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import BottomModal from '@/components/(modals)/modal-bottom';
import Buttons from '@/components/(buttons)/button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import { fetchAllData } from '@/helpers/api-function/notifications/notifications';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const RemindAboutAppointment = () => {
  const { isAppoinmentModal, appoinmentData, setAppoinmentData, setIsAppoinmentModal } = useNotificationsStore();
  const [selectedHour, setSelectedHour] = useState('0');
  const [selectedMinute, setSelectedMinute] = useState('0');

  useEffect(() => {
    fetchAllData(setAppoinmentData, 'APPOINTMENT')
  })

  const toggleSwitch = () => setAppoinmentData({ ...appoinmentData, isActive: !appoinmentData.isActive });
  const toggleModal = () => setIsAppoinmentModal(!isAppoinmentModal);

  const onMessageChange = (text: string) => setAppoinmentData({ ...appoinmentData, text})

  const hours = Array.from({ length: 25 }, (_, i) => i.toString());
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString());

  const renderPickerItems = (items: string[], selectedItem: string, onSelectItem: (val: string) => void) => (
    <ScrollView style={styles.picker}>
      {items.map((item) => (
        <TouchableOpacity key={item} onPress={() => onSelectItem(item)} style={styles.pickerItem}>
          <Text style={[styles.pickerItemText, selectedItem === item && styles.selectedPickerItemText]}>
            {item} {items === hours ? 'ч.' : 'мин.'}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

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
                value={!appoinmentData.isActive}
              />
            </View>
          </View>
          {appoinmentData.isActive ?
            <View style={{ marginTop: 10 }}>
              <View style={styles.mainComtainer}>
                <Text style={styles.timeText}>Перед сеансом</Text>
                <Pressable onPress={toggleModal} style={{ backgroundColor: '#4B4B64', height: 50, marginTop: 5, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', borderRadius: 10, justifyContent: 'space-between' }}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>{selectedHour} час. {selectedMinute} мин</Text>
                  <MaterialIcons name={isAppoinmentModal ? 'keyboard-arrow-up' : "keyboard-arrow-down"} size={26} color="white" />
                </Pressable>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.messageLabel}>Шаблон сообщения</Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={10}
                onChangeText={onMessageChange}
                value={appoinmentData.text}
                />
              </View>
            </View> : ''}
        </View>
        <BottomModal isBottomModal={isAppoinmentModal} toggleBottomModal={toggleModal}>
          <View style={{ width: screenWidth / 1.3 }}>
            <View style={styles.modalContent}>
              <View style={styles.customPickerContainer}>
                {renderPickerItems(hours, selectedHour, setSelectedHour)}
                {renderPickerItems(minutes, selectedMinute, setSelectedMinute)}
              </View>
            </View>
            <Buttons title="Выбрать" onPress={toggleModal} />
          </View>
        </BottomModal>
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
  mainComtainer: {
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
  },
  modalContent: {
    padding: 20,
  },
  customPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  picker: {
    maxHeight: 200,
  },
  pickerItem: {
    paddingVertical: 10,
    alignItems: 'center'
  },
  pickerItemText: {
    fontSize: 22,
    color: '#828282'
  },
  selectedPickerItemText: {
    color: '#fff',
    backgroundColor: '#9C0A35',
    padding: 5,
    width: screenWidth / 4,
    textAlign: 'center',
    borderRadius: 5
  },
  selectedTime: {
    fontSize: 18,
    color: '#000'
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
});

export default RemindAboutAppointment;
