import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Buttons from "@/components/(buttons)/button";
import NavigationMenu from "@/components/navigation/navigation-menu";
import graficWorkStore from "@/helpers/state_managment/graficWork/graficWorkStore";
import { putWorkDay } from "@/helpers/api-function/graficWork/graficWorkFunctions";
import CalendarGrafficEdit from "../(work-grafic)/components/calendar";
import Toast from "react-native-simple-toast";
import { RootStackParamList } from "@/type/root";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Loading } from "@/components/loading/loading";
import WorkDays from "../(work-grafic)/components/workDays";
type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(free)/(work-grafic-edit)/workGraffic"
>;

const GrafficWorkEdit: React.FC = () => {
  const {
    calendarDate,
    week,
    isLoading,
    setIsLoading,
  } = graficWorkStore();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleContinuePress = () => {
    if (!calendarDate || !week.some((day) => day.active)) {
      Toast.show(
        "Пожалуйста, выберите дату начала работы и хотя бы один рабочий день.",
        Toast.LONG
      );
      return;
    }

    putWorkDay(week, calendarDate, () =>
      navigation.navigate("(free)/(work-grafic-edit)/workMain"), setIsLoading
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#21212E" barStyle="light-content" />
          <View style={{ paddingLeft: 10 }}>
            <NavigationMenu name="График работы" />
          </View>
          <ScrollView>
            <View style={styles.section}>
              <Text style={styles.title}>График работы с</Text>
              <CalendarGrafficEdit />
            </View>
              <WorkDays/>
              <View style={{ padding: 10 }}>
                <Buttons title="Продолжить" onPress={handleContinuePress} />
              </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
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
    paddingHorizontal:15
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
