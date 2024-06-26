import { View, Text } from 'react-native'
import React from 'react'
import BookedAccordion from './components/accordion/boooked'
import AvailableAccordion from './components/accordion/Available'
import CalendarGrafficEdit from '../(free)/(work-grafic-edit)/calendar'

const Bookedschedule = () => {
    return (
        <View>
            <CalendarGrafficEdit/>
            <BookedAccordion />
            <AvailableAccordion/>
        </View>
    )
}

export default Bookedschedule