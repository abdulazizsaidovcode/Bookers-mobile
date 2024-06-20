import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = () => {
    return (
        <View style={styles.container}>
            <Calendar
                current={'2024-02-01'}
                markedDates={{
                    '2024-02-23': { selected: true, marked: true, selectedColor: '#9C0A35' }
                }}
                onDayPress={(day: string) => {
                    console.log(day);
                }}
                style={{
                    width: 350,
                    borderRadius: 20,
                    padding: 10
                }}
            />
        </View>
    );
};

export default CalendarComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});