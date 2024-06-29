import Buttons from '@/components/(buttons)/button';
import { master_service_list } from '@/helpers/api';
import { getFreeTime } from '@/helpers/api-function/freeTime/freeTime';
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime';
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore';
import { useOrderPosdData } from '@/helpers/state_managment/order/order';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import axios from 'axios';
import { config } from '@/helpers/token';

const BookedAccordion: React.FC = () => {
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [activeTime, setActiveTime] = useState('');
    const { FreeTime, setFreeTime } = useScheduleFreeTime();
    const { calendarDate } = graficWorkStore();
    const { OrderData, setOrderData } = useOrderPosdData();
    const navigation = useNavigation<any>();
    const [activeBtn, setActiveBtn] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            // Reset state when the page is focused or unfocused
            return () => {
                setActiveTab('');
                setActiveTime('');
                // setFreeTime([]);
            };
        }, [setFreeTime])
    );

    useEffect(() => {
        if (calendarDate) {
            getFreeTime(calendarDate, setFreeTime);
        }
    }, [calendarDate, setFreeTime]);

    useEffect(() => {
        if (calendarDate && activeTime && activeTab) {
            setActiveBtn(true);
        }
    }, [calendarDate, activeTime, activeTab]);

    useEffect(() => {
        fetchServices();
        // Clear selections when calendarDate changes
        setActiveTab('');
        setActiveTime('');
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
        setActiveTime(''); // Reset active time when tab changes
    };

    const handleTimeSelect = (time: string) => {
        setActiveTime(time);
    };

    const setOrder = () => {
        const order = {
            serviceId: activeTab,
            date: calendarDate,
            timeHour: parseInt(activeTime.split(':')[0], 10),
            timeMin: parseInt(activeTime.split(':')[1], 10),
            comment: "" // This should be dynamically set
        };

        setOrderData(order);
        navigation.navigate('(Schedule)/components/users');
    };

    return (
        <View>
            <List.Accordion
                title="Свободное время"
                titleStyle={styles.title}
                style={styles.accordionContainer}
                theme={{ colors: { background: 'transparent' } }}
            >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.tabContainer}>
                    {services.map((service: any) => (
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
                </ScrollView>
                <View style={styles.accordionContent}>
                    {activeTab && (
                        <View style={styles.timeContainer}>
                            {FreeTime ? FreeTime.map((time, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.timeButton, activeTime === time && styles.activeTimeButton]}
                                    onPress={() => handleTimeSelect(time)}
                                >
                                    <Text style={[styles.timeText, activeTime === time && styles.activeTimeText]}>
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            )) : <Text style={styles.placeholderText}>No available times</Text>}
                        </View>
                    )}
                </View>
            </List.Accordion>
            <Buttons
                title='Записать клиента'
                isDisebled={activeBtn}
                onPress={setOrder}
            />
        </View>
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
        marginRight: 10,
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
        marginBottom: 20,
    },
    timeButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        width: 82,
        borderRadius: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    activeTimeButton: {
        backgroundColor: '#9C0A35',
    },
    timeText: {
        color: '#9C0A35',
    },
    activeTimeText: {
        color: '#fff',
    },
    placeholderText: {
        color: 'gray',
    },
});

export default BookedAccordion;
