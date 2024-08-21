import { StatisticsProps } from "@/type/dashboard/dashboard";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

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

const Statistics: React.FC<StatisticsProps> = ({
    mainStatisticData,
    chartNumerator,
    chartDenominator,
    statisticNumerator,
    statisticDenominator,
}) => (
    <View style={styles.statsSection}>
        <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Выполнено сеансов</Text>
            <PieChart
                widthAndHeight={100}
                series={[chartNumerator | 1, chartDenominator | 1]}
                sliceColor={[COLORS.mainRed, COLORS.background]}
                coverRadius={0.6}
                coverFill={COLORS.cardBackground}
            />
            <Text style={styles.statsText}>
                {mainStatisticData.completedSessions}
            </Text>
        </View>
        <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Доход на сегодня</Text>
            <PieChart
                widthAndHeight={100}
                series={[1 | 1, 1 | 1]}
                sliceColor={[COLORS.mainRed, COLORS.background]}
                coverRadius={0.6}
                coverFill={COLORS.cardBackground}
            />
            <Text style={styles.statsText}>
                {statisticNumerator}/{statisticDenominator}
            </Text>
        </View>
    </View>
);

export default Statistics

const styles = StyleSheet.create({
    statsSection: {
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statsContainer: {
        width: screenWidth / 2.15,
        height: screenHeight / 4.7,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    statsTitle: {
        color: COLORS.background,
        fontSize: 16,
        marginBottom: 5,
    },
    statsText: {
        color: COLORS.mainRed,
        fontSize: 16,
        marginTop: 5,
    },
    incomeText: {
        color: COLORS.mainRed,
        fontSize: 24,
        fontWeight: "bold",
    },
    incomeTextSmall: {
        color: COLORS.background,
        fontSize: 14,
    },
})