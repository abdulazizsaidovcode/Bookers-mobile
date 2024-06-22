import { View, Text } from 'react-native'
import React from 'react'
import BookedAccordion from './components/accordion/boooked'
import AvailableAccordion from './components/accordion/Available'

const Bookedschedule = () => {
    return (
        <View>
            <BookedAccordion />
            <AvailableAccordion/>
        </View>
    )
}

export default Bookedschedule