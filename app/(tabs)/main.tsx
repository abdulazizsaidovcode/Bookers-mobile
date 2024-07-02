import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import PieChart from 'react-native-pie-chart';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RootStackParamList } from "@/type/root";
import { editOrderStatus, fetchDaylyOrderTimes, fetchMainStatistic, fetchWaitingOrders } from "@/helpers/api-function/dashboard/dashboard";
import useDashboardStore from "@/helpers/state_managment/dashboard/dashboard";
import { DashboardDailyTimeOrders, DashboardWaitingOrder } from "@/type/dashboard/dashboard";
import { getFile } from "@/helpers/api";
import moment from "moment";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(standart)/client/standard-main'>;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function TabOneScreen() {
	const navigation = useNavigation<SettingsScreenNavigationProp>();
	const { mainStatisticData, waitingData, dailyTimeData, setDailyTimeData, setMainStatisticData, setWaitingData } = useDashboardStore()

	useEffect(() => {
		fetchDaylyOrderTimes(setDailyTimeData);
	}, []);

	useEffect(() => {
		fetchMainStatistic(setMainStatisticData);
	}, []);

	useEffect(() => {
		fetchWaitingOrders(setWaitingData);
	}, []);

	let chartFraction = mainStatisticData.completedSessions;
	let chartSeparatorIndex = chartFraction.indexOf('/');

	let chartNumerator = chartFraction.slice(0, chartSeparatorIndex);
	let chartDenominator = chartFraction.slice(chartSeparatorIndex + 1);

	let statisticFraction = mainStatisticData.incomeToday;
	let statisticSeparatorIndex = statisticFraction.indexOf('/');

	let statisticNumerator = statisticFraction.slice(0, statisticSeparatorIndex);
	let statisticDenominator = statisticFraction.slice(statisticSeparatorIndex + 1);
	const regularVisitCount = dailyTimeData.filter(item => item.type === 'REGULAR_VISIT').length;
	const notVisitCount = dailyTimeData.filter(item => item.type === 'NOT_VISIT').length;
	const vipCientsCount = dailyTimeData.filter(item => item.type === 'VIP').length;
	const newClientsCount = dailyTimeData.filter(item => item.type === 'NEW').length;


	const renderTimeSlot: React.FC<{ item: DashboardDailyTimeOrders }> = ({ item }) => (
		<View style={[styles.timeSlot,
		item.type === 'REGULAR_VISIT' ? styles.bookedSlot :
			item.type === 'NOT_VISIT' ? styles.freeSlot :
				item.type === 'VIP' ? styles.vipSlot :
					styles.newSlot]}>
			<Text style={{ color: 'white' }}>{item.time.slice(0, 5)}</Text>
		</View>
	);

	// const renderBookingRequest: React.FC<{ item: DashboardWaitingOrder }> = ({ item }) => (
	// 	<View style={styles.bookingCard}>
	// 		<View style={styles.cardHeader}>
	// 			<Text style={styles.newRequestText}> <FontAwesome name="star" size={12} color="#217355" />Новый Запрос</Text>
	// 		</View>
	// 		<View style={{ flexDirection: 'row', gap: 5 }}>
	// 			<View>
	// 				<Image source={item.clientAttachmentId ? getFile + item.clientAttachmentId : require('../../assets/avatar.png')} style={styles.profileImage} />
	// 			</View>
	// 			<View>
	// 				<Text style={styles.userName}>{item.clientName}</Text>
	// 				<Text style={styles.serviceText}>{item.categoryName}</Text>
	// 			</View>
	// 		</View>
	// 		<View style={{ borderWidth: 1, borderColor: '#4F4F4F', width: 150, padding: 3, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
	// 			<Text style={{ color: '#4F4F4F', fontSize: 12 }}>{item.categoryName}</Text>
	// 		</View>
	// 		<Text style={styles.timeText}>{item.orderDate}</Text>
	// 		<View style={styles.actionButtons}>
	// 			<TouchableOpacity style={styles.approveButton}>
	// 				<Text style={styles.buttonText} onPress={() => editOrderStatus(setWaitingData, item.orderId, 'CONFIRMED')}>Одобрить</Text>
	// 			</TouchableOpacity>
	// 			<TouchableOpacity style={styles.rejectButton}>
	// 				<Text style={{ color: '#9C0A35', fontWeight: 'bold' }} onPress={() => editOrderStatus(setWaitingData, item.orderId, 'REJECTED')}>Отклонить</Text>
	// 			</TouchableOpacity>
	// 		</View>
	// 	</View>
	// );

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.header}>
					<Text style={styles.title}>Главная</Text>
					<View style={styles.headerIcons}>
						<Ionicons name="notifications" size={24} color="white" style={{ marginRight: 16 }} />
						<Ionicons name="share-social-outline" size={24} color="white" />
					</View>
				</View>
				<View style={styles.scheduleSection}>
					<Text style={styles.sectionTitle}>Расписание на сегодня</Text>
					<Text style={styles.sectionSubtitle}>Время работы: с 8:00 до 22:00</Text>
				</View>
				<FlatList
					data={dailyTimeData}
					renderItem={renderTimeSlot}
					keyExtractor={item => item.time}
					horizontal
					style={{ paddingVertical: 10 }}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.scheduleContainer}
				/>
				<View style={styles.statusContainer}>
					<View style={styles.daylyStatus}>
						<View style={[styles.statusColor, { backgroundColor: '#219653' }]}></View>
						<Text style={styles.statusText}>Забронировано ({regularVisitCount | 0})</Text>
					</View>
					<View style={styles.daylyStatus}>
						<View style={[styles.statusColor, { backgroundColor: '#828282' }]}></View>
						<Text style={styles.statusText}>Свободно ({notVisitCount | 0})</Text>
					</View>
					<View style={styles.daylyStatus}>
						<View style={[styles.statusColor, { backgroundColor: '#9C0A35' }]}></View>
						<Text style={styles.statusText}>VIP клиенты ({vipCientsCount | 0})</Text>
					</View>
					<View style={styles.daylyStatus}>
						<View style={[styles.statusColor, { backgroundColor: '#00A1D3' }]}></View>
						<Text style={styles.statusText}>Новые клиенты ({newClientsCount | 0})</Text>
					</View>
				</View>
				<View style={styles.statsSection}>
					<View style={styles.statsContainer}>
						<Text style={styles.statsTitle}>Выполнено сеансов</Text>
						<PieChart
							widthAndHeight={100}
							series={[4, 1]}
							sliceColor={['#9C0A35', '#21212E']}
							coverRadius={0.6}
							coverFill={'#B9B9C9'}
						/>
						<Text style={styles.statsText}>{mainStatisticData.completedSessions} Сеансы</Text>
					</View>
					<View style={styles.statsContainer}>
						<Text style={styles.statsTitle}>Доход сегодня</Text>
						<Text style={styles.incomeText}>{statisticNumerator ? statisticNumerator : 0}</Text>
						<Text style={styles.incomeTextSmall}>из</Text>
						<Text style={styles.incomeText}>{statisticDenominator ? statisticDenominator : 0}</Text>
					</View>
				</View>
				<View style={styles.cardsSection}>
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Отменённые сеансы</Text>
						<Text style={{ color: '#9C0A35', fontSize: 24, fontWeight: 'bold', }}>{mainStatisticData.rejectedOrder}</Text>
					</View>
					<View style={[styles.card, styles.incomeCard]}>
						<Text style={{ color: 'white' }}>Доход в этом месяце</Text>
						<Text style={styles.cardValue}>{mainStatisticData.incomeThisMonth}</Text>
					</View>
				</View>
				{waitingData.length === 0 ? '' :
					<View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
							<Text style={{ color: 'white', fontSize: 20 }}>Запросы на бронь</Text>
							<View style={styles.headerRight}>
								<Text style={styles.requestsCount}>{waitingData.length} заявки</Text>
							</View>
						</View>
						<FlatList
							data={waitingData}
							renderItem={Requ}
							keyExtractor={item => item.orderId}
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={styles.bookingList}
						/>
					</View>
				}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#21212e",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		padding: 20,
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		color: "white",
	},
	headerIcons: {
		flexDirection: "row",
	},
	scheduleSection: {
		padding: 10,
	},
	sectionTitle: {
		color: 'white',
		fontSize: 18,
	},
	sectionSubtitle: {
		color: 'gray',
	},
	scheduleContainer: {
		paddingHorizontal: 10,
	},
	timeSlot: {
		width: screenWidth / 4.4,
		paddingVertical: 10,
		marginHorizontal: 5,
		borderRadius: 5,
		alignItems: 'center',
	},
	bookedSlot: {
		backgroundColor: '#219653',
	},
	freeSlot: {
		backgroundColor: '#828282',
	},
	vipSlot: {
		backgroundColor: '#9C0A35',
	},
	newSlot: {
		backgroundColor: '#00A1D3',
	},
	statusContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	daylyStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 5,
		paddingVertical: 7,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
	},
	statusColor: {
		width: 10,
		height: 10,
		borderRadius: 50,
	},
	statusText: {
		fontSize: 8,
		color: 'white',
		marginLeft: 4,
	},
	cardsSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
	card: {
		width: screenWidth / 2.15,
		height: screenHeight / 10,
		backgroundColor: '#B9B9C9',
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	incomeCard: {
		backgroundColor: '#9C0A35',
	},
	cardTitle: {
		color: '#21212e',
		fontSize: 16,
		marginBottom: 5,
	},
	cardValue: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
	},
	statsSection: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	statsContainer: {
		width: screenWidth / 2.15,
		height: screenHeight / 4.7,
		backgroundColor: '#B9B9C9',
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	statsTitle: {
		color: '#21212e',
		fontSize: 16,
		marginBottom: 5,
	},
	statsText: {
		color: '#9C0A35',
		fontSize: 16,
		marginTop: 5,
	},
	incomeText: {
		color: '#9C0A35',
		fontSize: 24,
		fontWeight: 'bold',
	},
	incomeTextSmall: {
		color: '#21212e',
		fontSize: 14,
	},
	headerRight: {
		flexDirection: "row",
		alignItems: "center",
	},
	requestsCount: {
		color: "white",
		backgroundColor: "#9C0A35",
		borderRadius: 5,
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	bookingList: {
		paddingLeft: 20,
		paddingVertical: 10,
	},
	bookingCard: {
		backgroundColor: "#B9B9C9",
		borderRadius: 10,
		padding: 10,
		marginRight: 10,
		width: screenWidth * 0.8,
	},
	cardHeader: {
		width: '45%',
		paddingHorizontal: 10,
		paddingVertical: 5,
		flexDirection: "row",
		alignItems: 'center',
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#217355'
	},
	newRequestText: {
		color: "#217355",
		fontSize: 12,
		fontWeight: "bold",
	},
	profileImage: {
		width: 50,
		height: 50,
		borderRadius: 50,
		marginTop: 10,
	},
	userName: {
		color: "",
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 10,
	},
	serviceText: {
		color: "#B9B9C9",
		fontSize: 14,
		marginTop: 5,
	},
	timeText: {
		color: "#000",
		fontSize: 14,
		marginTop: 5,
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	approveButton: {
		backgroundColor: "#9C0A35",
		borderRadius: 7,
		paddingVertical: 15,
		paddingHorizontal: 30,
	},
	rejectButton: {
		backgroundColor: "transparent",
		borderRadius: 7,
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderWidth: 1,
		borderColor: '#9C0A35'
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});