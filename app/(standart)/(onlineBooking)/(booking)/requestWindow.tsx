import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import SwitchWithLabelBlack from "@/components/switchWithLabel/switchWithLabelBlack";
import {
  // OnlineBookingCheck,
  OnlineBookingStory2,
} from "@/helpers/state_managment/onlinBooking/onlineBooking";
import {
  getOnlineBookingHallWaiting,
  onlineBookingHallWaiting,
} from "@/helpers/api-function/onlineBooking/onlineBooking";
import isRegister from "@/helpers/state_managment/isRegister/isRegister";
import { router } from "expo-router";

const RequestWindow = () => {
  const { isEnabled, setIsEnabled, isEnabled2, setIsEnabled2, data, setData } =
    OnlineBookingStory2();
  // const { isRegtered } = isRegister();
  // const { setTime } = OnlineBookingCheck();

  // setTime(isRegister);

  useEffect(() => {
    // Ma'lumotlarni olish va setData funksiyasi orqali o'rnatish
    getOnlineBookingHallWaiting(setData);
  }, []);

  useEffect(() => {
    // Ma'lumotlar o'zgarganda switch tugmalarini yangilash
    if (data) {
      setIsEnabled(data.allClient);
      setIsEnabled2(data.regularClient);
    }
  }, [data]);

  const requestSwitch = () => {
    setIsEnabled(true);
    setIsEnabled2(false);
  };

  const requestSwitch2 = () => {
    setIsEnabled(false);
    setIsEnabled2(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ marginBottom: 10 }}></Text>
        <NavigationMenu name={`Онлайн бронирование`} />
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            color: "white",
            fontSize: 18,
          }}
        >
          Запрос окошка
        </Text>
        <Text style={{ color: "white", marginBottom: 10 }}>
          Когда клиент выбирает день для записи и на этот день нет свободного
          времени, он может активировать зал ожидания. Затем, если у мастера
          освобождается время в этот день из-за отмены другого заказа, клиент,
          находящийся в зале ожидания, может быть перенаправлен на это время.
          Мастер уведомляет клиента через приложение о доступном времени, и
          клиент может подтвердить запись на это время
        </Text>
        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 10,
            backgroundColor: "#B9B9C9",
            borderRadius: 15,
          }}
        >
          <SwitchWithLabelBlack
            value={isEnabled}
            onToggle={requestSwitch}
            label="Подтверждать записи для всех клиентов"
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 10,
            backgroundColor: "#B9B9C9",
            borderRadius: 15,
          }}
        >
          <SwitchWithLabelBlack
            value={isEnabled2}
            onToggle={requestSwitch2}
            label="Активировать запрос окошка только для постоянных клиентов"
          />
        </View>
      </View>
      <Buttons
        title="Сохранить"
        backgroundColor="#9C0A35"
        onPress={() => {
          onlineBookingHallWaiting(isEnabled, isEnabled2);
          router.push("(standart)/(onlineBooking)/onlineBooking");
        }}
      />
    </SafeAreaView>
  );
};

export default RequestWindow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#21212E",
    padding: 16,
  },
});
