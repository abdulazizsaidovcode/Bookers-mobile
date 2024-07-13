import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, Dimensions, RefreshControl, Share, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import PieChart from 'react-native-pie-chart';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	editOrderStatus,
	fetchDaylyOrderTimes,
	fetchHallingOrders,
	fetchMainStatistic,
	fetchTodayWorkGrafic,
	fetchWaitingOrders
} from "@/helpers/api-function/dashboard/dashboard";
import useDashboardStore from "@/helpers/state_managment/dashboard/dashboard";
import {
	BookingRequestsHallProps,
	BookingRequestsProps,
	DashboardDailyTimeOrders,
	RenderBookingRequestProps,
	ScheduleSectionProps,
	StatisticsProps,
	StatusContainerProps
} from "@/type/dashboard/dashboard";
import { getFile } from "@/helpers/api";
import CenteredModal from "@/components/(modals)/modal-centered";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import Buttons from "@/components/(buttons)/button";
import { useNavigation } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { getData } from "@/helpers/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import { getNumbers } from "@/helpers/api-function/numberSittings/numbersetting";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { handleRefresh } from "@/constants/refresh";

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

export const getConfig = async () => {
	try {
		const token = await AsyncStorage.getItem('registerToken');
		if (token) {
			return {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};
		} else {
			console.log('Token not found');
			return {};
		}
	} catch (error) {
		console.log(error);
		return {};
	}
};
export const getConfigImg = async () => {
	try {
		const token = await AsyncStorage.getItem('registerToken');
		if (token) {
			return {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`
				}
			};
		} else {
			console.log('Token not found');
			return {};
		}
	} catch (error) {
		console.log(error);
		return {};
	}
};

const TabOneScreen: React.FC = () => {
	const { number, setNumber } = numberSettingStore();
	const { getMee, setGetMee } = useGetMeeStore()
	const navigation = useNavigation<any>();
	const [hasAllNumbers, setHasAllNumbers] = useState<boolean>(false);
	const {
		mainStatisticData,
		waitingData,
		dailyTimeData,
		isConfirmModal,
		hallData,
		isRejectedModal,
		todayGraficData,
		setTodayGraficData,
		setRejectedIsModal,
		setHallData,
		setConfirmIsModal,
		setDailyTimeData,
		setMainStatisticData,
		setWaitingData
	} = useDashboardStore()
	const { refreshing, setRefreshing } = clientStore()

	useEffect(() => {
		getNumbers(setNumber)
	}, []);

	useEffect(() => {
		if (number.length > 1) {
			const res = removeDuplicatesAndSort(number)
			const result = containsAllNumbers(res)
			setHasAllNumbers(result)
		}
	}, [number]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await SecureStore.setItemAsync('isCreate', `${hasAllNumbers}`);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [hasAllNumbers]);

	useEffect(() => {
		fetchDaylyOrderTimes(setDailyTimeData, getMee.id);
		fetchMainStatistic(setMainStatisticData);
		fetchWaitingOrders(setWaitingData);
		fetchHallingOrders(setHallData);
		getUser(setGetMee);
		fetchTodayWorkGrafic(setTodayGraficData, getMee.id);
		getData()
	}, []);

	const onRefresh = useCallback(() => {
		handleRefresh(setRefreshing);
	}, [setRefreshing]);

	const removeDuplicatesAndSort = (array: number[]): number[] => {
		const seen = new Map<number, boolean>();
		const result: number[] = [];

		for (const value of array) {
			if (!seen.has(value)) {
				seen.set(value, true);
				result.push(value);
			}
		}

		result.sort((a, b) => a - b);
		return result;
	};

	const containsAllNumbers = (array: number[]): boolean => {
		const requiredNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
		return requiredNumbers.every(num => array.includes(num));
	};

	const toggleConfirmModal = () => setConfirmIsModal(!isConfirmModal)
	const toggleRejectModal = () => setRejectedIsModal(!isRejectedModal)

	const chartFraction = mainStatisticData.completedSessions;
	const [chartNumerator, chartDenominator] = chartFraction.split('/');
	const statisticFraction = mainStatisticData.incomeToday;
	const [statisticNumerator, statisticDenominator] = statisticFraction.split('/');
	const regularVisitCount = dailyTimeData.filter(item => item.type === 'REGULAR_VISIT').length;
	const notVisitCount = dailyTimeData.filter(item => item.type === 'NOT_VISIT').length;
	const vipCientsCount = dailyTimeData.filter(item => item.type === 'VIP').length;
	const newClientsCount = dailyTimeData.filter(item => item.type === 'NEW').length;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<Header />
				<ScheduleSection
					todayGraficData={todayGraficData}
					dailyTimeData={dailyTimeData}
					regularVisitCount={regularVisitCount}
					notVisitCount={notVisitCount}
					vipCientsCount={vipCientsCount}
					newClientsCount={newClientsCount}
				/>
				<Statistics
					mainStatisticData={mainStatisticData}
					chartNumerator={+chartNumerator}
					chartDenominator={+chartDenominator}
					statisticNumerator={statisticNumerator}
					statisticDenominator={statisticDenominator}
				/>
				<CardsSection mainStatisticData={mainStatisticData} />
				<BookingRequests
					setWaitingData={setWaitingData}
					waitingData={waitingData}
					toggleConfirmModal={toggleConfirmModal}
					toggleRejectedModal={toggleRejectModal}
					isRejectedModal={isRejectedModal}
					isConfirmModal={isConfirmModal}
				/>
				<BookingRequestsHall
					setHallData={setHallData}
					hallData={hallData}
					toggleConfirmModal={toggleConfirmModal}
					toggleRejectedModal={toggleRejectModal}
					isRejectedModal={isRejectedModal}
					isConfirmModal={isConfirmModal}
				/>
				{!hasAllNumbers && (
					<View style={{ margin: 10 }}>
						<Buttons
							title="настройку"
							onPress={() => navigation.navigate('(profile)/(tariff)/tariff')}
						/>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const Header: React.FC = () => {
	const navigation = useNavigation<any>();
	const onShare = async () => {
		try {
			const result = await Share.share({
				message:
					'React Native | A framework for building native apps using React',
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error: any) {
			Alert.alert(error.message);
		}
	};
	return (
		<View style={styles.header}>
			<Text style={styles.title}>Главная</Text>
			<View style={styles.headerIcons}>
				<Ionicons name="notifications" size={24} color={COLORS.white} style={{ marginRight: 16 }} onPress={() => navigation.navigate('(tabs)/chat')}/>
				<Ionicons name="share-social-outline" size={24} color={COLORS.white} onPress={onShare} />
			</View>
		</View>
	);
};

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
	dailyTimeData,
	todayGraficData,
	regularVisitCount,
	notVisitCount,
	vipCientsCount,
	newClientsCount
}) => (
	<>
		<View style={styles.scheduleSection}>
			<Text style={styles.sectionTitle}>Расписание на сегодня</Text>
			<Text style={styles.sectionSubtitle}>
				Время работы: с {todayGraficData.from === null ? '' : todayGraficData.from.slice(0, 5)} до {todayGraficData.end === null ? '' : todayGraficData.end.slice(0, 5)}
			</Text>
		</View>
		{dailyTimeData && (
			<FlatList
				data={dailyTimeData}
				renderItem={renderTimeSlot}
				keyExtractor={item => item.time}
				horizontal
				style={{ paddingVertical: 10 }}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scheduleContainer}
			/>
		)}
		<StatusContainer
			regularVisitCount={regularVisitCount}
			notVisitCount={notVisitCount}
			vipCientsCount={vipCientsCount}
			newClientsCount={newClientsCount}
		/>
	</>
);

const Statistics: React.FC<StatisticsProps> = ({
	mainStatisticData,
	chartNumerator,
	chartDenominator,
	statisticNumerator,
	statisticDenominator
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
			<Text style={styles.statsText}>{mainStatisticData.completedSessions} Сеансы</Text>
		</View>
		<View style={styles.statsContainer}>
			<Text style={styles.statsTitle}>Доход сегодня</Text>
			<Text style={styles.incomeText}>{statisticNumerator || 0}</Text>
			<Text style={styles.incomeTextSmall}>из</Text>
			<Text style={styles.incomeText}>{statisticDenominator || 0}</Text>
		</View>
	</View>
);

const CardsSection: React.FC<{ mainStatisticData: any; }> = ({ mainStatisticData }) => (
	<View style={styles.cardsSection}>
		<View style={styles.card}>
			<Text style={styles.cardTitle}>Отменённые сеансы</Text>
			<Text style={{ color: COLORS.mainRed, fontSize: 24, fontWeight: 'bold', }}>{mainStatisticData.rejectedOrder}</Text>
		</View>
		<View style={[styles.card, styles.incomeCard]}>
			<Text style={{ color: COLORS.white }}>Доход в этом месяце</Text>
			<Text style={styles.cardValue}>{mainStatisticData.incomeThisMonth}</Text>
		</View>
	</View>
);

const BookingRequests: React.FC<BookingRequestsProps> = ({
	waitingData,
	toggleConfirmModal,
	toggleRejectedModal,
	isConfirmModal,
	isRejectedModal,
	setWaitingData
}) => (
	waitingData.length > 0 && (
		<View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
				<Text style={{ color: COLORS.white, fontSize: 20 }}>Запросы на бронь</Text>
				<View style={styles.headerRight}>
					<Text style={styles.requestsCount}>{waitingData.length} заявки</Text>
				</View>
			</View>
			<FlatList
				data={waitingData}
				renderItem={(props: any) => renderBookingRequest({
					...props,
					toggleConfirmModal,
					toggleRejectedModal,
					isRejectedModal,
					isConfirmModal,
					setWaitingData
				})}
				keyExtractor={item => item.orderId}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.bookingList}
			/>
		</View>
	)
);

const BookingRequestsHall: React.FC<BookingRequestsHallProps> = ({
	hallData,
	toggleConfirmModal,
	toggleRejectedModal,
	isConfirmModal,
	isRejectedModal,
	setHallData
}) => (
	hallData.length > 0 && (
		<View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
				<Text style={{ color: COLORS.white, fontSize: 20 }}>Запросы окошка</Text>
				<View style={styles.headerRight}>
					<Text style={styles.requestsCount}>{hallData.length} заявки</Text>
				</View>
			</View>
			<FlatList
				data={hallData}
				renderItem={(props: any) => renderBookingRequest({
					...props,
					toggleConfirmModal,
					toggleRejectedModal,
					isConfirmModal,
					isRejectedModal,
					setHallData
				})}
				keyExtractor={item => item.orderId}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.bookingList}
			/>
		</View>
	)
);

const renderTimeSlot: React.FC<{ item: DashboardDailyTimeOrders }> = ({ item }) => (
	<View style={[
		styles.timeSlot,
		item.type === 'REGULAR_VISIT' ? styles.bookedSlot :
			item.type === 'NOT_VISIT' ? styles.freeSlot :
				item.type === 'VIP' ? styles.vipSlot :
					styles.newSlot
	]}>
		<Text style={{ color: COLORS.white }}>{item.time === null ? '' : item.time.slice(0, 5) ?? ''}</Text>
	</View>
);

const renderBookingRequest: React.FC<RenderBookingRequestProps> = ({
	item,
	toggleConfirmModal,
	toggleRejectedModal,
	isConfirmModal,
	isRejectedModal,
	setWaitingData
}) => {
	const handleConfirm = () => editOrderStatus(setWaitingData, item.orderId, 'CONFIRMED', toggleConfirmModal);
	const handleReject = () => editOrderStatus(setWaitingData, item.orderId, 'REJECTED', toggleRejectedModal);
	return (
		<View style={styles.bookingCard}>
			<View style={styles.cardHeader}>
				<Text style={styles.newRequestText}> <FontAwesome name="star" size={12} color="#217355" />Новый Запрос</Text>
			</View>
			<View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10 }}>
				<View>
					<Image
						source={item.clientAttachmentId ? { uri: getFile + item.clientAttachmentId } : require('../../assets/avatar.png')}
						style={styles.profileImage} />
				</View>
				<View>
					<Text style={styles.userName}>{item.clientName}</Text>
					<Text style={styles.serviceText}>{item.categoryName}</Text>
				</View>
			</View>
			<View style={{
				borderWidth: 1,
				borderColor: '#4F4F4F',
				width: 150,
				padding: 3,
				borderRadius: 5,
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Text style={{ color: '#4F4F4F', fontSize: 12 }}>{item.categoryName}</Text>
			</View>
			<Text style={styles.timeText}>{item.orderDate}</Text>
			<View style={styles.actionButtons}>
				<TouchableOpacity style={styles.approveButton} onPress={toggleConfirmModal}>
					<Text style={styles.buttonText}>Одобрить</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.rejectButton} onPress={toggleRejectedModal}>
					<Text style={{ color: COLORS.mainRed, fontWeight: 'bold' }}>Отклонить</Text>
				</TouchableOpacity>
			</View>
			<CenteredModal isModal={isConfirmModal} toggleModal={toggleConfirmModal} isFullBtn btnRedText={"Одобрить"}
				onConfirm={handleConfirm} btnWhiteText="Назад">
				<View>
					<Text style={{ fontSize: 17, color: COLORS.white, textAlign: 'center' }}>Вы уверены, что хотите Одобрить этот
						заказ?</Text>
				</View>
			</CenteredModal>
			<CenteredModal isModal={isRejectedModal} toggleModal={toggleRejectedModal} isFullBtn btnRedText={"Отклонить"}
				onConfirm={handleReject} btnWhiteText="Назад">
				<View>
					<Text style={{ fontSize: 17, color: COLORS.white, textAlign: 'center' }}>Вы уверены, что хотите Отклонить этот
						заказ?</Text>
				</View>
			</CenteredModal>
		</View>
	)
};

const StatusContainer: React.FC<StatusContainerProps> = ({ regularVisitCount, notVisitCount, vipCientsCount, newClientsCount }) => (
	<View style={styles.statusContainer}>
		<StatusIndicator color={COLORS.booked} text={`Забронировано (${regularVisitCount || 0})`} />
		<StatusIndicator color={COLORS.free} text={`Свободно (${notVisitCount || 0})`} />
		<StatusIndicator color={COLORS.vip} text={`VIP клиенты (${vipCientsCount || 0})`} />
		<StatusIndicator color={COLORS.new} text={`Новые клиенты (${newClientsCount || 0})`} />
	</View>
);

const StatusIndicator: React.FC<{ color: string, text: string }> = ({ color, text }) => (
	<View style={styles.daylyStatus}>
		<View style={[styles.statusColor, { backgroundColor: color }]}></View>
		<Text style={styles.statusText}>{text}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
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
		color: COLORS.white,
	},
	headerIcons: {
		flexDirection: "row",
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
	timeSlot: {
		width: screenWidth / 4.4,
		paddingVertical: 10,
		marginHorizontal: 5,
		borderRadius: 5,
		alignItems: 'center',
	},
	bookedSlot: {
		backgroundColor: COLORS.booked,
	},
	freeSlot: {
		backgroundColor: COLORS.free,
	},
	vipSlot: {
		backgroundColor: COLORS.vip,
	},
	newSlot: {
		backgroundColor: COLORS.new,
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
		borderColor: COLORS.gray,
		borderRadius: 5,
	},
	statusColor: {
		width: 10,
		height: 10,
		borderRadius: 50,
	},
	statusText: {
		fontSize: 8,
		color: COLORS.white,
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
		backgroundColor: COLORS.cardBackground,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
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
		backgroundColor: COLORS.cardBackground,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
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
		fontWeight: 'bold',
	},
	incomeTextSmall: {
		color: COLORS.background,
		fontSize: 14,
	},
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
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 10,
	},
	serviceText: {
		fontSize: 14,
		marginTop: 5,
	},
	timeText: {
		fontSize: 14,
		marginTop: 5,
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	approveButton: {
		backgroundColor: COLORS.mainRed,
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
		borderColor: COLORS.mainRed
	},
	buttonText: {
		color: COLORS.white,
		fontWeight: "bold",
	},

});

export default TabOneScreen;
