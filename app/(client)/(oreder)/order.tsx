import { View, StyleSheet, Text, } from 'react-native'
import React from 'react'
import Booked from './components/boooked'
import CalendarGrafficEdit from '@/app/(free)/(work-grafic-edit)/calendar'
import NavigationMenu from '@/components/navigation/navigation-menu'

const OrderClient = () => {

  return (
    <View style={styles.container}>
      <NavigationMenu name='График' />
      <Text>Сегодня четверг, 23 февраля</Text>
      <CalendarGrafficEdit />
      <Booked />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    flex: 1,
    width: '100%',
  }
});

export default OrderClient