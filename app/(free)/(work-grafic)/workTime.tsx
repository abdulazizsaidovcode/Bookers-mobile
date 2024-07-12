import React, { useState, useEffect } from "react";
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
import { postWorkTime } from "@/helpers/api-function/graficWork/graficWorkFunctions";
import Toast from "react-native-simple-toast";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { useNavigation } from "expo-router";
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/client-list'>;


const timeList = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

const TimeWorkEdit: React.FC = () => {
  const { weekData, timeData } = graficWorkStore();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigation = useNavigation<SettingsScreenNavigationProp>();


  useEffect(() => {
    if (timeData && timeData.from && timeData.end) {
      const fromTime = timeData.from.substring(0, 5);
      const endTime = timeData.end.substring(0, 5);
      if (timeList.includes(fromTime) && timeList.includes(endTime)) {
        setSelectedTimeSlots([fromTime, endTime]);
      }
    }
  }, [timeData]);

  useEffect(() => {
    setIsDisabled(selectedTimeSlots.length < 2);
  }, [selectedTimeSlots]);

  const toggleTimeSlotSelection = (time: string) => {
    if (selectedTimeSlots.includes(time)) {
      setSelectedTimeSlots((prevSelectedTimeSlots) =>
        prevSelectedTimeSlots.filter((slot) => slot !== time)
      );
    } else if (selectedTimeSlots.length < 2) {
      setSelectedTimeSlots((prevSelectedTimeSlots) => [...prevSelectedTimeSlots, time]);
    }
  };

  const getRangeIndices = () => {
    if (selectedTimeSlots.length < 2) return [];

    const indices = selectedTimeSlots
      .map((slot) => timeList.indexOf(slot))
      .sort((a, b) => a - b);
    const [start, end] = [indices[0], indices[indices.length - 1]];

    return timeList.slice(start, end + 1);
  };

  const rangeIndices = getRangeIndices();

  const weekendDays = weekData
    .filter((day) => !day.active)
    .map((day) => day.dayName);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
      <NavigationMenu name={`Время работы`} />
      <ScrollView style={{ marginTop: 15 }}>
        <View>
          <Text style={styles.title}>Рабочие дни</Text>
        </View>
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
        <View>
          <Text style={[styles.title, { marginTop: 15 }]}>Время работы</Text>

          <>
            <Text style={{ color: "white", paddingHorizontal: 15, width: 340 }}>
              Выберите рабочее время в которое запись будет доступна для ваших
              клиентов
            </Text>
            <View style={styles.timeListContainer}>
              {timeList.map((time, index) => (
                <TimesCard
                  key={index}
                  title={time}
                  onSelect={() => toggleTimeSlotSelection(time)}
                  isSelected={selectedTimeSlots.includes(time)}
                  isInRange={rangeIndices.includes(time)}
                  disabled={
                    (selectedTimeSlots.length > 0 &&
                      timeList.indexOf(time) <
                        timeList.indexOf(selectedTimeSlots[0])) ||
                    (selectedTimeSlots.length >= 2 &&
                      !selectedTimeSlots.includes(time) &&
                      !rangeIndices.includes(time))
                  }
                />
              ))}
            </View>
          </>
        </View>
        <View>
          <Text style={[styles.title, { marginTop: 15 }]}>Выходные дни</Text>
          <Text style={{ color: "white", paddingHorizontal: 15 }}>
            {weekendDays.length === 0 ? "Без выходных" : weekendDays.join(", ")}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 5,
          marginVertical: 20,
          height: "10%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Buttons
          title="Продолжить"
          onPress={() =>
            postWorkTime(
              +selectedTimeSlots[0].substring(0, 1) === 0
                ? +selectedTimeSlots[0].substring(1, 2)
                : +selectedTimeSlots[0].substring(0, 2),
              +selectedTimeSlots[0].substring(3, 4) === 0
                ? +selectedTimeSlots[0].substring(4, 5)
                : +selectedTimeSlots[0].substring(3, 5),
              +selectedTimeSlots[1].substring(0, 1) === 0
                ? +selectedTimeSlots[1].substring(1, 2)
                : +selectedTimeSlots[1].substring(0, 2),
              +selectedTimeSlots[1].substring(3, 4) === 0
                ? +selectedTimeSlots[1].substring(3, 5)
                : +selectedTimeSlots[1].substring(3, 5),
                () => navigation.navigate("(free)/(work-grafic)/workMain")
            )
          }
          isDisebled={!isDisabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default TimeWorkEdit;

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
