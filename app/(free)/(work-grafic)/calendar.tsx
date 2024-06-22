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
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
  };
}

const App: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<MarkedDates>({});

  const onDayPress = (day: DateObject) => {
    let newSelectedDates: MarkedDates = { ...selectedDates };

    if (Object.keys(newSelectedDates).length === 0) {
      newSelectedDates[day.dateString] = { selected: true, startingDay: true, color: 'blue' };
    } else {
      const selectedDatesArray = Object.keys(newSelectedDates);

      if (selectedDatesArray.length === 1) {
        const start = selectedDatesArray[0];
        const end = day.dateString;
        const range = getRange(start, end);

        range.forEach((date, index) => {
          if (index === 0) {
            newSelectedDates[date] = { selected: true, startingDay: true, color: 'blue' };
          } else if (index === range.length - 1) {
            newSelectedDates[date] = { selected: true, endingDay: true, color: 'blue' };
          } else {
            newSelectedDates[date] = { selected: true, color: 'lightblue' };
          }
        });
      } else {
        newSelectedDates = {};
      }
    }

    setSelectedDates(newSelectedDates);
    logSelectedDatesToConsole(newSelectedDates);
  };

  const getRange = (start: string, end: string): string[] => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const range: string[] = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      range.push(new Date(d).toISOString().split('T')[0]);
    }

    return range;
  };

  const logSelectedDatesToConsole = (dates: MarkedDates) => {
    console.log('Selected Dates:', dates);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        style={[tw`w-80`]}  // width va height ni tailwind orqali beramiz
        onDayPress={onDayPress}
        markedDates={selectedDates}
        markingType={'multi-period'}
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

export default App;
