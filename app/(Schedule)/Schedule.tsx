import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

import Tabs from './components/tabs';
import Bookedschedule from './bookedschedule';
import RequestSchedule from './availebleschedule';

import { useScheduleAvialableStore, useScheduleBookedStore, useSheduleData } from '@/helpers/state_managment/schedule/schedule';
import { getAvialable, getBookedSchedule } from '@/helpers/api-function/schedule/schedule';
import { getFreeTime } from '@/helpers/api-function/freeTime/freeTime';
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime';
import Buttons from '@/components/(buttons)/button';
import { useOrderPosdData } from '@/helpers/state_managment/order/order';
import { useNavigation } from 'expo-router';
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore';

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('booked');
  const [active, setActive] = useState(true)

  const { schedule, setSchedule } = useScheduleBookedStore();
  const { scheduleBooked, setScheduleBooked } = useScheduleAvialableStore();
  const { FreeTime, setFreeTime } = useScheduleFreeTime();

  const { serviceId, date, timeHour, setServiceId, setDate, setTime } = useSheduleData()
  const { setOrderData } = useOrderPosdData();
  const navigation = useNavigation<any>()
  const { calendarDate } = graficWorkStore();

  useEffect(() => {
    if (serviceId && calendarDate && timeHour) {
      setActive(false)
    } else {
      setActive(true)
    }
  }, [serviceId, timeHour, calendarDate])

  useEffect(() => {
    setServiceId('')
    setDate('')
    setTime('')
  }, [calendarDate])

  const setOrder = () => {
    const order = {
      serviceId: serviceId,
      date: calendarDate,
      timeHour: parseInt(timeHour.split(':')[0], 10),
      timeMin: parseInt(timeHour.split(':')[1], 10),
      comment: "" // This should be dynamically set
    };

    setOrderData(order);
    setServiceId('')
    setDate('')
    setTime('')
    navigation.navigate('(Schedule)/components/users');
  };


  useEffect(() => {
    getBookedSchedule(new Date().toISOString().split('T')[0], setSchedule);
  }, [setSchedule]);

  useEffect(() => {
    getAvialable(setScheduleBooked);
  }, [setScheduleBooked]);

  useEffect(() => {
    getFreeTime(new Date().toISOString().split('T')[0], setFreeTime);
  }, [setFreeTime]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <ScrollView >
        <View style={{ flex: 1, marginBottom: 35 }}>
          <View>
            <Text style={[tw`text-white text-3xl my-7 font-bold`, { letterSpacing: 2 }]}>Расписание</Text>
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
          </View>
          {activeTab === 'booked' && <Bookedschedule />}
          {activeTab === 'requests' && <RequestSchedule />}
        </View>
      </ScrollView >
      {activeTab == 'booked' && <View style={styles.button}>
        <Buttons
          title='Записать клиента'
          isDisebled={!active}
          onPress={setOrder}
        />
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#21212E',
  },
  button: {
    position: 'absolute',
    borderRadius: 8,
    paddingBottom: 16,
    paddingTop: 16,
    bottom: 1,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Schedule;
