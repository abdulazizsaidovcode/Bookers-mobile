import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { DateObject } from "@/type/graficWork/graficWork";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import tw from "tailwind-react-native-classnames";

const CalendarGrafficEdit: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<MarkedDates>({});
  const { setCalendarDate } = graficWorkStore();

  const onDayPress = (day: DateObject) => {
    const newSelectedDate: MarkedDates = {
      [day.dateString]: {
        selected: true,
        marked: true,
        dotColor: "red",
        color: "#9C0A35",
      },
    };

    setSelectedDate(newSelectedDate);
    setCalendarDate(day.dateString); // Update the store with the selected date
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
