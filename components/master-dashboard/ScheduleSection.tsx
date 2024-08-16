import { ScheduleSectionProps } from "@/type/dashboard/dashboard";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { Loading } from "../loading/loading";
import { renderTimeSlot } from "./renderedItems";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const COLORS = {
    background: "#21212e",
    white: "white",
    gray: "gray",
    booked: "#219653",
    free: "#828282",
    vip: "#9C0A35",
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
    dailyTimeData,
    todayGraficData,
    regularVisitCount,
    notVisitCount,
    workPending,
    vipCientsCount,
    newClientsCount,
}) => (
    <>
        <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Расписание на сегодня</Text>
            <Text style={styles.sectionSubtitle}>
                {todayGraficData.from && todayGraficData.end
                    ? `Время работы: с ${todayGraficData.from.slice(
                        0,
                        5
                    )} до ${todayGraficData.end.slice(0, 5)}`
                    : "Время работы: ваша графическая работа не настроена"}
            </Text>
        </View>
        {workPending ? <Loading /> : dailyTimeData && (
            <FlatList
                data={dailyTimeData}
                renderItem={renderTimeSlot}
                keyExtractor={(item) => item.time}
                horizontal
                style={{ paddingVertical: 10 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scheduleContainer}
            />
        )}
        <View style={styles.statusContainer}>
            <StatusIndicator
                color={COLORS.booked}
                text={`Забронировано (${regularVisitCount || 0})`}
            />
            <StatusIndicator
                color={COLORS.free}
                text={`Свободно (${notVisitCount || 0})`}
            />
            <StatusIndicator
                color={COLORS.vip}
                text={`VIP клиенты (${vipCientsCount || 0})`}
            />
            <StatusIndicator
                color={COLORS.new}
                text={`Новые клиенты (${newClientsCount || 0})`}
            />
        </View>
    </>
);

export default ScheduleSection;

const styles = StyleSheet.create({
    daylyStatus: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 7,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 5,
    },
    statusColor: {
        width: screenWidth / 50,
        height: screenHeight / 100,
        borderRadius: 50,
    },
    statusText: {
        fontSize: screenWidth / 50,
        color: COLORS.white,
        marginLeft: 4,
    },
    scheduleSection: {
        padding: 10,
    },
    sectionTitle: {
        color: COLORS.white,
        fontSize: 18,
    },
    sectionSubtitle: {
        color: COLORS.gray,
    },
    scheduleContainer: {
        paddingHorizontal: 10,
    },
    statusContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
})