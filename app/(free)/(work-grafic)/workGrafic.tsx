import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import TimesCard from "@/components/grafic/timesCard";
import WeeklCard from "@/components/grafic/weeklCard";
import Buttons from '@/components/(buttons)/button';
import { router } from 'expo-router';
import NavigationMenu from '@/components/navigation/navigation-menu';

const weekList = [
  { id: 1, title: 'Пн', value: 'Понедельник' },
  { id: 2, title: 'Вт', value: 'Вторник' },
  { id: 3, title: 'Ср', value: 'Среда' },
  { id: 4, title: 'Чт', value: 'Четверг' },
  { id: 5, title: 'Пт', value: 'Пятница' },
  { id: 6, title: 'Сб', value: 'Субота' },
  { id: 7, title: 'Вс', value: 'Воскресения' }
];

const timeList = [
  '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30',
  '22:00', '22:30', '23:00', '23:30'
];

const GraficWork: React.FC = () => {
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    setIsDisabled(selectedWeekDays.length === 0 || selectedTimeSlots.length < 2);
  }, [selectedWeekDays, selectedTimeSlots]);

  const toggleWeekDaySelection = (id: number) => {
    setSelectedWeekDays((prevSelectedWeekDays) => {
      if (prevSelectedWeekDays.includes(id)) {
        return prevSelectedWeekDays.filter((day) => day !== id);
      } else {
        return [...prevSelectedWeekDays, id];
      }
    });
  };

  const toggleTimeSlotSelection = (time: string) => {
    setSelectedTimeSlots((prevSelectedTimeSlots) => {
      if (prevSelectedTimeSlots.includes(time)) {
        return prevSelectedTimeSlots.filter((slot) => slot !== time);
      } else if (prevSelectedTimeSlots.length < 2) {
        return [...prevSelectedTimeSlots, time];
      }
      return prevSelectedTimeSlots;
    });
  };


  const getRangeIndices = () => {
    if (selectedTimeSlots.length < 2) return [];

    const indices = selectedTimeSlots.map((slot) => timeList.indexOf(slot)).sort((a, b) => a - b);
    const [start, end] = [indices[0], indices[indices.length - 1]];

    return timeList.slice(start, end + 1);
  };

  const rangeIndices = getRangeIndices();

  const weekendDays = weekList.filter(day => !selectedWeekDays.includes(day.id)).map(day => day.value);

  const workingHours = selectedTimeSlots.length >= 2
    ? `с ${selectedTimeSlots[0]} до ${selectedTimeSlots[selectedTimeSlots.length - 1]}`
    : '';

  const handleContinue = () => {
    const results: any = [];
    setFilteredResults(results);
    setIsFiltered(true);
  };

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
       <NavigationMenu name={`Из адресной книги`} clicks={() => ('')}/>
      <View style={{ height: '85%' }}>
        <View>
          <Text style={styles.title}>Рабочие дни</Text>
        </View>
        <View style={styles.weekListContainer}>
          {weekList.map((item) => (
            <WeeklCard
              key={item.id}
              title={item.title}
              onSelect={() => toggleWeekDaySelection(item.id)}
              isSelected={selectedWeekDays.includes(item.id)}
            />
          ))}
        </View>
        <View>
          <Text style={[styles.title, { marginTop: 15 }]}>Время работы</Text>
          {!isFiltered ? (
            <>
              <Text style={{ color: 'white', paddingHorizontal: 15, width: 340 }}>
                Выберите рабочее время в которое запись будет доступна для ваших клиентов
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
                      selectedTimeSlots.length > 0 &&
                      timeList.indexOf(time) < timeList.indexOf(selectedTimeSlots[0]) ||
                      (selectedTimeSlots.length >= 2 &&
                        !selectedTimeSlots.includes(time) &&
                        !rangeIndices.includes(time))
                    }
                  />
                ))}
              </View>
            </>
          ) : (
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={{ color: 'white' }}>{workingHours}</Text>
            </View>
          )}
        </View>
        <View>
          <Text style={[styles.title, { marginTop: 15 }]}>Выходные дни</Text>
          <Text style={{ color: 'white', paddingHorizontal: 15 }}>
            {weekendDays.length === 0 ? 'Без выходных' : weekendDays.join(', ')}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, marginVertical: 20, height: '15%', alignItems: 'center', justifyContent: 'center' }}>
        <Buttons title='Продолжить' onPress={() => !isFiltered ? handleContinue() : router.push('/workMain')} isDisebled={!isDisabled} />
      </View>
    </SafeAreaView>
  );
};

export default GraficWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212e',
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    paddingHorizontal: 15
  },
  weekListContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  timeListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultItem: {
    padding: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  resultText: {
    color: 'white',
  },
});
