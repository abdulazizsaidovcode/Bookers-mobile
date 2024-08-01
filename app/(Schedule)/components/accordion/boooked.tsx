import { getFreeTime } from '@/helpers/api-function/freeTime/freeTime';
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime';
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore';
import { useOrderPosdData } from '@/helpers/state_managment/order/order';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import CenteredModal from '@/components/(modals)/modal-centered';
import { useSheduleData } from '@/helpers/state_managment/schedule/schedule';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { getUser } from '@/helpers/api-function/getMe/getMee';
import { fetchServices } from '@/helpers/api-function/client/client';
import { useFocusEffect } from 'expo-router';
import { Loading } from '@/components/loading/loading';

const { width } = Dimensions.get('window');

const BookedAccordion: React.FC = () => {
    const [services, setServices] = useState<any>([]);
    const [activeTab, setActiveTab] = useState('');
    const [activeTime, setActiveTime] = useState('');
    const { FreeTime, setFreeTime } = useScheduleFreeTime();
    const { calendarDate } = graficWorkStore();
    const { OrderData, setOrderData, status, setStatus } = useOrderPosdData();
    const navigation = useNavigation<any>();
    const [activeBtn, setActiveBtn] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { setTime, setServiceId, setDate } = useSheduleData();
    const { getMee, setGetMee } = useGetMeeStore();
    const [loading, setLoading] = useState(true); // loading state

    useEffect(() => {
        async function getFreeTimeAndUser() {
            if (calendarDate && getMee.id) {
                setLoading(true);
                await setDate(calendarDate);
                await getFreeTime(calendarDate, setFreeTime, getMee.id, setLoading);
                await getUser(setGetMee);
            }
        }

        getFreeTimeAndUser();
    }, [calendarDate, getMee.id]);
    console.log(FreeTime);


    useEffect(() => {
        if (calendarDate && activeTime && activeTab) {
            setActiveBtn(true);
        }
    }, [calendarDate, activeTime, activeTab]);

    useEffect(() => {
        fetchServices(setServices);
        setActiveTab('');
        setActiveTime('');
    }, [calendarDate]);

    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
        setServiceId([tab]);
        setActiveTime(''); // Reset active time when tab changes
    };

    const handleTimeSelect = (time: string) => {
        setActiveTime(time);
        setTime(time);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
        setStatus(''); // Reset status after closing the modal
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.timeButton, activeTime === item && styles.activeTimeButton]}
            onPress={() => handleTimeSelect(item)}
        >
            <Text style={[styles.timeText, activeTime === item && styles.activeTimeText]}>
                {item.slice(0, 5)}
            </Text>
        </TouchableOpacity>
    );

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
                                {service.name.trim()}
                            </Text>
                        </TouchableOpacity>
                    )) : <Text style={styles.placeholderText}>Нет услуг</Text>}
                </ScrollView>
                <View>
                    {activeTab && (
                        <View style={styles.timeContainer}>
                            {loading ? (
                                <Loading />
                            ) :
                                FreeTime && FreeTime.length > 0 ? (
                                    <FlatList
                                        numColumns={4}
                                        data={FreeTime}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                ) : (
                                    <Text style={styles.placeholderText}>Нет свободного времени</Text>

                                )}
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
        gap: 8,
    },
    timeButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        width: width / 4.7,
        borderRadius: 5,
        alignItems: 'center',
        margin: 3
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
