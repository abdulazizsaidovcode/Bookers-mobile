import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TimesCard from "@/components/grafic/timesCard";
import WeeklCard from "@/components/grafic/weeklCard";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import {
  postWorkTime,
  putWorkTime,
} from "@/helpers/api-function/graficWork/graficWorkFunctions";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { useFocusEffect, useNavigation } from "expo-router";
import { Loading } from "@/components/loading/loading";
import Explanations from "@/components/(explanations)/explanations";
type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(free)/(work-grafic-edit)/workTimeDetail"
>;

const TimeWorkDetail: React.FC = () => {
  const {
    weekData,
    selectedTimeSlot,
    method,
    isLoading,
    setIsLoading,
    calendarDate,
  } = graficWorkStore();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const weekendDays = weekData
    .filter((day) => !day.active)



  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
          <View style={{ paddingLeft: 10 }}>
            <NavigationMenu name={`Время работы`} />
          </View>
          <View style={{ marginHorizontal: 15 }}>
            <Explanations text="Проверьте еще раз свой график" />
          </View>
          <View style={{ marginHorizontal: 15 , marginTop: 15, flex: 1, display: "flex", gap: 15, }}>
            <View>
              <Text style={styles.title}>Дата начала графика</Text>
              <View style={{}}>
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 15,
                    width: 340,
                  }}
                >
                  {calendarDate}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.title}>Рабочие дни недели</Text>
              <View style={styles.weekListContainer}>
                {weekData &&
                  weekData.map(
                    (item, i) =>
                      item.active && (
                        <WeeklCard
                          key={i}
                          title={item.active && item.dayName.substring(0, 3)}
                        />
                      )
                  )}
              </View>
            </View>
            <View>
              <Text style={[styles.title, { marginTop: 15 }]}>
                Время работы
              </Text>

              <View style={{}}>
                <Text
                  style={{
                    color: "white",
                    paddingHorizontal: 15,
                    width: 340,
                  }}
                >
                  {` c ${selectedTimeSlot[0]} до ${selectedTimeSlot[1]}`}
                </Text>
              </View>
            </View>
            <View>
              <Text style={[styles.title, { marginTop: 15 }]}>
                Выходные дни
              </Text>
              <View style={styles.weekListContainer}>
                {weekendDays ?
                  weekendDays.map(
                    (item, i) =>
                      !item.active && (
                        <WeeklCard
                          key={i}
                          title={!item.active && item.dayName.substring(0, 3)}
                        />
                      )
                  ) :

                  <Text
                    style={{ color: "white", paddingHorizontal: 15, fontSize: 14 }}
                  >Без выходных

                  </Text>
                }
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              marginVertical: 10,
              height: "10%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Buttons
              title="Продолжить"
              onPress={() =>
                method === "put"
                  ? putWorkTime(
                    +selectedTimeSlot[0].substring(0, 1) === 0
                      ? +selectedTimeSlot[0].substring(1, 2)
                      : +selectedTimeSlot[0].substring(0, 2),
                    +selectedTimeSlot[0].substring(3, 4) === 0
                      ? +selectedTimeSlot[0].substring(4, 5)
                      : +selectedTimeSlot[0].substring(3, 5),
                    +selectedTimeSlot[1].substring(0, 1) === 0
                      ? +selectedTimeSlot[1].substring(1, 2)
                      : +selectedTimeSlot[1].substring(0, 2),
                    +selectedTimeSlot[1].substring(3, 4) === 0
                      ? +selectedTimeSlot[1].substring(3, 5)
                      : +selectedTimeSlot[1].substring(3, 5),
                    () =>
                      navigation.navigate(
                        "(welcome)/Welcome"
                      ), setIsLoading
                  )
                  : method === "post"
                    ? postWorkTime(
                      +selectedTimeSlot[0].substring(0, 1) === 0
                        ? +selectedTimeSlot[0].substring(1, 2)
                        : +selectedTimeSlot[0].substring(0, 2),
                      +selectedTimeSlot[0].substring(3, 4) === 0
                        ? +selectedTimeSlot[0].substring(4, 5)
                        : +selectedTimeSlot[0].substring(3, 5),
                      +selectedTimeSlot[1].substring(0, 1) === 0
                        ? +selectedTimeSlot[1].substring(1, 2)
                        : +selectedTimeSlot[1].substring(0, 2),
                      +selectedTimeSlot[1].substring(3, 4) === 0
                        ? +selectedTimeSlot[1].substring(3, 5)
                        : +selectedTimeSlot[1].substring(3, 5),
                      () => navigation.navigate("(welcome)/Welcome"),
                      setIsLoading
                    )
                    : null
              }
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default TimeWorkDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212e",
    marginTop: 35,
  },
  title: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    paddingHorizontal: 15,
    fontWeight: "600",
  },
  weekListContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  timeListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
});
