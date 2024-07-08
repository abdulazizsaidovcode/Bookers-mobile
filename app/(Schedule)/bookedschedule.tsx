import { View, StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import BookedAccordion from './components/accordion/boooked'
import AvailableAccordion from './components/accordion/Available'
import CalendarGrafficEdit from '../(free)/(work-grafic-edit)/calendar'
import CalendarComponent from '@/components/calendar/calendar'
import { useSheduleData } from '@/helpers/state_managment/schedule/schedule'
import { useOrderPosdData } from '@/helpers/state_managment/order/order'
import { useNavigation } from 'expo-router'
import Buttons from '@/components/(buttons)/button'

const Bookedschedule = () => {
  
  return (
    <View style={styles.container}>
      <CalendarGrafficEdit/>
      <AvailableAccordion />
      <BookedAccordion />
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