import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import SwitchWithLabel from "@/components/switchWithLabel/switchWithLabel";
import SwitchWithLabelBlack from "@/components/switchWithLabel/switchWithLabelBlack";
import {
  // OnlineBookingCheck,
  OnlineBookingStory,
} from "@/helpers/state_managment/onlinBooking/onlineBooking";
import Buttons from "@/components/(buttons)/button";
import {
  getOnlineConfirmationServices,
  onlineConfirmationServices,
} from "@/helpers/api-function/onlineBooking/onlineBooking";
import { router } from "expo-router";
import isRegister from "@/helpers/state_managment/isRegister/isRegister";

const ConfirmationRecord = () => {
  // const { isRegtered } = isRegister();
  // const { setRequest } = OnlineBookingCheck();

  // setRequest(isRegister);
  const {
    isEnabled,
    setIsEnabled,
    isEnabled2,
    setIsEnabled2,
    isEnabled3,
    setIsEnabled3,
    setData,
    data,
  } = OnlineBookingStory();
  useEffect(() => {
    getOnlineConfirmationServices(setData);
  }, []);

  useEffect(() => {
    if (data) {
      setIsEnabled(data.allClient);
      setIsEnabled2(data.newClient);
      setIsEnabled3(data.notConfirm);
    }
  }, [data]);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    // onlineBookingAllowClient(newValue)
    console.log(newValue);
  };
  const toggleSwitch2 = () => {
    const newValue = !isEnabled2;
    setIsEnabled2(newValue);
    // setAllowClient(newValue); // Update the global state
    // onlineBookingAllowClient(newValue)
    console.log(newValue);
  };
  const toggleSwitch3 = () => {
    const newValue = !isEnabled3;
    setIsEnabled3(newValue);
    // setAllowClient(newValue); // Update the global state
    // onlineBookingAllowClient(newValue)
    console.log(newValue);
  };

  console.log("data: ", data);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ marginBottom: 10 }}></Text>
        <NavigationMenu name={`Онлайн бронирование`} />
        <StatusBar style="auto" />
        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 10,
            backgroundColor: "#B9B9C9",
            borderRadius: 15,
          }}
        >
          <SwitchWithLabelBlack
            label="Подтверждать записи для всех клиентов"
            value={isEnabled}
            onToggle={toggleSwitch}
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
            label="Подтверждать записи только 
                    для новых клиентов"
            value={isEnabled2}
            onToggle={toggleSwitch2}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 20,
            backgroundColor: "#B9B9C9",
            borderRadius: 15,
          }}
        >
          <SwitchWithLabelBlack
            label="Не подтверждать записи"
            value={isEnabled3}
            onToggle={toggleSwitch3}
          />
        </View>

        <Text style={{ marginBottom: 10, color: "white" }}>
          Настройте подтверждение записи Вы можете подтверждать каждую запись и
          приложение будет отправлять увеедомления клиентам
        </Text>
        <Text style={{ marginBottom: 10, color: "white" }}>
          Или клиенты будут бронировать Ваши услуги без Вашего подтверждения и
          Вы будете видеть всех записанных клиентов
        </Text>
      </View>
      <Buttons
        title="Save"
        backgroundColor="#9C0A35"
        onPress={() => {
          onlineConfirmationServices(isEnabled, isEnabled2, isEnabled3);
          router.push("(standart)/(onlineBooking)/onlineBooking");
        }}
      />
    </SafeAreaView>
  );
};

export default ConfirmationRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#21212E",
    padding: 16,
  },
});
