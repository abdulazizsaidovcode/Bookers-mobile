import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import { useNavigation } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import useProfileStore, {
  RouteData,
} from "@/helpers/state_managment/client/clientEditStore";
import CenteredModal from "@/components/(modals)/modal-centered";
import { deleteClientProfile } from "@/helpers/api-function/client/clientPage";

const SettingsClient = () => {
  const navigation = useNavigation<any>();
  const { setRoute } = useProfileStore();
  const [showModal, setShowModal] = useState(false)

    const deleteModal = () => setShowModal(!showModal)

  const navigationList = [
    {
      id: 7,
      icon: "globe",
      label: "Сменить язык",
      screen: "(client)/(profile)/(settings)/(settingPage)/settingPage",
    },
    {
      id: 8,
      icon: "sun",
      label: "Сменить тему",
      screen: "(client)/(profile)/(settings)/(settingPage)/settingPage",
    },
    {
      id: 9,
      icon: "lock",
      label: "Изменить пароль",
      screen: "(auth)/(setPinCode)/installPin",
    },
  ];

  const handlePress = (key: RouteData, route: string) => {
    setRoute(key);
    navigation.navigate(route);
  };

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
              onPress={() =>
                handlePress({ id: item.id, value: item.label }, item.screen)
              }
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
            onPress={() => deleteModal()}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTextRed}>Удалить аккаунт</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CenteredModal isFullBtn={true} btnRedText="Да" btnWhiteText="Отмена" isModal={showModal} onConfirm={() => deleteClientProfile()} toggleModal={() => deleteModal()} children={
        <View style={styles.modalMain}>
          <MaterialCommunityIcons name="delete-alert" size={80} color="#9C0A35" style={styles.modalImage} />
          <Text style={styles.modalText}>Вы хотите удалить свой профиль?</Text>
        </View>
      }/>
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
  modalMain: {
    justifyContent: "center",
    alignItems: "center",
    gap:10,
    marginVertical: 10
  },
  modalImage: {

  },
  modalText: {
    color: "#fff",
    fontSize: 16,

  }
});
