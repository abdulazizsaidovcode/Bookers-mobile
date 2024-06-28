import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { DateObject } from "@/type/graficWork/graficWork";
import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

const {width, height} = Dimensions.get("window");

const CalendarGraffic: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<MarkedDates>({});
  const { setCalendarDate } = graficWorkStore();

  const onDayPress = (day: DateObject) => {
    const newSelectedDate: MarkedDates = {
      [day.dateString]: {
        selected: true,
        marked: true,
        dotColor: "red",
        selectedColor: "#9C0A35",
      },
    };

    setSelectedDate(newSelectedDate);
    setCalendarDate(day.dateString); // Update the store with the selected date
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={styles.calendar} // Calendar uslubi uchun style prop qo'shildi
        onDayPress={onDayPress}
        markedDates={selectedDate}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#9C0A35",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          monthTextColor: "#2d4150",
          arrowColor: "#9C0A35",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textInactiveColor: "#9C0A35",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 16,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    height: "auto",

    padding: 20,
  },
  calendar: {
    width: width / 1.1,
    height: "auto",
    borderRadius: 20,
    paddingBottom: 10,
  },
});

export default CalendarGraffic;
