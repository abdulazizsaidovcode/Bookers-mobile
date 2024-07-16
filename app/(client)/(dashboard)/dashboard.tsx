import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, } from 'react-native';
import AccordionItem from './accardion';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
const Dashboard = () => {
  const dataDashboar=[
    {
      id:1,
      image:<Image source={require('@/assets/clientDashboard/Layer_1.png')} />,
      title:'Здоровье и красота волос',
      titleThen:'Рядом с тобой 450',
      // click:router.push('../(client)/(uslugi)/uslugi')
    },
    {
      id:1,
      image:<Image source={require('@/assets/clientDashboard/Layer_1.png')} />,
      title:'Здоровье и красота волос',
      titleThen:'Рядом с тобой 450',
      // click:router.push('../(client)/(uslugi)/uslugi')
    },
    {
      id:1,
      image:<Image source={require('@/assets/clientDashboard/Layer_1.png')} />,
      title:'Здоровье и красота волос',
      titleThen:'Рядом с тобой 450',
      // click:router.push('../(client)/(uslugi)/uslugi')
    },
    {
      id:1,
      image:<Image source={require('@/assets/clientDashboard/Layer_1.png')} />,
      title:'Здоровье и красота волос',
      titleThen:'Рядом с тобой 450',
      // click:router.push('../(client)/(uslugi)/uslugi')
    },
    {
      id:1,
      image:<Image source={require('@/assets/clientDashboard/Layer_1.png')} />,
      title:'Здоровье и красота волос',
      titleThen:'Рядом с тобой 450',
      // click:router.push('../(client)/(uslugi)/uslugi')
    },
  ]
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>Главная</Text>
        <View style={styles.iconGroup}>
          <FontAwesome5 name="bell" size={28} color="white" />
          <Feather  name="bookmark" size={28} color="white" />
        </View>
      </View>
      <View>
        <AccordionItem title="Мои записи" titleThen='У вас пока нет записей, выберите услугу.' backgroundColor='#21212E'>
          <TouchableOpacity style={styles.item}>
            
          </TouchableOpacity>
        </AccordionItem>
        <AccordionItem title="Мои мастера" titleThen='У вас пока нет своих мастеров' backgroundColor='#21212E'>
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
    padding: 18,
    justifyContent: 'flex-start',
  },
  navbar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
  },
  iconGroup:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    gap:8,
  },
  title:{
    color: '#fff',
    fontSize: 20,
    fontWeight: "600",
  },
  item:{
    width: '100%',
    backgroundColor: '#B9B9C9',
  }
})
export default Dashboard;
