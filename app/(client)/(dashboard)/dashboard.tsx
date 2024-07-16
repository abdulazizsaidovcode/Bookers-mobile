import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView,} from 'react-native';
import AccordionItem from './accardion';

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      
      <AccordionItem title="Accordion Item 1">
        <Text>This is the content of the first item.</Text>
      </AccordionItem>
      <AccordionItem title="Accordion Item 2">
        <Text>This is the content of the second item.</Text>
      </AccordionItem>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
})
export default Dashboard;
