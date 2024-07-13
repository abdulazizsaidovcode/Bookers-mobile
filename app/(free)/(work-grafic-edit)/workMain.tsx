import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Buttons from "@/components/(buttons)/button";
import {  useFocusEffect, useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import {
  getWorkDay,
  getWorkTime,
} from "@/helpers/api-function/graficWork/graficWorkFunctions";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { getUser } from "@/helpers/api-function/getMe/getMee";
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(work-grafic-edit)/workMain'>;


export const WorkMainCardEdit: React.FC<{
  icon: any;
  title: string;
  subTitle: string;
  navigation?: () => void;
}> = ({ icon, title, subTitle, navigation }) => {

  return (
    <TouchableOpacity onPress={navigation}>
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

const WorkMainEdit = () => {
  const {
    setWeekData,
    weekData,
    setTimeData,
    setGetMee,
    getme,
    timeData,
  } = graficWorkStore();

  useFocusEffect(

    useCallback(() => {
      getUser(setGetMee);
      getWorkDay(setWeekData);
      return () => {}
    }, [])
  )
  
  useFocusEffect(

    useCallback(() => {
      getWorkTime(setTimeData, getme ? getme.id : "");
      return () => {}
    }, [getme])
  )
  const navigation = useNavigation<SettingsScreenNavigationProp>();


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: "80%", paddingHorizontal: 15, marginTop: 20 }}>
        <WorkMainCardEdit
          icon={<AntDesign name="calendar" size={24} color="#9C0A35" />}
          title="График работы"
          subTitle={
            weekData
              .filter((item: any) => item.active) // faqat active elementlarni filter qilamiz
              .map((item: any) => item.dayName.substring(0, 3)) // har bir active elementning birinchi 3 harfini chiqaramiz
              .join(", ") // elementlarni vergul bilan ajratamiz
          }
          navigation={() => navigation.navigate("(free)/(work-grafic-edit)/workGraffic")}
        />

        <WorkMainCardEdit
          icon={<MaterialIcons name="timer" size={24} color="#9C0A35" />}
          title="Время работы"
          subTitle={`From ${timeData ? timeData.from : "00:00"}  to ${
            timeData ? timeData.end : "00:00"
          }`}
          navigation={() => navigation.navigate("(free)/(work-grafic-edit)/workTime")}
        />
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
          onPress={() => navigation.navigate("(welcome)/Welcome")}
        />
      </View>
    </SafeAreaView>
  );
};

export default WorkMainEdit;

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
