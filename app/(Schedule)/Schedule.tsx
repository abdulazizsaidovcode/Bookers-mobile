// Schedule.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Tabs from './components/tabs';
import Bookedschedule from './bookedschedule';
import Availebleschedule from './availebleschedule';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useScheduleAvialableStore, useScheduleBookedStore } from '@/helpers/state_managment/schedule/schedule';
import { getAvialable, getBookedSchedule } from '@/helpers/api-function/schedule/schedule';
import { getFreeTime } from '@/helpers/api-function/freeTime/freeTime';
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime';

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
    console.log(FreeTime,"slaom");
    
  }, [setSchedule]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <ScrollView style={styles.container}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'booked' && <Bookedschedule />}
      {activeTab === 'requests' && <Availebleschedule />}
    </ScrollView>
  );
};

// {
//   "categoryId": "6d85520e-0509-4323-affb-3ca8f014ef7e",
//   "name": "kalla kesins",
//   "genderId": [
//     1
//   ],
//   "price": 2000,
//   "description": "ogritme sezdirme kalla kesamiz arra bilan",
//   "attachmentId": "8bffe6cf-a163-414c-b621-5be315c90674",
//   "active": true
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#21212E',
  },
});

export default Schedule;
