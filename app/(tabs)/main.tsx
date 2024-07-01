import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import PieChart from 'react-native-pie-chart';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { RootStackParamList } from "@/type/root";
import { fetchDaylyOrderTimes, fetchMainStatistic } from "@/helpers/api-function/dashboard/dashboard";
import useDashboardStore from "@/helpers/state_managment/dashboard/dashboard";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(standart)/client/standard-main'>;

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const timeSlots = [
	{ time: '8:00', status: 'booked' },
	{ time: '14:00', status: 'new' },
	{ time: '16:30', status: 'vip' },
	{ time: '18:30', status: 'booked' },
	{ time: '20:30', status: 'free' },
	{ time: '22:00', status: 'booked' }
];

const bookingRequests = [
	{ id: '1', image: 'https://example.com/image1.jpg', name: 'John Doe', service: 'Haircut', time: '14:00' },
	{ id: '2', image: 'https://example.com/image2.jpg', name: 'Jane Smith', service: 'Manicure', time: '16:30' },
	// Add more booking requests as needed
];

export default function TabOneScreen() {
	const navigation = useNavigation<SettingsScreenNavigationProp>();
	const { mainStatisticData, setData, setMainStatisticData } = useDashboardStore()

	useEffect(() => {
		fetchDaylyOrderTimes(setData)
	}, [])
	useEffect(() => {
		fetchMainStatistic(setMainStatisticData);
	}, [])
	let fraction = mainStatisticData.completedSessions;
	let separatorIndex = fraction.indexOf('/');
	let numerator = fraction.slice(0, separatorIndex);
	let denominator = fraction.slice(separatorIndex + 1);

	const renderTimeSlot = ({ item }) => (
		<View style={[styles.timeSlot,
		item.status === 'booked' ? styles.bookedSlot :
			item.status === 'free' ? styles.freeSlot :
				item.status === 'vip' ? styles.vipSlot :
					styles.newSlot]}>
			<Text style={{ color: 'white' }}>{item.time}</Text>
		</View>
	);

	const renderBookingRequest = ({ item }) => (
		<View style={styles.bookingCard}>
			<View style={styles.cardHeader}>
				<Text style={styles.newRequestText}> <FontAwesome name="star" size={12} color="#217355" />Новый Запрос</Text>
			</View>
			<View style={{ flexDirection: 'row', gap: 5 }}>
				<View>
					<Image source={require('../../assets/avatar.png')} style={styles.profileImage} />
				</View>
				<View>
					<Text style={styles.userName}>{item.name}</Text>
					<Text style={styles.serviceText}>{item.service}</Text>
				</View>
			</View>
			<Text style={styles.timeText}>{item.time}</Text>
			<View style={styles.actionButtons}>
				<TouchableOpacity style={styles.approveButton}>
					<Text style={styles.buttonText}>Одобрить</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.rejectButton}>
					<Text style={{ color: '#9C0A35', fontWeight: 'bold' }}>Отклонить</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

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
					data={timeSlots}
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
						<Text style={styles.statusText}>Забронировано (3)</Text>
					</View>
					<View style={styles.daylyStatus}>
						<View style={[styles.statusColor, { backgroundColor: '#828282' }]}></View>
						<Text style={styles.statusText}>Свободно (1)</Text>
					</View>
					<View style={styles.daylyStatus}>
						<View style={[styles.statusColor, { backgroundColor: '#9C0A35' }]}></View>
						<Text style={styles.statusText}>VIP клиенты (1)</Text>
					</View>
					<View style={styles.daylyStatus}>
						<View style={[styles.statusColor, { backgroundColor: '#00A1D3' }]}></View>
						<Text style={styles.statusText}>Новые клиенты (2)</Text>
					</View>
				</View>
				<View style={styles.statsSection}>
					<View style={styles.statsContainer}>
						<Text style={styles.statsTitle}>Выполнено сеансов</Text>
						<PieChart
							widthAndHeight={100}
							series={[3, 4]}
							sliceColor={['#9C0A35', '#21212E']}
							coverRadius={0.6}
							coverFill={'#B9B9C9'}
						/>
						<Text style={styles.statsText}>{mainStatisticData.completedSessions} Сеансы</Text>
					</View>
					<View style={styles.statsContainer}>
						<Text style={styles.statsTitle}>Доход сегодня</Text>
						<Text style={styles.incomeText}>600 000</Text>
						<Text style={styles.incomeTextSmall}>из</Text>
						<Text style={styles.incomeText}>1 200 000</Text>
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
				<View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
						<Text style={{ color: 'white', fontSize: 20 }}>Запросы на бронь</Text>
						<View style={styles.headerRight}>
							<Text style={styles.requestsCount}>4 заявки</Text>
						</View>
					</View>
					<FlatList
						data={bookingRequests}
						renderItem={renderBookingRequest}
						keyExtractor={item => item.id}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.bookingList}
					/>
				</View>
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
		color: "white",
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
		color: "#B9B9C9",
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
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	rejectButton: {
		backgroundColor: "transparent",
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: '#9C0A35'
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
	},
});
