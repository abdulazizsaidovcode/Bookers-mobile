import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native';
import AccordionItem from './accardion';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text>Главная</Text>
        <View>
          <FontAwesome5 name="bell" size={24} color="white" />
          <Feather name="bookmark" size={24} color="white" />
        </View>
      </View>
      <View>
        <AccordionItem title="Accordion Item 1">
          <Text>This is the content of the first item.</Text>
        </AccordionItem>
        <AccordionItem title="Accordion Item 2">
          <Text>This is the content of the second item.</Text>
        </AccordionItem>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'flex-start',
  },
  navbar:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})
export default Dashboard;
