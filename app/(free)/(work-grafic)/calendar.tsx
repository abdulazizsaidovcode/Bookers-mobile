import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

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
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));

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

  const changeYear = (amount: number) => {
    const newDate = moment(currentDate).add(amount, 'year').format('YYYY-MM-DD');
    setCurrentDate(newDate);
  };

  const renderHeader = (date: DateObject) => {
    const currentYear = moment(date.dateString).format('YYYY');
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => changeYear(-1)}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{currentYear}</Text>
        <TouchableOpacity onPress={() => changeYear(1)}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        current={currentDate}
        onDayPress={onDayPress}
        markedDates={selectedDates}
        markingType={'period'}
        renderHeader={renderHeader}
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
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  arrow: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
