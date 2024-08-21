import { getFile } from "@/helpers/api";
import { RenderBookingRequestProps } from "@/type/dashboard/dashboard";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const renderTimeSlot = ({ item }: any) => (
    <View
        style={[
            styles.timeSlot,
            item.type === "STOPPED_VISIT"
                ? styles.freeSlot
                : item.type === "REGULAR_VISIT"
                    ? styles.vipSlot
                    : styles.newSlot,
        ]}
    >
        <Text style={{ color: COLORS.white }}>
            {item.time === null ? "" : item.time.slice(0, 5) ?? ""}
        </Text>
    </View>
);

const renderBookingRequest: React.FC<RenderBookingRequestProps> = ({
    item,
    toggleConfirmModal,
    toggleRejectedModal,
    status = false,
}) => {
    return (
        <View style={styles.bookingCard}>
            {status && (
                <View style={styles.cardHeader}>
                    <Text style={styles.newRequestText}>
                        <FontAwesome name="star" size={10} color="#217355" /> Новый Запрос
                    </Text>
                </View>
            )}
            <View style={{ flexDirection: "row", gap: 10, paddingVertical: 10 }}>
                <View>
                    <Image
                        source={
                            item.clientAttachmentId
                                ? { uri: getFile + item.clientAttachmentId }
                                : require("../../assets/avatar.png")
                        }
                        style={styles.profileImage}
                    />
                </View>
                <View>
                    <Text style={styles.userName}>{item.fullName}</Text>
                    <View
                        style={{
                            backgroundColor:
                                item.clientStatus[0] === "REGULAR_VISIT"
                                    ? "#217355"
                                    : "#00A1D3",
                            padding: 5,
                            borderRadius: 5,
                            width: 120,
                        }}
                    >
                        <Text style={{ fontSize: 10, color: "#fff", textAlign: "center" }}>
                            {item.clientStatus[0] === "REGULAR_VISIT"
                                ? "Постоянный клиент"
                                : "Новый клиент"}
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: "#4F4F4F",
                    // width: 'auto',
                    alignSelf: "flex-start",
                    padding: 5,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "#4F4F4F", fontSize: 12 }}>
                    {item.serviceName}
                </Text>
            </View>
            <Text style={styles.timeText}>
                {moment(item.orderDate).format("dddd")}:{" "}
                {item.startTime ? item.startTime.slice(0, 5) : item.startTime} -{" "}
                {item.finishTime ? item.finishTime.slice(0, 5) : item.finishTime}
            </Text>
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.approveButton}
                    onPress={() => toggleConfirmModal(item.id)}
                >
                    <Text style={styles.buttonText}>Одобрить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => toggleRejectedModal(item.id)}
                >
                    <Text style={{ color: COLORS.mainRed, fontWeight: "bold" }}>
                        Отклонить
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    timeSlot: {
        width: screenWidth / 4.6,
        paddingVertical: 10,
        // marginHorizontal: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    bookedSlot: {
        backgroundColor: COLORS.booked,
    },
    freeSlot: {
        backgroundColor: COLORS.free,
    },
    vipSlot: {
        backgroundColor: COLORS.mainRed,
    },
    newSlot: {
        backgroundColor: COLORS.new,
    },
    bookingList: {
        paddingLeft: 20,
        paddingVertical: 10,
    },
    bookingCard: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        width: screenWidth * 0.8,
    },
    cardHeader: {
        width: "45%",
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#217355",
    },
    newRequestText: {
        color: "#217355",
        fontSize: 10,
        fontWeight: "bold",
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    approveButton: {
        backgroundColor: "#9C0A35",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        flex: 1,
        marginRight: 5,
    },
    rejectButton: {
        backgroundColor: "transparent",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        flex: 1,
        borderWidth: 1,
        borderColor: "#9C0A35",
        marginLeft: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: "bold",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    timeText: {
        fontSize: 14,
        marginTop: 5,
        fontFamily: "bold",
    },
})

export { renderBookingRequest, renderTimeSlot }