import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { clientSessionStorage } from "@/helpers/state_managment/clientsessions/clientsessions";
import { getSeesions } from "@/helpers/api-function/clientsession/clientsession";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const { setClientSession, clientPastSession } = clientSessionStorage();

  // useFocusEffect(
  //   useCallback(() => {
  //     getSeesions(setClientSession); // Fetching sessions from API
  //     setTimeout(() => {
  //       console.log(clientPastSession); // Logging fetched sessions to console
  //     }, 2000);
  //   }, [])
  // );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name="История сеансов" />
      <View style={{ padding: 16 }}>
        <View style={styles.buttonContainer}>
          <CustomButton 
            title="Предстоящие" 
            onPress={() => setActiveTab('upcoming')} 
            active={activeTab === 'upcoming'} 
          />
          <CustomButton 
            title="Прошедшие" 
            onPress={() => setActiveTab('past')} 
            active={activeTab === 'past'} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 14,
  },
});

export default OrderHistory;
