// Schedule.tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Tabs from './components/tabs';
import Bookedschedule from './bookedschedule';
import Availebleschedule from './availebleschedule';
import { SafeAreaView } from 'react-native-safe-area-context';

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('booked');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'booked' && <Bookedschedule />}
      {activeTab === 'requests' && <Availebleschedule />}
    </SafeAreaView>
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
