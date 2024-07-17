import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import CustomButton from "./CustomButton";
import AccordionCard from "./AccordionCard";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { SafeAreaView } from "react-native-safe-area-context";

const appointments = [
  // Your list of appointments goes here
  // Example:
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  {
    title: "Наращивание ресниц",
    date: "Пн, 10 февраля 12:30 - 13:30",
    details: "Стрижка, укладка, покраска волос",
    master: "Натали",
    rating: 5,
    price: "350 000 сум",
    location: "Яккасарайский р-н, ул. Мирабад, 62а",
    services: ["Стрижка", "Укладка", "Покраска Волос"],
    phone: "+998901234567",
  },
  // Add more objects as needed
];

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const filteredAppointments =
    activeTab === "upcoming"
      ? appointments // filter for upcoming appointments
      : []; // filter for past appointments (replace with actual data)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`#21212E`} />
      <NavigationMenu name={`Время работы`} />
      <View style={styles.container2}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Предстоящие"
            onPress={() => setActiveTab("upcoming")}
            active={activeTab === "upcoming"}
          />
          <CustomButton
            title="Прошедшие"
            onPress={() => setActiveTab("past")}
            active={activeTab === "past"}
          />
        </View>
        <ScrollView style={styles.scroll}>
          {filteredAppointments.length === 0 ? (
            <View style={styles.noAppointments}>
              <Text style={{color: "white"}}>У вас пока нет записей!</Text>
            </View>
          ) : (
            <FlatList
              data={filteredAppointments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <AccordionCard {...item} />}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
  },
  container2: {
    flex: 1,
    padding: 16,
  },
  scroll: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 14,
  },
  noAppointments: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderHistory;
