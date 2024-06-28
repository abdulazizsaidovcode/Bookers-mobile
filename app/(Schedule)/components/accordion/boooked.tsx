import { master_service_list } from '@/helpers/api';
import { getFreeTime } from '@/helpers/api-function/freeTime/freeTime';
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime';
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore';
import { useScheduleBookedStore } from '@/helpers/state_managment/schedule/schedule';
import { config } from '@/helpers/token';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

const BookedAccordion: React.FC = () => {
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const { FreeTime, setFreeTime } = useScheduleFreeTime();
    const { calendarDate } = graficWorkStore();

    useEffect(() => {
        if (calendarDate) {
            getFreeTime(calendarDate, setFreeTime);
        }
    }, [calendarDate, setFreeTime]);

    useEffect(() => {
        fetchServices();
    }, [calendarDate]);

    const fetchServices = () => {
        axios.get(`${master_service_list}`, config)
            .then((res) => {
                setServices(res.data.body);
            })
            .catch((err) => {
                console.error(err);
            });
    };

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
                {services.map((service:any) => (
                    <TouchableOpacity
                        key={service.id}
                        style={[styles.tabButton, activeTab === service.id && styles.activeTab]}
                        onPress={() => handleTabChange(service.id)}
                    >
                        <Text style={[styles.tabText, activeTab !== service.id && styles.inactiveText]}>
                            {service.category.name.trim()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.accordionContent}>
                {activeTab && (
                    <View style={styles.timeContainer}>
                        {FreeTime ? FreeTime.map((time, index) => (
                            <TouchableOpacity key={index} style={styles.timeButton}>
                                <Text style={styles.timeText}>{time}</Text>
                            </TouchableOpacity>
                        )) : <Text style={styles.placeholderText}>No available times</Text>}
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
        overflow: 'scroll',
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
    accordionContent: {},
    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
