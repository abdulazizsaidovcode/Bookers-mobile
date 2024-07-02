import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Buttons from "@/components/(buttons)/button";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import {
  getWorkDay,
  getWorkTime,
} from "@/helpers/api-function/graficWork/graficWorkFunctions";
import { getMee } from "@/helpers/token";

export const WorkMainCard: React.FC<{
  icon: any;
  title: string;
  subTitle: string;
  to?: string;
}> = ({ icon, title, subTitle, to }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => router.push(to || "")}>
      <View style={styles.card}>
        <View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {icon}
            <Text style={styles.cardText}>{title}</Text>
          </View>
          <View>
            <Text style={styles.daysText}>{subTitle}</Text>
          </View>
        </View>
        <View style={{ justifyContent: "center" }}>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const WorkMain = () => {
  const {
    setWeekData,
    weekData,
    setTimeData,
    setGetMee,
    getme,
    timeData,
  } = graficWorkStore();

  useEffect(() => {
    getMee(setGetMee);
    getWorkDay(setWeekData);
  }, []);

  useEffect(() => {
    getWorkTime(setTimeData, getme ? getme.id : "");
  }, [getme]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: "80%", paddingHorizontal: 15, marginTop: 20 }}>
        <WorkMainCard
          icon={<AntDesign name="calendar" size={24} color="#9C0A35" />}
          title="График работы"
          subTitle={`${
            weekData.length !== 0
              ? weekData.map((item: any) => {
                  if (item.active) {
                    return item.dayName.substring(0, 3);
                  } else {
                    return null;
                  }
                })
              : "bkjtjb"
          }`}
          to="(free)/(work-grafic)/workGraffic"
        />
        <TouchableOpacity activeOpacity={0.7}>
          <WorkMainCard
            icon={<MaterialIcons name="timer" size={24} color="#9C0A35" />}
            title="Время работы"
            subTitle={`From ${timeData ? timeData.from : "00:00"}  to ${
              timeData ? timeData.end : "00:00"
            }`}
            to="(free)/(work-grafic)/workTime"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 15,
          marginVertical: 20,
          height: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Buttons
          title="На главную"
          onPress={() => router.push("(free)/(work-grafic)/workMain")}
        />
      </View>
    </SafeAreaView>
  );
};

export default WorkMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212e",
  },
  card: {
    backgroundColor: "#b9b9c9",
    borderRadius: 15,
    marginBottom: 15,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 24,
    height: 24,
  },
  cardText: {
    color: "black",
    fontSize: 20,
    marginBottom: 5,
  },
  daysText: {
    color: "#000",
    fontSize: 14,
  },
  timeText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
