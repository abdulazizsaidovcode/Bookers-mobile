// TimeSlotSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import UseGrafficStore from "@/helpers/state_managment/graficWork/graficWorkStore2";

const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const TimeWorkEdit: React.FC = () => {
    const { startTime, endTime, setStartTime, setEndTime, resetTimes } = UseGrafficStore();

    const handleTimePress = (time: string) => {
        if (!startTime) {
            setStartTime(time);
        } else if (!endTime) {
            setEndTime(time);
        } else {
            resetTimes();
            setStartTime(time);
        }
    };

    const isSelected = (time: string) => time === startTime || time === endTime;

    const isDisabled = (time: string) => {
        if (startTime && new Date(`1970-01-01T${time}:00Z`) < new Date(`1970-01-01T${startTime}:00Z`)) {
            return true;
        }
        if (startTime && endTime && new Date(`1970-01-01T${time}:00Z`) > new Date(`1970-01-01T${endTime}:00Z`)) {
            return true;
        }
        return false;
    };

    return (
        <View style={styles.container}>
            {timeSlots.map((time) => (
                <TouchableOpacity
                    key={time}
                    onPress={() => handleTimePress(time)}
                    style={[
                        styles.timeSlot,
                        isSelected(time) && styles.selectedTimeSlot,
                        isDisabled(time) && styles.disabledTimeSlot,
                    ]}
                    disabled={isDisabled(time)}
                >
                    <Text style={styles.timeText}>{time}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#333',
        padding: 10,
    },
    timeSlot: {
        width: 70,
        height: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    selectedTimeSlot: {
        backgroundColor: '#f00',
    },
    disabledTimeSlot: {
        backgroundColor: '#555',
    },
    timeText: {
        color: '#fff',
    },
});

export default TimeWorkEdit;
