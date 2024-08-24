import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ServicesCategory from "@/components/services/servicesCatgegory";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { Item } from "@/type/graficWork/graficWork";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import {
  getWorkDay,
  postWorkDay,
} from "@/helpers/api-function/graficWork/graficWorkFunctions";
import CalendarGrafficEdit from "./components/calendar";
import Toast from "react-native-simple-toast";
import { RootStackParamList } from "@/type/root";
import { NavigationProp } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "expo-router";
import { Loading } from "@/components/loading/loading";
import WorkDays from "./components/workDays";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import Explanations from "@/components/(explanations)/explanations";
type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(free)/(work-grafic)/workGraffic"
>;

const GrafficWorkEdit: React.FC = () => {
  const {
    calendarDate,
    setWeek,
    week,
    weekData,
    setIsLoading,
    isLoading,
    setGetMee,
    setWeekData,
  } = graficWorkStore();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleContinuePress = () => {
    if (!calendarDate) {
      Toast.show(
        "Вы должны ввести дату начала.",
        Toast.LONG
      );
      return;
    }
    navigation.navigate("(free)/(work-grafic)/workGrafficNext")
    // postWorkDay(
    //   week,
    //   calendarDate,
    //   () => navigation.navigate("(free)/(work-grafic)/workGrafficNext"),
    //   setIsLoading
    // );
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#21212E" barStyle="light-content" />
          <View style={{ paddingLeft: 10 }}>
            <NavigationMenu name="График работы" />
          </View>
          <View style={styles.fullHeightSection}>
            <View style={styles.section}>
              <Explanations text="Выберите дату с которой Вы начнёте работу"/>
              <View style={styles.sectionText}>
                <Text style={[styles.title, { fontWeight:"600"}]}>Начало графика работы</Text>
                <Text style={styles.title}>{calendarDate}</Text>
              </View>
              <CalendarGrafficEdit />
            </View>
              {/* <WorkDays/> */}
              <View style={{ padding: 10, marginHorizontal: 10 }}>
                <Buttons title="Продолжить" onPress={handleContinuePress} />
              </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default GrafficWorkEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212e",
  },
  section: {
    height: 450,
    display: "flex",
    gap: 20,
    paddingHorizontal: 15,
  },
  sectionText : {
    display: "flex",
    flexDirection: "row",
  },
  fullHeightSection: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10
  },
  title: {
    fontSize: 17,
    color: "white",
    paddingHorizontal: 15,
  },
  categoriesContainer: {
    flexDirection: "column",
    paddingHorizontal: 10,
    gap: 5,
    paddingVertical: 10,
  },
});
