import React, { useState } from 'react';
import { View, Text,} from 'react-native';
import AccordionItem from './accardion';

const Dashboard = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',padding:10 }}>
      <AccordionItem title="Accordion Item 1">
        <Text>This is the content of the first item.</Text>
      </AccordionItem>
      <AccordionItem title="Accordion Item 2">
        <Text>This is the content of the second item.</Text>
      </AccordionItem>
      <AccordionItem title="Accordion Item 3">
        <Text>This is the content of the third item.</Text>
      </AccordionItem>
    </View>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })
export default Dashboard;
