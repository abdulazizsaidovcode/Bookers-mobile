import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { DateObject } from "@/type/graficWork/graficWork";
import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, Platform } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import tw from "tailwind-react-native-classnames";
import moment from "moment";
import Toast from 'react-native-simple-toast';
import { useFocusEffect } from "expo-router";

const CalendarGrafficEdit: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<MarkedDates>({});
  const { setCalendarDate } = graficWorkStore();

  useFocusEffect(
    useCallback(() => {
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
      return () => {}
    }, [setCalendarDate])
  );

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

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'ios') {
        console.log('Running on iOS');
      } else {
        console.log('Running on Android');
      }
      return () => {}
    }, [])
  );

  const getMarkedDates = () => {
    const today = moment().format("YYYY-MM-DD");
    const markedDates: MarkedDates = {};
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    for (let date = startOfMonth; date.isBefore(endOfMonth); date.add(1, 'day')) {
      const dayString = date.format("YYYY-MM-DD");
      if (date.isBefore(today)) {
        markedDates[dayString] = { color: 'gray', textColor: 'white', disabled: true };
      } else if (date.day() === 0 || date.day() === 6) {
        markedDates[dayString] = { textColor: 'red', color: 'transparent' }; // Ensure weekends are red
      } else {
        markedDates[dayString] = {};
      }
    }
    return markedDates;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={[tw`w-80`]}
        onDayPress={onDayPress}
        markedDates={{ ...getMarkedDates(), ...selectedDate }}
        firstDay={1} // Haftani dushanbadan boshlash
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#000',
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
    paddingVertical: 10,
    
  },
});

export default CalendarGrafficEdit;
