// Schedule.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Tabs from './components/tabs';
import BookedSchedule from './components/accordion/boooked';
import AvailableAccordion from './components/Available';
import Bookedschedule from './bookedschedule';
import Availebleschedule from './availebleschedule';

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('booked');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'booked' && <Bookedschedule />}
      {activeTab === 'requests' && <Availebleschedule />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#21212E',
  },
});

export default Schedule;
