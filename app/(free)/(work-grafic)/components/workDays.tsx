import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import ServicesCategory from '@/components/services/servicesCatgegory'
import graficWorkStore from '@/helpers/state_managment/graficWork/graficWorkStore'
import { useFocusEffect, useNavigation } from 'expo-router'
import { Item } from '@/type/graficWork/graficWork'

const WorkDays = () => {

    const {
        setWeek,
        weekData,
      } = graficWorkStore();
    
      const [items, setItems] = useState<Item[]>([
        { id: 1, dayValue: "monday", dayName: "Понедельник", active: false },
        { id: 2, dayValue: "tuesday", dayName: "Вторник", active: false },
        { id: 3, dayValue: "wednesday", dayName: "Среда", active: false },
        { id: 4, dayValue: "thursday", dayName: "Четверг", active: false },
        { id: 5, dayValue: "friday", dayName: "Пятница", active: false },
        { id: 6, dayValue: "saturday", dayName: "Суббота", active: false },
        { id: 7, dayValue: "sunday", dayName: "Воскресенье", active: false },
      ]);
      useFocusEffect(
        useCallback(() => {
          const updatedItems = items.map((item) => {
            const isWeekDataActive = weekData.some(
              (weekItem) =>
                weekItem.dayName.toLowerCase() === item.dayValue.toLowerCase() &&
                weekItem.active
            );
            return { ...item, active: isWeekDataActive || item.active };
          });
          setItems(updatedItems);
          return () => {};
        }, [weekData])
      );

    const handleCategoryPress = (id: number) => {
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, active: !item.active } : item
        );
        setItems(updatedItems);
        setWeek(
          updatedItems.map((item) => ({
            dayName: item.dayValue,
            active: item.active,
          }))
        );
      };

  return (
    <View style={styles.fullHeightSection}>
        <View>
        <Text style={styles.title}>Выберите рабочие дни в неделю</Text>
              <View style={styles.categoriesContainer}>
                {items.map((item, index) => (
                  <ServicesCategory
                    key={index}
                    title={item.dayName}
                    isChecked={item.active}
                    onPress={() => handleCategoryPress(item.id)}
                  />
                ))}
              </View>
        </View>
             
            </View>
  )
}

export default WorkDays

const styles = StyleSheet.create({
   
   
    fullHeightSection: {
      flex: 1,
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      color: "white",
      paddingHorizontal: 15,
    },
    categoriesContainer: {
      flexDirection: "column",
      gap: 5,
      paddingVertical: 10,
    },
  });
  