import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Share,
  Alert,
  BackHandler,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import PieChart from "react-native-pie-chart";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-simple-toast";
import {
  editOrderStatus,
  fetchDaylyOrderTimes,
  fetchHallingOrders,
  fetchMainStatistic,
  fetchTodayWorkGrafic,
  fetchWaitingOrders,
} from "@/helpers/api-function/dashboard/dashboard";
import useDashboardStore from "@/helpers/state_managment/dashboard/dashboard";
import {
  BookingRequestsHallProps,
  BookingRequestsProps,
  RenderBookingRequestProps,
  ScheduleSectionProps,
  StatisticsProps,
  StatusContainerProps,
} from "@/type/dashboard/dashboard";
import { getFile } from "@/helpers/api";
import CenteredModal from "@/components/(modals)/modal-centered";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import Buttons from "@/components/(buttons)/button";
import { useFocusEffect, useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { getData } from "@/helpers/token";
import AsyncStorage from "@react-native-async-storage/async-storage";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import { getNumbers } from "@/helpers/api-function/numberSittings/numbersetting";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { handleRefresh } from "@/constants/refresh";
import isRegister from "@/helpers/state_managment/isRegister/isRegister";
import InstallPin from "@/app/(auth)/(setPinCode)/installPin";
import { getTariffMaster } from "@/app/(profile)/(tariff)/tariff";
import { getMasterTariff, setMasterTariff } from "@/constants/storage";
import { Loading } from "@/components/loading/loading";
import moment from "moment";
import { StatusBar } from "expo-status-bar";

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
    const token = await AsyncStorage.getItem("registerToken");
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      console.log("Token not found");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getConfigImg = async () => {
  try {
    const token = await AsyncStorage.getItem("registerToken");
    if (token) {
      return {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      console.log("Token not found");
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const TabOneScreen: React.FC = () => {
  const { number, setNumber, isWaitModal, setIsWaitModal } = numberSettingStore();
  const { getMee, setGetMee } = useGetMeeStore();
  const navigation = useNavigation<any>();
  const { isRegtered } = isRegister();
  const [hasAllNumbers, setHasAllNumbers] = useState<boolean>(false);
  const [isPasswordSet, setIsPasswordSet] = useState<null | boolean>(null);
  const {
    mainStatisticData,
    waitingData,
    dailyTimeData,
    isConfirmModal,
    hallData,
    isRejectedModal,
    todayGraficData,
    isLoading,
    setIsLoading,
    setTodayGraficData,
    setRejectedIsModal,
    setHallData,
    setConfirmIsModal,
    setDailyTimeData,
    setMainStatisticData,
    setWaitingData,
  } = useDashboardStore();
  const { refreshing, setRefreshing } = clientStore();
  const [masterTariff, setTariffMaster] = useState<null | string>(null);
  const [backPressCount, setBackPressCount] = useState(0);
  const [pending, setPending] = useState(true);
  const [orderId, setOrderId] = useState("");
  const [tariff, setTariff] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    masterTariff && setMasterTariff(masterTariff);
  }, [masterTariff]);

  useFocusEffect(
    useCallback(() => {
      fetchMainStatistic(setMainStatisticData);
      fetchWaitingOrders(setWaitingData, setIsLoading);
      fetchHallingOrders(setHallData);
      getUser(setGetMee);
      fetchDaylyOrderTimes(setDailyTimeData, getMee.id);
      fetchTodayWorkGrafic(setTodayGraficData, getMee.id);
      getData();
      getNumbers(setNumber);
      getTariffMaster(setTariffMaster);
      getMasterTariff(setTariff);

      if (number && number.length > 0) {
        const res = removeDuplicatesAndSort(number);
        const result = containsAllNumbers(res);
        setHasAllNumbers(result);
        setPending(false);
      }
      return () => { };
    }, [])
  );

  // 2 marta orqaga qaytishni bosganda ilovadan chiqaradi
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (backPressCount === 0) {
          setBackPressCount(backPressCount + 1);
          Toast.show("Orqaga qaytish uchun yana bir marta bosing", Toast.SHORT);
          setTimeout(() => {
            setBackPressCount(0);
          }, 2000); // 2 soniya ichida ikkinchi marta bosilmasa, holatni qayta boshlaydi
          return true; // Orqaga qaytishni bloklaydi
        } else {
          BackHandler.exitApp(); // Ilovadan chiqish
          return false;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [backPressCount])
  );
  useFocusEffect(
    useCallback(() => {
      if (number && number.length > 1) {
        const res = removeDuplicatesAndSort(number);
        const result = containsAllNumbers(res);
        setHasAllNumbers(result);
        setPending(false);
      }
    }, [number])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await SecureStore.setItemAsync("isCreate", `${hasAllNumbers}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const checkPassword = async () => {
      const password = await SecureStore.getItemAsync("password");
      setIsPasswordSet(password !== null);
    };
    fetchData();
  }, [hasAllNumbers]);

  if (isPasswordSet == false) {
    return <InstallPin />;
  }

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
    return requiredNumbers.every((num) => array.includes(num));
  };

  const handleSubmit = async () => {
    await SecureStore.deleteItemAsync("number");
    await AsyncStorage.removeItem("registerToken");
    await SecureStore.deleteItemAsync("password");
    navigation.navigate("(auth)/auth");
    // setToggle(false);
  };

  const toggleConfirmModal = (id?: string) => {
    setConfirmIsModal(!isConfirmModal);
    setOrderId(id ? id : "");
  };
  const toggleRejectModal = (id?: string) => {
    setOrderId(id ? id : "");
    setRejectedIsModal(!isRejectedModal);
  };

  const chartFraction = mainStatisticData.completedSessions;
  const [chartNumerator, chartDenominator] = chartFraction.split("/");
  const statisticFraction = mainStatisticData.incomeToday;
  const [statisticNumerator, statisticDenominator] = statisticFraction.split(
    "/"
  );
  const regularVisitCount =
    dailyTimeData && dailyTimeData.length !== 0
      ? dailyTimeData &&
      dailyTimeData.filter((item) => item.type === "REGULAR_VISIT").length
      : 0;
  const notVisitCount =
    dailyTimeData && dailyTimeData.length !== 0
      ? dailyTimeData &&
      dailyTimeData.filter((item) => item.type === "STOPPED_VISIT").length
      : 0;
  const vipCientsCount =
    dailyTimeData && dailyTimeData.length !== 0
      ? dailyTimeData &&
      dailyTimeData.filter((item) => item.type === "VIP").length
      : 0;
  const newClientsCount =
    dailyTimeData && dailyTimeData.length! == 0
      ? dailyTimeData &&
      dailyTimeData.filter((item) => item.type === "NEW").length
      : 0;

  const handleConfirmOrReject = (status: string) =>
    editOrderStatus(
      setWaitingData,
      setHallData,
      orderId,
      status,
      toggleRejectModal,
      toggleConfirmModal,
      setIsLoading
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style="light" />
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
        {!isLoading ? (
          <BookingRequests
            setWaitingData={setWaitingData}
            waitingData={waitingData}
            toggleConfirmModal={toggleConfirmModal}
            toggleRejectedModal={toggleRejectModal}
            isRejectedModal={isRejectedModal}
            isConfirmModal={isConfirmModal}
            status={true}
          />
        ) : (
          <Loading />
        )}
        {tariff === "STANDARD" && (
          <BookingRequestsHall
            setHallData={setHallData}
            hallData={hallData}
            toggleConfirmModal={toggleConfirmModal}
            toggleRejectedModal={toggleRejectModal}
            isRejectedModal={isRejectedModal}
            isConfirmModal={isConfirmModal}
            status={false}
          />
        )}
        <CenteredModal
          isModal={isRejectedModal}
          toggleModal={toggleRejectModal}
          isFullBtn
          btnRedText={"Отклонить"}
          onConfirm={() => handleConfirmOrReject("REJECTED")}
          btnWhiteText="Назад"
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons name="cancel" size={100} color="#9C0A35" />
            <Text
              style={{ fontSize: 17, color: COLORS.white, textAlign: "center" }}
            >
              Вы уверены, что хотите Отклонить этот заказ?
            </Text>
          </View>
        </CenteredModal>
        <CenteredModal
          isModal={isConfirmModal}
          toggleModal={toggleConfirmModal}
          isFullBtn
          btnRedText={"Одобрить"}
          onConfirm={() => handleConfirmOrReject("CONFIRMED")}
          btnWhiteText="Назад"
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Feather name="check-circle" size={100} color="#9C0A35" />
            <Text
              style={{ fontSize: 17, color: COLORS.white, textAlign: "center" }}
            >
              Вы уверены, что хотите Одобрить этот заказ?
            </Text>
          </View>
        </CenteredModal>
        {pending ? (
          <View style={{ marginTop: 20 }}>
            <Loading />
          </View>
        ) : (
          !hasAllNumbers && (
            <View style={{ margin: 10 }}>
              <Buttons
                title="настройку"
                onPress={() => navigation.navigate("(profile)/(tariff)/tariff")}
              />
              <View style={{ marginTop: 10 }}>
                <Buttons title="Выйти" onPress={() => handleSubmit()} />
              </View>
            </View>
          )
        )}
      </ScrollView>
      <CenteredModal
        isFullBtn={false}
        btnWhiteText=""
        oneBtn={true}
        btnRedText={"Закрыть"}
        isModal={isWaitModal}
        onConfirm={() => setIsWaitModal(false)}
        toggleModal={() => setIsWaitModal(false)}
      >
        <>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 20,
            }}
          >
            Ваша заявка принта!
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "400",
              marginBottom: 20,
              letterSpacing: 1,
              textAlign: "center"
            }}
          >
            Администратор проверяет Ваши данные.
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "400",
              marginBottom: 30,
              letterSpacing: 1,
              textAlign: "center"
            }}
          >
            Это займет не более 20 минут
          </Text>
        </>
      </CenteredModal>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  const navigation = useNavigation<any>();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "https://t.me/senior_BX",
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
        <Ionicons
          name="notifications"
          size={24}
          color={COLORS.white}
          style={{ marginRight: 16 }}
          onPress={() => navigation.navigate("(tabs)/chat")}
        />
        <Ionicons
          name="share-social-outline"
          size={24}
          color={COLORS.white}
          onPress={onShare}
        />
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
    {dailyTimeData && (
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
        {mainStatisticData.completedSessions} Сеансы
      </Text>
    </View>
    <View style={styles.statsContainer}>
      <Text style={styles.statsTitle}>Доход сегодня</Text>
      <Text style={styles.incomeText}>{statisticNumerator || 0} сум</Text>
      <Text style={styles.incomeTextSmall}>из</Text>
      <Text style={styles.incomeText}>{statisticDenominator || 0} сум</Text>
    </View>
  </View>
);

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

const renderTimeSlot = ({ item }: any) => (
  <View
    style={[
      styles.timeSlot,
      item.type === "REGULAR_VISIT"
        ? styles.bookedSlot
        : item.type === "STOPPED_VISIT"
          ? styles.freeSlot
          : item.type === "VIP"
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
                : require("../../../assets/avatar.png")
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

const StatusContainer: React.FC<StatusContainerProps> = ({
  regularVisitCount,
  notVisitCount,
  vipCientsCount,
  newClientsCount,
}) => (
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
);


const StatusIndicator: React.FC<{ color: string; text: string }> = ({
  color,
  text,
}) => (
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
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
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
  statsSection: {
    padding: 10,
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
    fontFamily: "bold",
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
});

export default TabOneScreen;
