import React from 'react';
import { ScheduleSectionProps } from "@/type/dashboard/dashboard";
import { Dimensions, FlatList, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Loading } from "../loading/loading";
import { renderTimeSlot } from "./renderedItems";
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const COLORS = {
    background: "#21212e",
    white: "white",
    gray: "gray",
    booked: "#219653",
    free: "#828282",
    new: "#00A1D3",
    cardBackground: "#B9B9C9",
    mainRed: "#9C0A35",
};

const StatusIndicator: React.FC<{ color: string; text: string }> = ({
    color,
    text,
}) => (
    <View style={styles.daylyStatus}>
        <View style={[styles.statusColor, { backgroundColor: color }]}></View>
        <Text style={styles.statusText}>{text}</Text>
    </View>
);

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
    orderTimeSlots,
    todayGraficData,
    workPending,
    isOpen,
    toggleIsOpen
}) => {

    const handleToggleIsOpen = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        toggleIsOpen();
    };

    return (
        <>
            <TouchableOpacity onPress={handleToggleIsOpen} activeOpacity={0.8} style={styles.scheduleSection}>
                <View>
                    <Text style={styles.sectionTitle}>Расписание на сегодня</Text>
                    <Text style={styles.sectionSubtitle}>
                        {todayGraficData.from && todayGraficData.end ? `Время работы: с ${todayGraficData.from.slice(0, 5)} до ${todayGraficData.end.slice(0, 5)}` : "Время работы: необходимо настроить"}
                    </Text>
                </View>
                <View>
                    <MaterialIcons name={isOpen ? "keyboard-arrow-down" : "keyboard-arrow-right"} size={30} color="white" />
                </View>
            </TouchableOpacity>

            <View style={styles.statusContainer}>
                <StatusIndicator
                    color={COLORS.mainRed}
                    text={`Забронировано (${orderTimeSlots.length | 0})`}
                />
                <StatusIndicator
                    color={COLORS.free}
                    text={`Свободные слоты`}
                />
            </View>
            {isOpen ? workPending ? <Loading /> : orderTimeSlots && (
                <View style={{ marginTop: 5}}>
                    <FlatList
                        data={orderTimeSlots}
                        renderItem={renderTimeSlot}
                        keyExtractor={(item) => item.time}
                        style={{ paddingVertical: 5 }}
                        numColumns={2}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scheduleContainer}
                    />
                </View>
            ) : null}
        </>
    );
};

export default ScheduleSection;

const styles = StyleSheet.create({
    daylyStatus: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 5,
        paddingVertical: 7,
        justifyContent: 'center',
        width: screenWidth / 2.15,
    },
    statusColor: {
        width: screenWidth / 50,
        height: screenHeight / 100,
        borderRadius: 50,
    },
    statusText: {
        fontSize: screenWidth / 35,
        color: '#000',
        marginLeft: 4,
    },
    scheduleSection: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionTitle: {
        color: COLORS.white,
        fontSize: 18,
    },
    sectionSubtitle: {
        color: COLORS.gray,
        width: screenWidth / 1.3
    },
    scheduleContainer: {
        paddingHorizontal: 10,
    },
    statusContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
});