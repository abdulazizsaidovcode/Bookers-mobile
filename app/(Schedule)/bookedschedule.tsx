import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import BookedAccordion from './components/accordion/boooked'
import AvailableAccordion from './components/accordion/Available'
import CalendarGrafficEdit from '../(free)/(work-grafic-edit)/calendar'
import CalendarGraffic from '../(free)/(work-grafic)/calendar'

const Bookedschedule = () => {
    return (
        <ScrollView style={styles.container}>
            <CalendarGraffic/>
            <BookedAccordion />
            <AvailableAccordion/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#21212E',
    },
  });

export default Bookedschedule