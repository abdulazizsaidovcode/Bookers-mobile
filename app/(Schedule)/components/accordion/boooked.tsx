import Buttons from '@/components/(buttons)/button';
import { master_service_list } from '@/helpers/api';
import { getFreeTime } from '@/helpers/api-function/freeTime/freeTime';
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime';
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore';
import { useOrderPosdData } from '@/helpers/state_managment/order/order';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useCallback, Children } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { List } from 'react-native-paper';
import axios from 'axios';
import { config } from '@/helpers/token';
import CenteredModal from '@/components/(modals)/modal-centered';
import { useSheduleData } from '@/helpers/state_managment/schedule/schedule';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { getUser } from '@/helpers/api-function/getMe/getMee';
const { width, height } = Dimensions.get('window');


const BookedAccordion: React.FC = () => {
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [activeTime, setActiveTime] = useState('');
    const { FreeTime, setFreeTime } = useScheduleFreeTime();
    const { calendarDate } = graficWorkStore();
    const { OrderData, setOrderData, status, setStatus } = useOrderPosdData();
    const navigation = useNavigation<any>();
    const [activeBtn, setActiveBtn] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { setTime, setServiceId, setDate } = useSheduleData()
    const { getMee, setGetMee } = useGetMeeStore()

    useFocusEffect(
        useCallback(() => {
            // Reset state when the page is focused or unfocused
            return () => {
                setActiveTab('');
                setActiveTime('');
            };
        }, [setFreeTime])
    );

    useEffect(() => {
        if (calendarDate && getMee.id) {
            setDate(calendarDate)
            getFreeTime(calendarDate, setFreeTime, getMee.id);
        }
        getUser(setGetMee);
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
        setServiceId(tab)
        setActiveTime(''); // Reset active time when tab changes
    };

    const handleTimeSelect = (time: string) => {
        setActiveTime(time);
        setTime(time)

    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
        setStatus(""); // Reset status after closing the modal
    };

    return (
        <>
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
                    {services && services.length > 0 ? services.map((service: any) => (
                        <TouchableOpacity
                            key={service.id}
                            style={[styles.tabButton, activeTab === service.id && styles.activeTab]}
                            onPress={() => handleTabChange(service.id)}
                        >
                            <Text style={[styles.tabText, activeTab !== service.id && styles.inactiveText]}>
                                {service.category.name.trim()}
                            </Text>
                        </TouchableOpacity>
                    )) : <Text style={styles.placeholderText}>Нет услуг</Text>}
                </ScrollView>
                <View>
                    {activeTab && (
                        <View style={styles.timeContainer}>
                            {FreeTime ? FreeTime.map((time: string, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.timeButton, activeTime === time && styles.activeTimeButton]}
                                    onPress={() => handleTimeSelect(time)}
                                >
                                    <Text style={[styles.timeText, activeTime === time && styles.activeTimeText]}>
                                        {time.slice(0, 5)}
                                    </Text>
                                </TouchableOpacity>
                            )) : <Text style={styles.placeholderText}>Нет свободного времени</Text>}
                        </View>
                    )}
                </View>
            </List.Accordion>

            {<CenteredModal
                isModal={isModalVisible}
                toggleModal={toggleModal}
                btnWhiteText="Close"
                btnRedText="Confirm"
                isFullBtn={false}
                onConfirm={toggleModal}
            >
                <Text>Order successfully booked!</Text>
            </CenteredModal>}
        </>
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
    timeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        // justifyContent: 'center',
        gap: 8.830
    },
    timeButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        width: width / 4.7,
        borderRadius: 5,
        alignItems: 'center'
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
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },

});

export default BookedAccordion;
