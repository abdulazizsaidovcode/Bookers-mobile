import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import RatioOption, { RatioProps } from "./ratioOptiom";

const SettingPage = () => {

  const langData: RatioProps[] = [
    {label: "Узбекский", value: "uz"},
    {label: "Русский", value: "ru"},
    {label: "Английский", value: "en"}
  ]
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name="Настройки" />
      <ScrollView>
        <RatioOption radioProps={langData}/>
      </ScrollView>
      <View style={{ margin: 16 }}>
        <Buttons onPress={() => {}} title="Сохранить" />
      </View>
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
