import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { DateObject } from "@/type/graficWork/graficWork";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Platform } from "react-native";
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
        color: "red",
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

  useEffect(() => {
    if (Platform.OS === 'ios') {
      console.log('Running on iOS');
    } else {
      console.log('Running on Android');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={[tw`w-80`]}
        onDayPress={onDayPress}
        markedDates={selectedDate}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          dayTextColor: 'black',
          todayTextColor: '#9C0A35',
          selectedDayTextColor: '#ffffff',
          selectedDayBackgroundColor: '#9C0A35',
          dotColor: '#fff',
          selectedDotColor: '#ffffff',
          arrowColor: '#9C0A35',
          monthTextColor: '#9C0A35',
          indicatorColor: '#9C0A35',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
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
    paddingVertical: 10,
  },
});

export default CalendarGrafficEdit;
