import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Buttons from "@/components/(buttons)/button";
import { useFocusEffect, useNavigation } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import {
  getWorkDay,
  getWorkTime,
} from "@/helpers/api-function/graficWork/graficWorkFunctions";
import { getNumbers, putNumbers } from "@/helpers/api-function/numberSittings/numbersetting";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import { WorkMainCardEdit } from "../(work-grafic-edit)/workMain";
import { Loading } from "@/components/loading/loading";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(free)/(work-grafic)/workMain"
>;

export const WorkMainCard: React.FC<{
  icon: any;
  title: string;
  subTitle: string;
  route?: () => void;
  disabled?: boolean;
}> = ({ icon, title, subTitle, route, disabled = false }) => {
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={route}>
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
    const { setNumber } = numberSettingStore();
    const navigation = useNavigation<SettingsScreenNavigationProp>();
  const {
    setWeekData,
    weekData,
    setTimeData,
    setGetMee,
    getme,
    timeData,
    calendarDate,
    setIsLoading,
    isLoading,
  } = graficWorkStore();

  useFocusEffect(
    useCallback(() => {
      getUser(setGetMee);
      getWorkDay(setWeekData, setIsLoading);
      return () => {};
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      getWorkTime(setTimeData, getme ? getme.id : "");
      return () => {};
    }, [getme])
  );

  const isDisabled = weekData.every(
    (item: { dayName: string; active: boolean }) => !item.active
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={{ height: "80%", paddingHorizontal: 15, marginTop: 20 }}>
            <WorkMainCard
              icon={<AntDesign name="calendar" size={24} color="#9C0A35" />}
              title="График работы"
              subTitle={`${
                weekData.length !== 0
                  ? weekData
                      .filter((item: any) => item.active) // faqat active elementlarni filter qilamiz
                      .map((item: any) => item.dayName.substring(0, 3)) // har bir active elementning birinchi 3 harfini chiqaramiz
                      .join(", ") // elementlarni vergul bilan ajratamiz
                  : "Рабочие дни недели не настроены!"
              }`}
              route={() =>
                navigation.navigate("(free)/(work-grafic)/workGraffic")
              }
            />
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : isDisabled ? 0.5 : 1,
                },
              ]}
              disabled={isDisabled}
            >
              <WorkMainCard
                disabled={isDisabled}
                icon={<MaterialIcons name="timer" size={24} color="#9C0A35" />}
                title="Время работы"
                subTitle={
                  timeData && timeData.from && timeData.end
                    ? `From ${timeData.from ? timeData.from : "00:00"}  to ${
                        timeData.end ? timeData.end : "00:00"
                      }`
                    : "Рабочее время не настроено!"
                }
                route={() =>
                  navigation.navigate("(free)/(work-grafic)/workTime")
                }
              />
            </Pressable>
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
              onPress={() => {
                if (
                  calendarDate &&
                  timeData.from !== undefined &&
                  timeData.end !== undefined &&
                  weekData.some((item) => item.active)
                ) {
                  putNumbers(3, () => getNumbers(setNumber));
                }
                navigation.navigate("(welcome)/Welcome");
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
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
