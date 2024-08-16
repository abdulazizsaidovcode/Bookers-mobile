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

const CardsSection: React.FC<{ mainStatisticData: any }> = ({
    mainStatisticData,
}) => (
    <View style={styles.cardsSection}>
        <View style={styles.card}>
            <Text style={{ color: '#000' }}>Отменённые сеансы</Text>
            <Text style={{ color: COLORS.mainRed, fontSize: 24, fontWeight: "bold" }}>
                {mainStatisticData.rejectedOrder}
            </Text>
        </View>
        <View style={[styles.card, styles.incomeCard]}>
            <Text style={{ color: '#fff' }}>Доход в этом месяце</Text>
            <Text style={styles.cardValue}>{mainStatisticData.incomeThisMonth}</Text>
        </View>
    </View>
);

export default CardsSection

const styles = StyleSheet.create({
    cardsSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
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