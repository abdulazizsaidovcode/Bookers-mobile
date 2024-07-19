import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import { useNavigation } from "expo-router";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";


const SettingsClient = () => {
  const navigation = useNavigation<any>();

  const navigateTo = (screen: string) => {
    if (screen) {
      navigation.navigate(screen);
    } else {
    }
  };

  const navigationList = [
    {
      icon: "globe",
      label: "Сменить язык",
      screen: "(client)/(profile)/(settings)/(settingPage)/settingPage",
    },
    {
      icon: "sun",
      label: "Сменить тему",
      screen: "(client)/(profile)/(settings)/(settingPage)/settingPage",
    },
    {
      icon: "lock",
      label: "Изменить пароль",
      screen: "(client)/(profile)/(settings)/(settingPage)/settingPage",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name="Настройки" />
      <ScrollView>
        <View style={{ padding: 16 }}>
          {navigationList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigateTo(item.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemContent}>
                <FontAwesome5 name={item.icon} size={20} color="#9c0935" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <MaterialIcons name="navigate-next" size={36} color="#9c0935" />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
              style={styles.menuItem}
              // onPress={() => navigateTo("")}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemContent}>
                
                <Text style={styles.menuItemTextRed}>Удалить аккаунт</Text>
              </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ margin: 16 }}>
        <Buttons onPress={() => {}} title="Сохранить" />
      </View>
    </SafeAreaView>
  );
};

export default SettingsClient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#b9b9c9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    color: "black",
    marginLeft: 16,
  },
  menuItemTextRed: {
    color: "#9C0A35",
    marginLeft: 16,
  },
});
