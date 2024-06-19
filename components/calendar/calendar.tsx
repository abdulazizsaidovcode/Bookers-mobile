import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker, { Event as DateTimePickerEvent } from '@react-native-community/datetimepicker';

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowCalendar(false);
    setSelectedDate(currentDate);
  };

  const formatDate = (date: Date) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('ru-RU', options);
  };

  return (
    <>
      <TouchableOpacity style={styles.datePicker} onPress={() => setShowCalendar(true)}>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        <View style={styles.calendarIcon} />
      </TouchableOpacity>
      {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4B4B64',
    borderRadius: 10,
    padding: 10,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#403D4B',
    borderRadius: 12,
  },
});

export default CalendarComponent;
