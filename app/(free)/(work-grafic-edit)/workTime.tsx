import React, { useState, useCallback } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import TimesCard from "@/components/grafic/timesCard";
import WeeklCard from "@/components/grafic/weeklCard";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { useFocusEffect, useNavigation } from "expo-router";

// Type definition for navigation prop
type SettingsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "(free)/(work-grafic-edit)/workTime"
>;

// List of time slots
const timeList = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const TimeWorkEdit: React.FC = () => {
    const { weekData, timeData, setSelectedTimeSlot, setMethod } = graficWorkStore();
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    useFocusEffect(
        useCallback(() => {
            if (timeData && timeData.from && timeData.end) {
                const fromTime = timeData.from.substring(0, 5);
                const endTime = timeData.end.substring(0, 5);
                if (timeList.includes(fromTime) && timeList.includes(endTime)) {
                    setSelectedTimeSlots([fromTime, endTime]);
                }
            }
            return () => { };
        }, [timeData])
    );

    useFocusEffect(
        useCallback(() => {
            setIsDisabled(selectedTimeSlots.length < 2);
            return () => { };
        }, [selectedTimeSlots])
    );

    const sortSelectedTimeSlots = (slots: string[]): string[] => {
        return slots.sort((a, b) => timeList.indexOf(a) - timeList.indexOf(b));
    };

    const toggleTimeSlotSelection = (time: string) => {
        setSelectedTimeSlots((prevSelectedTimeSlots) => {
            if (prevSelectedTimeSlots.includes(time)) {
                return prevSelectedTimeSlots.filter((slot) => slot !== time);
            } else {
                if (prevSelectedTimeSlots.length < 2) {
                    return sortSelectedTimeSlots([...prevSelectedTimeSlots, time]);
                } else {
                    const closestIndex = prevSelectedTimeSlots.reduce((closest, slot) => {
                        const currentIndex = timeList.indexOf(slot);
                        const newIndex = timeList.indexOf(time);
                        const closestIndex = timeList.indexOf(closest);
                        return Math.abs(newIndex - currentIndex) < Math.abs(newIndex - closestIndex) ? slot : closest;
                    }, prevSelectedTimeSlots[0]);
                    return sortSelectedTimeSlots(prevSelectedTimeSlots.map((slot) =>
                        slot === closestIndex ? time : slot
                    ));
                }
            }
        });
    };

    const getRangeIndices = () => {
        if (selectedTimeSlots.length < 2) return [];

        const indices = selectedTimeSlots
            .map((slot) => timeList.indexOf(slot))
            .sort((a, b) => a - b);
        const [start, end] = [indices[0], indices[indices.length - 1]];

        return timeList.slice(start, end + 1);
    };

    const rangeIndices = getRangeIndices();

    const weekendDays = weekData
        .filter((day) => !day.active)
        .map((day) => day.dayName);

    console.log('data', selectedTimeSlots);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Время работы`} />
            <ScrollView style={{ paddingTop: 15 }}>
                <View>
                    <Text style={styles.title}>Рабочие дни</Text>
                </View>
                <View style={styles.weekListContainer}>
                    {weekData &&
                        weekData.map(
                            (item, i) =>
                                item.active && (
                                    <WeeklCard
                                        key={i}
                                        title={item.active && item.dayName.substring(0, 3)}
                                    />
                                )
                        )}
                </View>
                <View>
                    <Text style={[styles.title, { marginTop: 15 }]}>Время работы</Text>
                    <>
                        <Text style={{ color: "white", paddingHorizontal: 15, width: 340 }}>
                            Выберите рабочее время в которое запись будет доступна для ваших
                            клиентов
                        </Text>
                        <View style={styles.timeListContainer}>
                            {timeList.map((time, index) => (
                                <TimesCard
                                    key={index}
                                    title={time}
                                    onSelect={() => toggleTimeSlotSelection(time)}
                                    isSelected={selectedTimeSlots.includes(time)}
                                    isInRange={rangeIndices.includes(time)}
                                    disabled={false}
                                />
                            ))}
                        </View>
                    </>
                </View>
                <View>
                    <Text style={[styles.title, { marginTop: 15 }]}>Выходные дни</Text>
                    <Text style={{ color: "white", paddingHorizontal: 15 }}>
                        {weekendDays.length === 0 ? "Без выходных" : weekendDays.join(", ")}
                    </Text>
                </View>
            </ScrollView>
            <View
                style={{
                    paddingHorizontal: 16,
                    height: "10%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Buttons
                    title="Продолжить"
                    onPress={() => {
                        setSelectedTimeSlot(selectedTimeSlots);
                        setMethod("put");
                        navigation.navigate("(free)/(work-grafic-edit)/workTimeDetail");
                    }}
                    isDisebled={!isDisabled}
                />
            </View>
        </SafeAreaView>
    );
};

export default TimeWorkEdit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#21212e",
    },
    title: {
        fontSize: 20,
        color: "white",
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    weekListContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 11,
        alignItems: "center",
    },
    timeListContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 10,
    },
});