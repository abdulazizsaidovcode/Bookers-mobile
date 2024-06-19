import React from "react";
import { StyleSheet, Text, View, ScrollView, Button, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function TabOneScreen() {
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
			<View style={styles.header}>
				<Text style={styles.title}>Главная</Text>
				<View style={styles.headerIcons}>
					<Ionicons name="notifications" size={24} color="white" style={{ marginRight: 16 }} />
					<Ionicons name="share-social-outline" size={24} color="white" />
				</View>
			</View>

			<View style={styles.scheduleContainer}>
				<Text style={styles.scheduleTitle}>Расписание на сегодня</Text>
				<Text style={styles.scheduleSubtitle}>Время работы: с 8:00 до 22:00</Text>
				<ScrollView horizontal>
					<View style={styles.schedule}>
						{scheduleData.map((item, index) => (
							<View key={index} style={[styles.timeBlock, { backgroundColor: item.color }]}>
								<Text style={styles.timeText}>{item.time}</Text>
							</View>
						))}
					</View>
				</ScrollView>
				<View style={styles.legend}>
					{legendData.map((item, index) => (
						<View key={index} style={styles.legendItem}>
							<View style={[styles.legendColor, { backgroundColor: item.color }]} />
							<Text style={styles.legendText}>{item.label}</Text>
						</View>
					))}
				</View>
			</View>

			<View style={styles.statsContainer}>
				<View style={styles.statsCard}>
					<Text style={styles.statsText}>Выполнено сеансов</Text>
					<ProgressChart
						data={[0.625]}
						width={screenWidth / 2.4}
						height={100}
						strokeWidth={16}
						radius={32}
						chartConfig={chartConfig}
						hideLegend={true}
					/>
					<Text style={styles.statsValue}>5/8</Text>
				</View>
				<View style={styles.statsCard}>
					<Text style={styles.statsText}>Доход сегодня</Text>
					<LineChart
						data={incomeData}
						width={screenWidth / 2.4}
						height={100}
						chartConfig={chartConfig}
						bezier
						style={styles.chartStyle}
					/>
					<Text style={styles.statsValue}>600 000 из 1 200 000</Text>
				</View>
				<View style={styles.statsCard}>
					<Text style={styles.statsText}>Отменённые сеансы</Text>
					<Text style={styles.statsValue}>0</Text>
				</View>
				<View style={styles.statsCard}>
					<Text style={styles.statsText}>Доход в этом месяце</Text>
					<Text style={styles.statsValue}>0</Text>
				</View>
			</View>

			<View style={styles.requestsContainer}>
				<Text style={styles.requestsTitle}>Запросы на бронь</Text>
				<Text style={styles.requestsSubtitle}>4 заявки</Text>
				{requestData.map((item, index) => (
					<View key={index} style={styles.requestCard}>
						<Image source={{ uri: item.image }} style={styles.avatar} />
						<View style={styles.requestDetails}>
							<Text style={styles.requestName}>{item.name}</Text>
							<Text style={styles.requestService}>{item.service}</Text>
							<Text style={styles.requestTime}>{item.time}</Text>
						</View>
						<View style={styles.requestButtons}>
							<Button title="Одобрить" onPress={() => {}} color="#E53935" />
							<Button title="Отклонить" onPress={() => {}} color="#808080" />
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	);
}

const scheduleData = [
	{ time: "10:00", color: "#33CC33" },
	{ time: "14:00", color: "#14b5ad" },
	{ time: "16:30", color: "#808080" },
	{ time: "18:30", color: "#E53935" },
	{ time: "20:30", color: "#2196F3" },
];

const legendData = [
	{ label: "Забронировано (3)", color: "#33CC33" },
	{ label: "Свободно (1)", color: "#808080" },
	{ label: "VIP клиенты (1)", color: "#E53935" },
	{ label: "Новые клиенты (2)", color: "#2196F3" },
];

const requestData = [
	{
		name: "Мелисара",
		service: "Стрижка, укладка, мирирование",
		time: "Сегодня: 8:00 - 09:30",
		image: "https://via.placeholder.com/40",
	},
	{
		name: "Алиса",
		service: "Стрижка, окрашивание",
		time: "Сегодня: 10:00 - 11:30",
		image: "https://via.placeholder.com/40",
	},
	// Add more request data as needed
];

const chartConfig = {
	backgroundGradientFrom: "#21212e",
	backgroundGradientTo: "#21212e",
	color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
	strokeWidth: 2, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false, // optional
};

const incomeData = {
	labels: ["8:00", "12:00", "16:00", "20:00"], // optional
	datasets: [
		{
			data: [0, 500000, 800000, 600000],
			color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
			strokeWidth: 2, // optional
		},
	],
	legend: ["Доход"], // optional
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#21212e",
	},
	scrollContainer: {
		alignItems: "center",
		paddingBottom: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		padding: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
	headerIcons: {
		flexDirection: "row",
	},
	scheduleContainer: {
		padding: 10,
		width: "100%",
	},
	scheduleTitle: {
		fontSize: 18,
		color: "white",
		marginBottom: 5,
	},
	scheduleSubtitle: {
		fontSize: 14,
		color: "white",
		marginBottom: 10,
	},
	schedule: {
		flexDirection: "row",
	},
	timeBlock: {
		padding: 10,
		borderRadius: 5,
		marginRight: 5,
	},
	timeText: {
		color: "white",
		fontWeight: "bold",
	},
	legend: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	legendItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	legendColor: {
		width: 20,
		height: 20,
		marginRight: 10,
	},
	legendText: {
		color: "white",
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		width: "100%",
		padding: 10,
	},
	statsCard: {
		backgroundColor: "#2b2b3d",
		borderRadius: 10,
		padding: 15,
		width: "48%",
		marginBottom: 10,
		alignItems: "center",
	},
	statsText: {
		color: "white",
		marginBottom: 5,
	},
	statsValue: {
		fontSize: 18,
		color: "white",
		fontWeight: "bold",
	},
	chartStyle: {
		marginVertical: 8,
	},
	requestsContainer: {
		padding: 10,
		width: "100%",
	},
	requestsTitle: {
		fontSize: 18,
		color: "white",
		marginBottom: 5,
	},
	requestsSubtitle: {
		fontSize: 14,
		color: "white",
		marginBottom: 10,
	},
	requestCard: {
		backgroundColor: "#2b2b3d",
		borderRadius: 10,
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 15,
	},
	requestDetails: {
		flex: 1,
	},
	requestName: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	requestService: {
		color: "white",
		fontSize: 14,
		marginBottom: 5,
	},
	requestTime: {
		color: "white",
		fontSize: 12,
	},
	requestButtons: {
		flexDirection: "row",
	},
});
