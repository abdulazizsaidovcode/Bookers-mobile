import { View, StyleSheet, } from 'react-native'
import React from 'react'
import BookedAccordion from './components/accordion/boooked'
import AvailableAccordion from './components/accordion/Available'
import CalendarGraffic from '../(free)/(work-grafic)/calendar'
import Buttons from '@/components/(buttons)/button'

const Bookedschedule = () => {
    return (
        <View style={styles.container}>
            <CalendarGraffic/>
            <AvailableAccordion/>
            <BookedAccordion />
            <Buttons title='Записать клиента' isDisebled={false}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    button:{
      backgroundColor: '#9C0A35',
      color: '#fff',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: 20,
    }
  });

export default Bookedschedule