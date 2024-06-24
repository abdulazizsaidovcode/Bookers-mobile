import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import tw from 'tailwind-react-native-classnames';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface MarkedDates {
  [date: string]: {
    selected?: boolean;
    marked?: boolean;
    dotColor?: string;
    color?: string;
  };
}

const CalendarGraffic: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<MarkedDates>({});

  const onDayPress = (day: DateObject) => {
    const newSelectedDate: MarkedDates = {
      [day.dateString]: { selected: true, marked: true, dotColor: 'blue', color: 'blue' }
    };

    setSelectedDate(newSelectedDate);
    logSelectedDateToConsole(day.dateString);
  };

  const logSelectedDateToConsole = (dateString: string) => {
    console.log('Selected Date:', dateString);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={[tw`w-80`]}  // width va height ni tailwind orqali beramiz
        onDayPress={onDayPress}
        markedDates={selectedDate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginHorizontal: 12,
  },
});

export default CalendarGraffic;
