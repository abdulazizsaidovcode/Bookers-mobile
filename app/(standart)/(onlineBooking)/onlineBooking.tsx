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
  OnlineBookingStory,
} from "@/helpers/state_managment/onlinBooking/onlineBooking";
import {
  getOnlineBookingAllowClient,
  onlineBookingAllowClient,
} from "@/helpers/api-function/onlineBooking/onlineBooking";
import { useTranslation } from "react-i18next";

const OnlineBooking = () => {
  const { allowClient, setAllowClient } = OnlineBookingStory();
  
    const {t}=useTranslation()
  const data = [
    {
      id: "1",
      title: t("record_duration"),
      subtitle: t("not_set"),
      IconComponent: (
        <FontAwesome5 name="calendar-alt" size={30} color="#9C0A35" />
      ),
      onPress: () => {
        router.push("/booking");
      },
      
    },
    {
      id: "2",
      title: t("break_between_sessions"),
      subtitle: t("not_set"),
      IconComponent: <Ionicons name="wine" size={30} color="#9C0A35" />,
      onPress: () => {
        router.push("/breakBetweenSessions");
      },
    },
    {
      id: "3",
      title: t("record_confirmation"),
      subtitle: t("not_set"),
      IconComponent: <Feather name="check-circle" size={30} color="#9C0A35" />,
      onPress: () => {
        router.push("/confirmationRecor");
      },
    },
    {
      id: "4",
      title: t("request_slot"),
      subtitle: t("not_set"),
      IconComponent: <Feather name="watch" size={30} color="#9C0A35" />,
      onPress: () => {
        router.push("/requestWindow");
      },
    },
    {
      id: "5",
      title: t("time_for_vip_clients"),
      subtitle: t("not_set"),
      IconComponent: <FontAwesome name="diamond" size={24} color="#9C0A35" />,
      onPress: () => {
        router.push("/timeSelect");
      },
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
      <NavigationMenu name={t("notification_settings")} />
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
                label={t("disable_all_notifications")}
                value={isEnabled}
                onToggle={toggleSwitch}
              />
              
            </View>
            <View style={tw`text-white mb-3`}>
              <Text style={tw`text-white mb-3`}>
                {t("configure_app_notifications")}
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
              title={t("to_home")}
              onPress={() => {
                putNumbers(6);
                router.push("(welcome)/Welcome");
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default OnlineBooking;