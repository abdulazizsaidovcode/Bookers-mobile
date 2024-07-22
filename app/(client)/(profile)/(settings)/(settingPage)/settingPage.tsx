import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import RatioOption, { RatioProps } from "./ratioOptiom";
import useProfileStore from "@/helpers/state_managment/client/clientEditStore";
import ThemeUpdate from "./themeUpdate";

const SettingPage = () => {
  const { routeName } = useProfileStore();

  const langData: RatioProps[] = [
    { label: "Узбекский", value: "uz" },
    { label: "Русский", value: "ru" },
    { label: "Английский", value: "en" },
  ];
  const themeData: RatioProps[] = [
    { label: "Светлая", value: "light" },
    { label: "Темная", value: "dark" },
    { label: "Системный", value: "system" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <View style={{ paddingLeft: 10 }}>
      <NavigationMenu name={routeName && routeName.value ? routeName.value : ""} />
      </View>
      <ScrollView style={{ padding: 16 }}>
        {routeName && routeName.id === 7
          ? <RatioOption radioProps={langData} />
          : routeName && routeName.id === 8
          ? <ThemeUpdate radioProps={themeData} />
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
  },
});
