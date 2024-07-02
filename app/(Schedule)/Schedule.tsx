// Schedule.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Tabs from './components/tabs';
import Bookedschedule from './bookedschedule';
import Requestchedule from './availebleschedule';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScheduleAvialableStore, useScheduleBookedStore } from '@/helpers/state_managment/schedule/schedule';
import { getAvialable, getBookedSchedule } from '@/helpers/api-function/schedule/schedule';
import { getFreeTime } from '@/helpers/api-function/freeTime/freeTime';
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime';
import tw from 'tailwind-react-native-classnames';

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('booked');

  const { schedule, setSchedule } = useScheduleBookedStore()
  const { scheduleBooked, setScheduleBooked } = useScheduleAvialableStore()
  const { FreeTime, setFreeTime } = useScheduleFreeTime()


  useEffect(() => {
    getBookedSchedule(new Date().toISOString().split('T')[0], setSchedule);
  }, [setSchedule]);

  useEffect(() => {
    getAvialable(setScheduleBooked);
  }, [setScheduleBooked]);

  useEffect(() => {
    getFreeTime(new Date().toISOString().split('T')[0], setFreeTime);
    console.log(FreeTime, "slaom");

  }, [setSchedule]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={[tw`text-white text-3xl my-7 font-bold`, { letterSpacing: 2 }]}>Расписание</Text>

        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
        {activeTab === 'booked' && <Bookedschedule />}
        {activeTab === 'requests' && <Requestchedule />}
      </SafeAreaView>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#21212E',
  },
});

export default Schedule;
