import {View, ScrollView, StatusBar, TouchableOpacity, Text, StyleSheet, Image, RefreshControl} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import Buttons from "@/components/(buttons)/button";
import {StandardNowAndConstClient} from "@/components/clients/client-items";
import React, {useCallback, useEffect, useState} from "react";
import {useScheduleFreeTime} from "@/helpers/state_managment/freeTime/freeTime";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import {getFreeTime} from "@/helpers/api-function/freeTime/freeTime";
import {fetchServices, sliceTextFullName} from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {orderTimeEdit, postOrder} from "@/helpers/api-function/oreder/oreder";
import {getFile} from "@/helpers/api";
import {handleRefresh} from "@/constants/refresh";
import {getClientIdStore} from "@/constants/storage";
import {getUser} from "@/helpers/api-function/getMe/getMee";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import CalendarGrafficEdit from "@/app/(free)/(work-grafic-edit)/calendar";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/records'>;

const Records = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<any>();
    const {record} = route.params;
    const {services, setServices, isLoading, setIsLoading, refreshing, setRefreshing} = clientStore()
    const {getMee, setGetMee} = useGetMeeStore()
    const {FreeTime, setFreeTime} = useScheduleFreeTime();
    const {calendarDate} = graficWorkStore();
    const [activeTab, setActiveTab] = useState<any>([]);
    const [activeTime, setActiveTime] = useState('');
    const [categoryName, setCategoryName] = useState<any>([]);
    const [regex, setRegex] = useState(false);
    const [data, setData] = useState<any>('');
    const [updateData, setUpdateData] = useState<any>('');
    const [orderID, setOrderID] = useState<any>('');
    const [userID, setUserID] = useState<any>('');

    useEffect(() => {
        fetchServices(setServices);
        getClientIdStore(setUserID);
        getUser(setGetMee)
    }, []);

    useEffect(() => {
        if (orderID) {
            navigation.navigate('(free)/(client)/details/records-information', {orderID})
            setActiveTab([])
            setActiveTime('')
            setOrderID('')
            setCategoryName([])
        }
    }, [orderID]);

    useEffect(() => {
        fetchServices(setServices);
        if (calendarDate) getFreeTime(calendarDate, setFreeTime, getMee.id)
    }, [calendarDate]);

    useEffect(() => {
        if (calendarDate && activeTime && activeTab.length > 0) setRegex(true)
        else setRegex(false)
        const data = {
            serviceIds: activeTab,
            date: calendarDate,
            timeHour: activeTime && activeTime.slice(0, 2),
            timeMin: activeTime && activeTime.slice(3, 5),
            clientId: record.id,
            comment: ""
        }
        setData(data)
        if (record.updateOrder === 'updateOrder') {
            getClientIdStore(setUserID)
            const updateData = {
                orderId: record.orderOneData.id,
                orderTimeHour: activeTime && activeTime.slice(0, 2),
                orderTimeMinute: activeTime && activeTime.slice(3, 5),
                orderDate: calendarDate,
                clientId: userID
            }
            setUpdateData(updateData)
        }
    }, [calendarDate, activeTab, activeTime]);

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    const handleTimeSelect = (time: string) => setActiveTime(time)
    const handleTabChange = (tab: any, name: string) => {
        if (activeTab.length > 0 && activeTab.includes(tab)) setActiveTab(activeTab.filter((id: any) => id !== tab));
        else setActiveTab([...activeTab, tab]);

        if (categoryName.length > 0 && categoryName.includes(name)) setCategoryName(categoryName.filter((n: any) => n !== name));
        else setCategoryName([...categoryName, name]);

        setActiveTime('')
    };

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={``}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    <View>
                        {record.updateOrder === 'updateOrder' ? (
                            <TouchableOpacity
                                style={[
                                    tw`flex-row items-start justify-start px-4 py-5 mb-3 rounded-2xl`,
                                    {backgroundColor: "#B9B9C9"},
                                ]}
                                activeOpacity={0.8}
                            >
                                <Image
                                    source={(record.orderOneData.attachmentId !== null)
                                        ? {uri: `${getFile}${record.orderOneData?.attachmentId}`}
                                        : require('../../../../assets/avatar.png')
                                    }
                                    style={tw`w-12 h-12 rounded-full`}
                                />
                                <View style={tw`ml-4 flex-col`}>
                                    <Text style={[tw`text-black text-lg font-bold`, {lineHeight: 22}]}>
                                        {sliceTextFullName(record.orderOneData?.fullName)}
                                    </Text>
                                    <Text style={[tw`text-gray-500 text-base`, {lineHeight: 22}]}>
                                        {record.orderOneData?.phone}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ) : <StandardNowAndConstClient client={record}/>}
                        {record.updateOrder === 'updateOrder' ? <>
                            <View style={styles.button}>
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    contentContainerStyle={{gap: 10}}
                                >
                                    {categoryName.length > 0 ? categoryName.map((item: string, idx: number) => (
                                        <Text style={styles.text} key={idx}>{item}</Text>
                                    )) : (record.orderOneData?.serviceName.trim().split(', ').map((item: string, idx: number) => (
                                        <Text style={styles.text} key={idx}>{item}</Text>
                                    )))}
                                </ScrollView>
                            </View>
                        </> : <>
                            {categoryName.length > 0 && (
                                <View style={[styles.button]}>
                                    <ScrollView
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                        contentContainerStyle={{gap: 10}}
                                    >
                                        {categoryName.map((item: any) => (
                                            <Text style={[styles.text]}>{item}</Text>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </>}
                        <View style={tw`mt-5`}>
                            <CalendarGrafficEdit/>
                        </View>
                        <View style={styles.tabContainer}>
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                contentContainerStyle={{marginTop: 8}}
                            >
                                {services && services.map((service: any) => (
                                    <TouchableOpacity
                                        activeOpacity={.7}
                                        key={service.id}
                                        style={[styles.tabButton, activeTab?.includes(service.id) && styles.activeTab, {marginRight: 15}]}
                                        onPress={() => handleTabChange(service.id, service.name.trim())}
                                    >
                                        <Text
                                            style={[styles.tabText, !activeTab?.includes(service.id) && styles.inactiveText]}>
                                            {service.name.trim()}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View>
                            <Text
                                style={[tw`text-center font-bold text-lg w-full my-4 text-white`, {textAlign: 'left'}]}>
                                Свободное время
                            </Text>
                            {activeTab.length > 0 && (
                                <View style={[tw`flex-row flex-wrap items-center mb-10`, {
                                    justifyContent: 'center',
                                    gap: 10
                                }]}>
                                    {FreeTime ? FreeTime.map((time: string, index: number) => (
                                        <TouchableOpacity
                                            activeOpacity={.7}
                                            key={index}
                                            style={[styles.timeButton, activeTime === time && styles.activeTimeButton]}
                                            onPress={() => handleTimeSelect(time)}
                                        >
                                            <Text
                                                style={[styles.timeText, {textAlign: 'center'}, activeTime === time && styles.activeTimeText]}>
                                                {time.slice(0, 5)}
                                            </Text>
                                        </TouchableOpacity>
                                    )) : <Text style={styles.placeholderText}>No available times</Text>}
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={[tw`pb-5`]}>
                        <Buttons
                            title={isLoading ? 'loading...' : 'Записать'}
                            isDisebled={isLoading ? false : regex}
                            onPress={() => {
                                if (record.updateOrder === 'updateOrder') orderTimeEdit({
                                    data: updateData,
                                    setOrderId: setOrderID,
                                    setLoading: setIsLoading
                                })
                                else postOrder({data, setOrderId: setOrderID, setLoading: setIsLoading})
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16
    },
    text: {
        color: '#696868',
        borderWidth: 2,
        borderColor: '#868686',
        alignSelf: 'flex-start',
        fontSize: 16,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 6
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
        // marginRight: 5,
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

export default Records;
