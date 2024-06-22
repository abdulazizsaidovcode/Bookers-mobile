import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity 
        style={[
          styles.tabButton, 
          activeTab === 'booked' && styles.activeTab, 
          activeTab !== 'booked' && styles.inactiveTab
        ]} 
        onPress={() => onTabChange('booked')}
      >
        <Text style={[styles.tabText, activeTab !== 'booked' && styles.inactiveText]}>
          Забронировано
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.tabButton, 
          activeTab === 'requests' && styles.activeTab, 
          activeTab !== 'requests' && styles.inactiveTab
        ]} 
        onPress={() => onTabChange('requests')}
      >
        <Text style={[styles.tabText, activeTab !== 'requests' && styles.inactiveText]}>
          Запросы
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    gap: 10,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#9C0A35",
  },
  activeTab: {
    backgroundColor: '#9C0A35',
  },
  inactiveTab: {
    borderColor: 'gray',
  },
  tabText: {
    color: '#fff',
  },
  inactiveText: {
    color: 'gray',
  },
});

export default Tabs;
