import { View, StyleSheet, } from 'react-native'
import React from 'react'
import BookedAccordion from './components/accordion/boooked'
import AvailableAccordion from './components/accordion/Available'
import CalendarGraffic from '../(free)/(work-grafic)/calendar'
import Buttons from '@/components/(buttons)/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import CalendarGrafficEdit from '../(free)/(work-grafic-edit)/calendar'

const Bookedschedule = () => {

    return (
        <View style={styles.container}>
            <CalendarGrafficEdit/>
            <AvailableAccordion/>
            <BookedAccordion />
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