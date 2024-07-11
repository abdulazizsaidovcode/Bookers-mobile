import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import tw from "tailwind-react-native-classnames";
import NavigationMenu from "@/components/navigation/navigation-menu";
import SwitchWithLabel from "@/components/switchWithLabel/switchWithLabel";
import Buttons from "@/components/(buttons)/button";
import MessageOption from "@/components/messageOption/messageOption";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { putNumbers } from "@/helpers/api-function/numberSittings/numbersetting";
import {
  OnlineBookingCheck,
  OnlineBookingStory,
} from "@/helpers/state_managment/onlinBooking/onlineBooking";
import {
  getOnlineBookingAllowClient,
  onlineBookingAllowClient,
} from "@/helpers/api-function/onlineBooking/onlineBooking";

const OnlineBooking = () => {
  const { allowClient, setAllowClient } = OnlineBookingStory();
  const { recording, breakSession, confirmation, request, time } =
    OnlineBookingCheck();
  console.log(recording);

  const data = [
    {
      id: "1",
      title: "Длительность записи",
      subtitle: "Не настроено",
      IconComponent: (
        <FontAwesome5 name="calendar-alt" size={30} color="#9C0A35" />
      ),
      onPress: () => {
        router.push("/booking");
      },
      isDesebled: recording,
    },
    {
      id: "2",
      title: "Перерыв между сеансами",
      subtitle: "Не настроено",
      IconComponent: <Ionicons name="wine" size={30} color="#9C0A35" />,
      onPress: () => {
        router.push("/breakBetweenSessions");
      },
      isDesebled: breakSession,
    },
    {
      id: "3",
      title: "Подтверждение записи",
      subtitle: "Не настроено",
      IconComponent: <Feather name="check-circle" size={30} color="#9C0A35" />,
      onPress: () => {
        router.push("/confirmationRecor");
      },
      isDesebled: confirmation,
    },
    {
      id: "4",
      title: "Запрос окошка",
      subtitle: "Не настроено",
      IconComponent: <Feather name="watch" size={30} color="#9C0A35" />,
      onPress: () => {
        router.push("/requestWindow");
      },
      isDesebled: request,
    },
    {
      id: "5",
      title: "Время для VIP клиентов",
      subtitle: "Не настроено",
      IconComponent: <FontAwesome name="diamond" size={24} color="#9C0A35" />,
      onPress: () => {
        router.push("/timeSelect");
      },
      isDesebled: time,
    },
  ];

  const [isEnabled, setIsEnabled] = useState(allowClient);

  const toggleSwitch = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    setAllowClient(newValue); // Update the global state
    onlineBookingAllowClient(newValue);
  };

  const renderItem = ({ item }: { item: any }) => (
    <MessageOption
      title={item.title}
      subtitle={item.subtitle}
      onPress={item.onPress}
      IconComponent={item.IconComponent}
      disebled={item.isDesebled}
    />
  );
  useEffect(() => {
    getOnlineBookingAllowClient(setAllowClient);
  }, []);

  useEffect(() => {
    setIsEnabled(allowClient);
  }, [allowClient]);

  return (
    <SafeAreaView style={[tw`flex-1 mt-6`, { backgroundColor: "#21212E" }]}>
      <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
      <NavigationMenu name={`Настройка уведомлений`} />
      <View style={[tw`flex-1`, { backgroundColor: "#21212E" }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            flexGrow: 1,
            justifyContent: "space-between",
            backgroundColor: "#21212E",
          }}
        >
          <View>
            <View style={tw`mb-5`}>
              <SwitchWithLabel
                label="Отключить все уведомления"
                value={isEnabled}
                onToggle={toggleSwitch}
              />
            </View>
            <View style={tw`text-white mb-3`}>
              <Text style={tw`text-white mb-3`}>
                Настройте уведомления приложения
              </Text>
            </View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={[tw` content-end mb-5`, { backgroundColor: "#21212E" }]}>
            <Buttons
              title="На главную"
              onPress={() => {
                putNumbers(6);
                router.push("(onlineBooking)/test");
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OnlineBooking;
