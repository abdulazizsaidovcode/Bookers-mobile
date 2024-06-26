import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { DateObject } from "@/type/graficWork/graficWork";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import tw from "tailwind-react-native-classnames";
import moment from "moment";
import Toast from 'react-native-simple-toast';

const CalendarGrafficEdit: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<MarkedDates>({});
  const { setCalendarDate } = graficWorkStore();

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    const newSelectedDate: MarkedDates = {
      [today]: {
        selected: true,
        marked: true,
        dotColor: "red",
        color: "#9C0A35",
      },
    };
    setSelectedDate(newSelectedDate);
    setCalendarDate(today); // Default bugungi sanani saqlash
  }, [setCalendarDate]);

  const onDayPress = (day: DateObject) => {
    const today = moment().format("YYYY-MM-DD");

    if (moment(day.dateString).isBefore(today)) {
      Toast.show('Вы не можете выбрать дату до сегодняшнего дня.', Toast.LONG);
      return;
    }

    const newSelectedDate: MarkedDates = {
      [day.dateString]: {
        selected: true,
        marked: true,
        dotColor: "red",
        color: "#9C0A35",
      },
    };

    setSelectedDate(newSelectedDate);
    setCalendarDate(day.dateString); // Tanlangan sanani saqlash
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={[tw`w-80`]} // width va height ni tailwind orqali beramiz
        onDayPress={onDayPress}
        markedDates={selectedDate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal: 12,
  },
});

export default CalendarGrafficEdit;
