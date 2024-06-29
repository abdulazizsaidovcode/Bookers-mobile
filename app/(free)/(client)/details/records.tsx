import {View, ScrollView, StatusBar, TouchableOpacity, Text, StyleSheet} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import {RouteProp, useRoute} from '@react-navigation/native'
import Buttons from "@/components/(buttons)/button";
import CalendarGraffic from "@/app/(free)/(work-grafic)/calendar";
import {StandardNowAndConstClient} from "@/components/clients/client-items";
import React, {useEffect, useState} from "react";
import {useScheduleFreeTime} from "@/helpers/state_managment/freeTime/freeTime";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import {getFreeTime} from "@/helpers/api-function/freeTime/freeTime";
import {fetchServices} from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {postOrder} from "@/helpers/api-function/oreder/oreder";

type CreatingClientScreenRouteProp = RouteProp<RootStackParamList, '(free)/(client)/details/records'>;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/records'>;

const Records = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<CreatingClientScreenRouteProp>();
    const {record} = route.params;
    const {services, setServices} = clientStore()
    const {FreeTime, setFreeTime} = useScheduleFreeTime();
    const {calendarDate} = graficWorkStore();
    const [activeTab, setActiveTab] = useState('');
    const [activeTime, setActiveTime] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [regex, setRegex] = useState(false);
    const [data, setData] = useState<any>('');

    useEffect(() => {
        fetchServices(setServices);
    }, []);

    useEffect(() => {
        fetchServices(setServices);
        if (calendarDate) getFreeTime(calendarDate, setFreeTime)
    }, [calendarDate]);

    useEffect(() => {
        if (calendarDate && activeTime && activeTab) setRegex(true)
        else setRegex(false)
        const data = {
            serviceId: activeTab,
            date: calendarDate,
            timeHour: activeTime && activeTime.slice(0, 2),
            timeMin: activeTime && activeTime.slice(3, 5),
            clientId: record.id,
            comment: ""
        }
        setData(data)
    }, [calendarDate, activeTab, activeTime]);

    const handleTimeSelect = (time: string) => setActiveTime(time)
    const handleTabChange = (tab: string, name: string) => {
        setActiveTab(tab);
        setActiveTime('')
        setCategoryName(name)
    };
    console.log(data)

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={``}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    <View>
                        <StandardNowAndConstClient client={record}/>
                        {categoryName && (
                            <TouchableOpacity activeOpacity={.9} style={styles.button}>
                                <Text style={styles.text}>{categoryName}</Text>
                            </TouchableOpacity>
                        )}
                        <CalendarGraffic/>
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
                                        style={[styles.tabButton, activeTab === service.id && styles.activeTab, {marginRight: 15}]}
                                        onPress={() => handleTabChange(service.id, service.category.name.trim())}
                                    >
                                        <Text style={[styles.tabText, activeTab !== service.id && styles.inactiveText]}>
                                            {service.category.name.trim()}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View>
                            <Text style={[tw`text-center font-bold text-lg w-full my-4 text-white`, {textAlign: 'left'}]}>
                                Свободное время
                            </Text>
                            {activeTab && (
                                <View style={[tw`flex-row flex-wrap items-center mb-10`, {justifyContent: 'center', gap: 10}]}>
                                    {FreeTime ? FreeTime.map((time, index) => (
                                        <TouchableOpacity
                                            activeOpacity={.7}
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
                    </View>
                    <View style={[tw`pb-5`]}>
                        <Buttons
                            title={`Записать`}
                            isDisebled={regex}
                            onPress={() => {
                                postOrder()
                                navigation.navigate('(free)/(client)/details/records-information', {orderID: '517a48f1-3024-432b-ad7b-120551d2506b'})
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
