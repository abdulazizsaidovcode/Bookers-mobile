import { ScrollView, StatusBar, StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ServicesCategory from "@/components/services/servicesCatgegory";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { Item } from "@/type/graficWork/graficWork";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { putWorkDay } from "@/helpers/api-function/graficWork/graficWorkFunctions";
import CalendarGrafficEdit from "./calendar";
import Toast from 'react-native-simple-toast';
import { RootStackParamList } from "@/type/root";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(work-grafic-edit)/workGraffic'>;



const GrafficWorkEdit: React.FC = () => {
  const { calendarDate, setWeek, week, weekData } = graficWorkStore();
  const navigation = useNavigation<SettingsScreenNavigationProp>();


  const [items, setItems] = useState<Item[]>([
    { id: 1, dayValue: "monday", dayName: "Понедельник", active: false },
    { id: 2, dayValue: "tuesday", dayName: "Вторник", active: false },
    { id: 3, dayValue: "wednesday", dayName: "Среда", active: false },
    { id: 4, dayValue: "thursday", dayName: "Четверг", active: false },
    { id: 5, dayValue: "friday", dayName: "Пятница", active: false },
    { id: 6, dayValue: "saturday", dayName: "Суббота", active: false },
    { id: 7, dayValue: "sunday", dayName: "Воскресенье", active: false },
  ]);

  useEffect(() => {
    const updatedItems = items.map(item => {
      const isWeekDataActive = weekData.some(
        weekItem => weekItem.dayName.toLowerCase() === item.dayValue.toLowerCase() && weekItem.active
      );
      return { ...item, active: isWeekDataActive || item.active };
    });
    setItems(updatedItems);
  }, [weekData]);

  const handleCategoryPress = (id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, active: !item.active } : item
    );
    setItems(updatedItems);
    setWeek(updatedItems.map((item) => ({ dayName: item.dayValue, active: item.active })));
  };

  const handleContinuePress = () => {
    if (!calendarDate || !week.some(day => day.active)) {
      Toast.show('Пожалуйста, выберите дату начала работы и хотя бы один рабочий день.', Toast.LONG);
      return;
    }
    
    putWorkDay(week, calendarDate, () => navigation.navigate("(free)/(work-grafic-edit)/workMain"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <NavigationMenu name="График работы" />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.title}>График работы с</Text>
          <CalendarGrafficEdit />
        </View>
        <View style={styles.fullHeightSection}>
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
          <View style={{ padding: 10 }}>
            <Buttons
              title="Продолжить"
              onPress={handleContinuePress}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GrafficWorkEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212e",
  },
  section: {
    height: 430,
    display: "flex",
    gap: 20,
  },
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
    paddingHorizontal: 10,
    gap: 5,
    paddingVertical: 10,
  },
});
