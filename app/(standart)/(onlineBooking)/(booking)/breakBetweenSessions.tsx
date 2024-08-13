import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import NavigationMenu from "@/components/navigation/navigation-menu";
import BreakBetweenSessionIn from "./breakBetweenSessionIn";
import SingleBreakBetweenSession from "./breakBetweenSessionsIn1";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { OnlineBookingSettingsUrgentlyStory, OnlineBookingStory } from "@/helpers/state_managment/onlinBooking/onlineBooking";
import { Loading } from "@/components/loading/loading";
import { useFocusEffect } from "expo-router";
import { getOnlineBookingserviceTime } from "@/helpers/api-function/onlineBooking/onlineBooking";
import Buttons from "@/components/(buttons)/button";

const { width, height } = Dimensions.get("window");

const BreakBetweenSession = () => {
  const { isLoading, setIsLoading } = OnlineBookingStory();
  const { setServiceTime, setServiseData } = OnlineBookingSettingsUrgentlyStory()
  const [activeButton, setActiveButton] = useState("everyService");
  const { tariff } = clientStore(); // Ensure this is defined and imported

  useFocusEffect(
    useCallback(() => {
      getOnlineBookingserviceTime(setServiseData, setIsLoading)
      return () => null
    }, [])
  )

  return (
    <>
      {isLoading ?
        <Loading /> :
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#21212E" barStyle="light-content" />
          <NavigationMenu name="Онлайн бронирование" />

          <View style={styles.content}>
            <View style={styles.buttonContainerWrapper}>
              <ScrollView
                horizontal
                contentContainerStyle={styles.buttonContainer}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.button,
                    activeButton === "everyService" && styles.activeButton,
                  ]}
                  onPress={() => setActiveButton("everyService")}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      activeButton === "everyService" && styles.activeButtonText,
                    ]}
                  >
                    После любой услуги
                  </Text>
                </TouchableOpacity>
                {tariff === "STANDARD" && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.button,
                      activeButton === "eachProcedure" && styles.activeButton,
                    ]}
                    onPress={() => setActiveButton("eachProcedure")}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        activeButton === "eachProcedure" &&
                        styles.activeButtonText,
                      ]}
                    >
                      Для каждой процедуры разный
                    </Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
            <View style={styles.contentArea}>
              {activeButton === "eachProcedure" ? (
                <BreakBetweenSessionIn />
              ) : (
                <SingleBreakBetweenSession />
              )}
            </View>
          </View>
        </SafeAreaView>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainerWrapper: {
    height: 50, // Fixed height to ensure it does not expand
  },
  buttonContainer: {
    paddingHorizontal: width * 0.04, // Responsive horizontal padding
    alignItems: "center",
  },
  button: {
    borderRadius: 8,
    paddingVertical: height * 0.015, // Responsive vertical padding
    paddingHorizontal: width * 0.05, // Responsive horizontal padding
    backgroundColor: "#4B4B64",
    marginBottom: width * 0.02, // Responsive horizontal margin
  },
  activeButton: {
    backgroundColor: "#9C0A35",
  },
  buttonText: {
    color: "#828282",
    textAlign: "center",
  },
  activeButtonText: {
    color: "white",
  },
  contentArea: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    paddingHorizontal: width * 0.04, // Responsive horizontal padding
  },
});

export default BreakBetweenSession;
