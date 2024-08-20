import { Dimensions, StyleSheet, Text, View } from "react-native";

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

const CardsSection: React.FC<{ mainStatisticData: any, hallCount: number, orderCount: number }> = ({
    mainStatisticData,
    hallCount,
    orderCount
}) => (
    <View style={styles.cardsSection}>
        <View style={styles.card}>
            <Text style={{ color: '#000', textAlign: 'center' }}>Запросы на бронирования</Text>
            <Text style={{ color: COLORS.mainRed, fontSize: 24, fontWeight: "bold" }}>
                {orderCount | 0}
            </Text>
        </View>
        <View style={styles.card}>
            <Text style={{ color: '#000', textAlign: 'center' }}>В зале ожидания</Text>
            <Text style={{ color: COLORS.mainRed, fontSize: 24, fontWeight: "bold" }}>
                {hallCount | 0}
            </Text>
        </View>
        <View style={styles.card}>
            <Text style={{ color: '#000', textAlign: 'center' }}>Отменённые записи</Text>
            <Text style={{ color: COLORS.mainRed, fontSize: 24, fontWeight: "bold" }}>
                {mainStatisticData.rejectedOrder}
            </Text>
        </View>
        <View style={styles.card}>
            <Text style={{ color: '#000', textAlign: 'center' }}>Мой доход</Text>
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Text style={{ fontSize: 10 }}>за месяц</Text>
                    <Text style={{ color: COLORS.mainRed, fontSize: 24, fontWeight: "bold" }}>{mainStatisticData.incomeThisMonth}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: -10 }}>
                    <Text style={{ fontSize: 10 }}>за период</Text>
                    <Text style={{ color: COLORS.mainRed, fontSize: 24, fontWeight: "bold" }}>0</Text>
                </View>
            </View>
        </View>
    </View>
);

export default CardsSection

const styles = StyleSheet.create({
    cardsSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        flexWrap: 'wrap',
        rowGap: 9
    },
    card: {
        width: screenWidth / 2.15,
        height: screenHeight / 10,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    incomeCard: {
        backgroundColor: COLORS.mainRed,
    },
    cardTitle: {
        color: COLORS.background,
        fontSize: 16,
        marginBottom: 5,
    },
    cardValue: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: "bold",
    },
})