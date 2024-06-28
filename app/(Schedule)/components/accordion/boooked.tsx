import { getFreeTime } from '@/helpers/api-function/freeTime/freeTime';
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime';
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore';
import { useScheduleBookedStore } from '@/helpers/state_managment/schedule/schedule';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

const availableTimes = [
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30'
];

const BookedAccordion: React.FC = () => {
    const [activeTab, setActiveTab] = useState('haircuts');
    const { FreeTime, setFreeTime } = useScheduleFreeTime()

    const { calendarDate } = graficWorkStore()

    useEffect(() => {
        if (calendarDate) {
            console.log("Fetching free time for date:", calendarDate);
            getFreeTime(calendarDate, setFreeTime);
        }
    }, [calendarDate, setFreeTime]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <List.Accordion
            title="Свободное время"
            titleStyle={styles.title}
            style={styles.accordionContainer}
            theme={{ colors: { background: 'transParent' } }}
        >
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'haircuts' && styles.activeTab]}
                    onPress={() => handleTabChange('haircuts')}
                >
                    <Text style={[styles.tabText, activeTab !== 'haircuts' && styles.inactiveText]}>
                        Стрижки
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'styling' && styles.activeTab]}
                    onPress={() => handleTabChange('styling')}
                >
                    <Text style={[styles.tabText, activeTab !== 'styling' && styles.inactiveText]}>
                        Укладки
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'evening' && styles.activeTab]}
                    onPress={() => handleTabChange('evening')}
                >
                    <Text style={[styles.tabText, activeTab !== 'evening' && styles.inactiveText]}>
                        Вечерние и ...
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.accordionContent}>
                {activeTab === 'haircuts' && (
                    <View style={styles.timeContainer}>
                        {FreeTime ? FreeTime.map((time, index) => (
                            <TouchableOpacity key={index} style={styles.timeButton}>
                                <Text style={styles.timeText}>{time}</Text>
                            </TouchableOpacity>
                        )) : "No data"}
                    </View>
                )}
                {/* Placeholder content for other tabs */}
                {activeTab === 'styling' && (
                    <View style={styles.timeContainer}>
                        <Text style={styles.placeholderText}>No available times for Укладки</Text>
                    </View>
                )}
                {activeTab === 'evening' && (
                    <View style={styles.timeContainer}>
                        <Text style={styles.placeholderText}>No available times for Вечерние и ...</Text>
                    </View>
                )}
            </View>
        </List.Accordion>
    );
};

const styles = StyleSheet.create({
    accordionContainer: {
        backgroundColor: 'transparent',
    },
    title: {
        color: '#fff',
    },
    tabContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingLeft: 0,
        gap: 10,
    },
    tabButton: {
        padding: 10,
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 1,
    },
    activeTab: {
        backgroundColor: '#9C0A35',
        borderColor: "#9C0A35",

    },
    tabText: {
        color: '#fff',
    },
    inactiveText: {
        color: 'gray',
    },
    accordionContent: {
        // padding: 10,
    },
    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // width: 20,
        // justifyContent: 'space-between',
    },
    timeButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        width: 82,
        borderRadius: 5,
        margin: 5,
    },
    timeText: {
        color: '#9C0A35',
    },
    placeholderText: {
        color: 'gray',
    },
});


export default BookedAccordion;
