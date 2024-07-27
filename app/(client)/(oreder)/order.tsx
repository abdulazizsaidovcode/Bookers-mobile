import { View, StyleSheet, } from 'react-native'
import React from 'react'
import Booked from './components/boooked'
import CalendarGrafficEdit from '@/app/(free)/(work-grafic-edit)/calendar'

const Bookedschedule = () => {
  
  return (
    <View style={styles.container}>
      <CalendarGrafficEdit/>
      <Booked />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  }
});

export default Bookedschedule