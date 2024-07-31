import { getFreeTime } from '@/helpers/api-function/freeTime/freeTime';
import { useScheduleFreeTime } from '@/helpers/state_managment/freeTime/freeTime';
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore';
import { useOrderPosdData } from '@/helpers/state_managment/order/order';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import CenteredModal from '@/components/(modals)/modal-centered';
import { useSheduleData } from '@/helpers/state_managment/schedule/schedule';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { serviceMaster } from '@/helpers/api';
import tw from 'tailwind-react-native-classnames';
import Buttons from '@/components/(buttons)/button';
import { FontAwesome } from '@expo/vector-icons';
import { Loading } from '@/components/loading/loading';
const { width } = Dimensions.get('window');

const Booked: React.FC = () => {
    const [activeTab, setActiveTab] = useState('');
    const [activeTime, setActiveTime] = useState('');
    const { FreeTime, setFreeTime } = useScheduleFreeTime();
    const { calendarDate } = graficWorkStore();
    const { setStatus } = useOrderPosdData();
    const [activeBtn, setActiveBtn] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { setTime, setServiceId, setDate } = useSheduleData();
    const { selectedClient, masterServis, setSelectedCategoryId, selectedCategoryId } = ClientStory();
    const route = useRoute<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = route.params;

    useFocusEffect(
        useCallback(() => {
            return () => {
                setActiveTab('');
                setActiveTime('');
            };
        }, [setFreeTime])
    );

    useFocusEffect(
        useCallback(() => {
            if (id.masterId) {
                setLoading(true)
                setDate(calendarDate);
                getFreeTime(calendarDate, setFreeTime, id.masterId, setLoading);

            } else {
                if (calendarDate && selectedClient && selectedClient.id) {
                    setLoading(true)
                    setDate(calendarDate);
                    getFreeTime(calendarDate, setFreeTime, selectedClient.id,setLoading);
                }
            }

        }, [calendarDate, setFreeTime])
    );

    useEffect(() => {
        if (calendarDate && activeTime && activeTab) {
            setActiveBtn(true);
        }
    }, [calendarDate, activeTime, activeTab]);

    useEffect(() => {
        setActiveTab('');
        setActiveTime('');
        setFreeTime('');
    }, [calendarDate]);

    const handleTimeSelect = (time: string) => {
        setActiveTime(time);
        setTime(time);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
        setStatus(''); // Reset status after closing the modal
    };

    const handleTabChange = (tab: any) => {
        let arr: any = []

        if (selectedCategoryId && selectedCategoryId.includes(tab)) {
            arr = selectedCategoryId.filter((res: any) => res !== tab)
        } else {
            if (selectedCategoryId) {
                arr = [...selectedCategoryId, tab]
            }
        };

        setSelectedCategoryId(arr)
        setActiveTab((prevActiveTab) => (prevActiveTab === tab ? '' : tab));
        setServiceId([tab]);
        setActiveTime(''); // Reset active time when tab changes
    };

    useEffect(() => {
        setTimeout(() => {
            console.log('');
        }, 1000)
    }, [selectedCategoryId])

    return (
        <>
            <View style={styles.accordionContainer}>
                {FreeTime && masterServis && <Text style={{ marginVertical: 16, color: '#fff', fontSize: 18 }}>Свободное время</Text>}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.tabContainer}
                >
                    {FreeTime && masterServis && masterServis.length > 0 ? (
                        masterServis.map((service: any) => (
                            <TouchableOpacity
                                key={service.id}
                                style={[styles.tabButton, selectedCategoryId?.includes(service.id) && styles.activeTab]}
                                onPress={() => handleTabChange(service.id)}
                            >
                                <Text style={[styles.tabText, !selectedCategoryId?.includes(service.id) && styles.inactiveText]}>
                                    {service.name.trim()}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        // <Text style={styles.placeholderText}>Нет услуг</Text>
                        null
                    )}
                </ScrollView>
                <View>
                    <View style={styles.timeContainer}>
                        {loading ? <Loading /> : (
                            FreeTime ? (
                                FreeTime.map((time: string, index) => (
                                    <TouchableOpacity
                                        key={`${time}-${index}`} // Ensure uniqueness by combining time and index
                                        style={[styles.timeButton, activeTime === time && styles.activeTimeButton]}
                                        onPress={() => handleTimeSelect(time)}
                                    >
                                        <Text style={[styles.timeText, activeTime === time && styles.activeTimeText]}>
                                            {time.slice(0, 5)}
                                        </Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <View style={[tw`px-5`]}>
                                    <View style={[tw`px-8`]}>
                                        <Text style={styles.placeholderText}>К сожалению в указанную дату у мастера нет свободного времени.</Text>
                                        <Text style={styles.placeholderTextHall}>Но Вы можете оставить заявку в зал ожидания</Text>

                                        <View style={[tw`flex-row items-center mt-2 mb-5 px-6`, { gap: 10 }]}>
                                            <FontAwesome style={[tw` `, { fontSize: 40, color: '#828282' }]} name='calendar' />
                                            <Text style={[tw`text-white`, { color: '#828282' }]}>Если время Вашего мастера освободиться, то Ваш зарос может быть принят на этот день!</Text>
                                        </View>
                                    </View>
                                    <Buttons title='Оставить заявку' />
                                </View>
                            ))
                        }
                    </View>
                </View>
            </View>

            <CenteredModal
                isModal={isModalVisible}
                toggleModal={toggleModal}
                btnWhiteText="Close"
                btnRedText="Confirm"
                isFullBtn={false}
                onConfirm={toggleModal}
            >
                <Text>Order successfully booked!</Text>
            </CenteredModal>
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
        marginVertical: 10,
        paddingLeft: 0,
        gap: 10,
    },
    tabButton: {
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
    },
    activeTab: {
        backgroundColor: '#9C0A35',
        borderColor: '#9C0A35',
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
        rowGap: 7,
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    timeButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        width: width / 4.7,
        borderRadius: 5,
        alignItems: 'center',
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
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    placeholderTextHall: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 18
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },
});

export default Booked;
