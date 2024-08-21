import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, RefreshControl, BackHandler, } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-simple-toast";
import { editOrderStatus, fetchDaylyOrderTimes, fetchHallingOrders, fetchMainStatistic, fetchTodayWorkGrafic, fetchWaitingOrders, } from "@/helpers/api-function/dashboard/dashboard";
import useDashboardStore from "@/helpers/state_managment/dashboard/dashboard";
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
import { StatusBar } from "expo-status-bar";
import MasterHeader from "@/components/master-dashboard/Header";
import ScheduleSection from "@/components/master-dashboard/ScheduleSection";
import CardsSection from "@/components/master-dashboard/CardsSection";
import { BookingRequests, BookingRequestsHall } from "@/components/master-dashboard/RequetsCard";
import Statistics from "@/components/master-dashboard/MainStatistics";
import { getClientStatistics } from "@/helpers/api-function/client/client";
import { ClientStatus } from "@/type/client/client";
import BusinessCard from "@/components/master-dashboard/BusinessCard";

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
  const [workPending, setWorkPending] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [clientCounts, setClientCounts] = useState<ClientStatus | null>(null)

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
      getData();
      getNumbers(setNumber);
      getTariffMaster(setTariffMaster);
      getMasterTariff(setTariff);
      getClientStatistics(setClientCounts)

      if (number && number.length > 0) {
        const res = removeDuplicatesAndSort(number);
        const result = containsAllNumbers(res);
        setHasAllNumbers(result);
        setPending(false);
      }
      return () => { };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      fetchDaylyOrderTimes(setDailyTimeData, getMee.id, setWorkPending);
      fetchTodayWorkGrafic(setTodayGraficData, getMee.id, setWorkPending);
    }, [getMee.id])
  )

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

  const toggleIsOpen = () => setIsOpen(!isOpen)

  const chartFraction = mainStatisticData.completedSessions;
  const [chartNumerator, chartDenominator] = chartFraction.split("/");
  const statisticFraction = mainStatisticData.incomeToday;
  const [statisticNumerator, statisticDenominator] = statisticFraction.split("/");
  const orderTimeSlots = dailyTimeData && dailyTimeData.length !== 0 ? dailyTimeData && dailyTimeData.filter((item) => item.type === "REGULAR_VISIT") : [];

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
      <MasterHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <StatusBar style="light" />
        <ScheduleSection
          todayGraficData={todayGraficData}
          workPending={workPending}
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
          orderTimeSlots={orderTimeSlots}
        />
        <View style={{ padding: 10 }}>
          <View style={{ backgroundColor: '#9C0A35', borderRadius: 15, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Мои клиенты</Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>{clientCounts?.allClient || 0}</Text>
          </View>
        </View>
        <Statistics
          mainStatisticData={mainStatisticData}
          chartNumerator={+chartNumerator}
          chartDenominator={+chartDenominator}
          statisticNumerator={+statisticNumerator}
          statisticDenominator={+statisticDenominator}
        />
        <CardsSection
          mainStatisticData={mainStatisticData}
          hallCount={hallData.length}
          orderCount={waitingData.length}
        />
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
        <View style={{ padding: 10 }}>

          <BusinessCard />
        </View>
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
              style={{ fontSize: 17, color: '#fff', textAlign: "center" }}
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
              style={{ fontSize: 17, color: '#fff', textAlign: "center" }}
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
          !hasAllNumbers && !isLoading && (
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212e',
  },

});

export default TabOneScreen;