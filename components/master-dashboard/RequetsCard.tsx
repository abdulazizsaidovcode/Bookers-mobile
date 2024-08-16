import { BookingRequestsHallProps, BookingRequestsProps } from "@/type/dashboard/dashboard";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { renderBookingRequest } from "./renderedItems";

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

const BookingRequests: React.FC<BookingRequestsProps> = ({
    waitingData,
    toggleConfirmModal,
    toggleRejectedModal,
    isConfirmModal,
    isRejectedModal,
    setWaitingData,
    status,
}) =>
    waitingData && waitingData.length > 0 ? (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                }}
            >
                <Text style={{ color: COLORS.white, fontSize: 20 }}>
                    Запросы на бронь
                </Text>
                <View style={styles.headerRight}>
                    <Text style={styles.requestsCount}>
                        {waitingData && waitingData.length} заявки
                    </Text>
                </View>
            </View>
            <FlatList
                data={waitingData}
                renderItem={(props: any) =>
                    renderBookingRequest({
                        ...props,
                        toggleConfirmModal,
                        toggleRejectedModal,
                        isRejectedModal,
                        isConfirmModal,
                        setWaitingData,
                        status,
                    })
                }
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bookingList}
            />
        </View>
    ) : (
        ""
    );

const BookingRequestsHall: React.FC<BookingRequestsHallProps> = ({
    hallData,
    toggleConfirmModal,
    toggleRejectedModal,
    isConfirmModal,
    isRejectedModal,
    setHallData,
    status,
}) =>
    hallData && hallData.length > 0 ? (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                }}
            >
                <Text style={{ color: COLORS.white, fontSize: 20 }}>
                    Запросы окошка
                </Text>
                <View style={styles.headerRight}>
                    <Text style={styles.requestsCount}>
                        {hallData && hallData.length} заявки
                    </Text>
                </View>
            </View>
            <FlatList
                data={hallData}
                renderItem={(props: any) =>
                    renderBookingRequest({
                        ...props,
                        toggleConfirmModal,
                        toggleRejectedModal,
                        isConfirmModal,
                        isRejectedModal,
                        setHallData,
                        status,
                    })
                }
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bookingList}
            />
        </View>
    ) : (
        ""
    );

const styles = StyleSheet.create({
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    requestsCount: {
        color: COLORS.white,
        backgroundColor: COLORS.mainRed,
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    serviceText: {
        fontSize: 14,
        marginTop: 5,
    },
    bookingList: {
        paddingLeft: 20,
        paddingVertical: 10,
    },
})

export { BookingRequests, BookingRequestsHall }