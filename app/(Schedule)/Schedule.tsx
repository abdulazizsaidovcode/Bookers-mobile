import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

import Tabs from "./components/tabs";
import Bookedschedule from "./bookedschedule";
import RequestSchedule from "./availebleschedule";

import {
  useScheduleAvialableStore,
  useScheduleBookedStore,
  useSheduleData,
} from "@/helpers/state_managment/schedule/schedule";
import {
  getAvialable,
  getBookedSchedule,
} from "@/helpers/api-function/schedule/schedule";
import { getFreeTime } from "@/helpers/api-function/freeTime/freeTime";
import { useScheduleFreeTime } from "@/helpers/state_managment/freeTime/freeTime";
import Buttons from "@/components/(buttons)/button";
import { useOrderPosdData } from "@/helpers/state_managment/order/order";
import { useFocusEffect, useNavigation } from "expo-router";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import HallSchedule from "./hall";
import axios from "axios";
import { base_url } from "@/helpers/api";
import { getConfig } from "../(tabs)/(master)/main";
import CenteredModal from "@/components/(modals)/modal-centered";
import { getMasterTariff } from "@/constants/storage";
import { usePinCode } from "@/context/PinContext";
import CheckPinCode from "../(auth)/(checkPinCode)/checkPinCodeAbsolute";

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("booked");
  const [active, setActive] = useState(true);
  const [toggleModal, setToggleModal] = useState(false);

  const { schedule, setSchedule } = useScheduleBookedStore();
  const { scheduleBooked, setScheduleBooked } = useScheduleAvialableStore();
  const { FreeTime, setFreeTime } = useScheduleFreeTime();

  const { serviceIds, date, timeHour, setServiceId, setDate, setTime } = useSheduleData();
  const { setOrderData } = useOrderPosdData();
  const navigation = useNavigation<any>();
  const { calendarDate } = graficWorkStore();
  const [tariff, setTariff] = useState();

  const toggle = () => setToggleModal(!toggleModal);

  useFocusEffect(
    useCallback(() => {
      getMasterTariff(setTariff)
    }, [tariff, setTariff])
  )

  useEffect(() => {
    if (serviceIds.length > 0 && calendarDate && timeHour) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [serviceIds, timeHour, calendarDate]);

  useEffect(() => {
    setServiceId("");
    setDate("");
    setTime("");
  }, [calendarDate]);

  const setOrder = () => {
    const order = {
      serviceIds: serviceIds,
      date: calendarDate,
      timeHour: parseInt(timeHour.split(":")[0], 10),
      timeMin: parseInt(timeHour.split(":")[1], 10),
      comment: "", // This should be dynamically set
    };

    setOrderData(order);
    setServiceId("");
    setDate("");
    setTime("");
    navigation.navigate("(Schedule)/components/users");
  };

  const handleClick = async () => {
    try {
      const config = await getConfig();

      if (schedule.length) {
        const { data } = await axios.post(
          `${base_url}order/stop-recording?isActive=true`, {},
          config ? config : {}
        );

        if (data.success) toggle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookedSchedule(new Date().toISOString().split("T")[0], setSchedule);
  }, [setSchedule]);

  useEffect(() => {
    getAvialable(setScheduleBooked);
  }, [setScheduleBooked]);

  useEffect(() => {
    getFreeTime(new Date().toISOString().split("T")[0], setFreeTime);
  }, [setFreeTime]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 1, marginBottom: 35 }}>
          <View>
            <Text
              style={[
                tw`text-white text-3xl my-7 font-bold`,
                { letterSpacing: 2 },
              ]}
            >
              Расписание
            </Text>
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
          </View>
          {activeTab === "booked" && <Bookedschedule />}
          {activeTab === "requests" && <RequestSchedule />}
          {activeTab === "hall" && <HallSchedule />}
        </View>
        {activeTab == "booked" && (
          <View style={styles.button}>
            <Buttons
              title="Записать клиента"
              isDisebled={!active}
              onPress={setOrder}
            />
            {tariff === "STANDARD" && (
              <Buttons isDisebled={!!schedule.length} title="Остановить запись" onPress={toggle} />
            )}
          </View>
        )}
      </ScrollView>
      <CenteredModal
        isModal={toggleModal}
        onConfirm={handleClick}
        btnWhiteText="Отмена"
        btnRedText="Да"
        toggleModal={toggle}
        isFullBtn
      >
        <View>
          <Text style={tw`text-white text-base text-center`}>
            {schedule.length
              ? `На выбранный день ${schedule.length} забронированных сеанса`
              : "У вас нет непогашенных ордеров"}
          </Text>
          <Text style={tw`text-white text-base text-center my-3 font-bold`}>
            Запретить бронирование на выбранный день?
          </Text>
        </View>
      </CenteredModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#21212E",
  },
  button: {
    // position: 'absolute',
    // bottom: 1,
    // left: 16,
    // right: 16,
    borderRadius: 8,
    paddingBottom: 16,
    paddingTop: 16,
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#21212E",
  },
});

export default Schedule;
