import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
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
import { useFocusEffect, useNavigation } from "expo-router";
import { RootStackParamList } from "@/type/root";
import { NavigationProp } from "@react-navigation/native";
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(standart)/(onlineBooking)/(booking)/confirmationRecor'>;


const ConfirmationRecord = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

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


  

    useFocusEffect(
      useCallback(() => {
  
        if (data) {
          setIsEnabled(data.allClient);
          setIsEnabled2(data.newClient);
          setIsEnabled3(data.notConfirm);
        }
      }, [data]));

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    setIsEnabled2(false);
    setIsEnabled3(false);

  };

  const toggleSwitch2 = () => {
    const newValue = !isEnabled2;
    setIsEnabled(false);
    setIsEnabled2(newValue);
    setIsEnabled3(false);
  };

  const toggleSwitch3 = () => {
    const newValue = !isEnabled3;
    setIsEnabled(false);
    setIsEnabled2(false);
    setIsEnabled3(newValue);
  };


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
        title="Сохранить"
        backgroundColor="#9C0A35"
        onPress={() => {
          onlineConfirmationServices(isEnabled, isEnabled2, isEnabled3, navigation);
          console.log(isEnabled, isEnabled2, isEnabled3);
          // router.push("(standart)/(onlineBooking)/onlineBooking");
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
