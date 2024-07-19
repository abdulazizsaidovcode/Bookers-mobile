import React, { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import AccordionCard from "./AccordionCard";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { clientSessionStorage } from "@/helpers/state_managment/clientsessions/clientsessions";
import { useCommunitySlider } from "@/helpers/state_managment/communitySlider/communitySliderStore";
import { getSeesions } from "@/helpers/api-function/clientsession/clientsession";

const appointments = [
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
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);
  const { setClientSession, clientPastSession } = clientSessionStorage()

  const filteredAppointments = activeTab === 'upcoming'
    ? appointments // upcoming appointments uchun filter
    : []; // past appointments uchun filter (haqiqiy malumotlar bilan almashtiring)

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  useFocusEffect(useCallback(() => {
    getSeesions(setClientSession) // Fetching sessions from API (if needed)
    setTimeout(() => {
      console.log(clientPastSession); // Logging fetched sessions to console (if needed)
    }, 2000)
  }, []))

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name="История сеансов" />
      <View style={{ padding: 16 }}>
        <View style={styles.buttonContainer}>
          <CustomButton title="Предстоящие" onPress={() => setActiveTab('upcoming')} active={activeTab === 'upcoming'} />
          <CustomButton title="Прошедшие" onPress={() => setActiveTab('past')} active={activeTab === 'past'} />
        </View>
        {filteredAppointments && filteredAppointments.length === 0 ? (
          <View style={styles.noAppointments}>
            <Text>У вас пока нет записей!</Text>
          </View>
        ) : (
          <FlatList
            data={filteredAppointments}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) => (
              <AccordionCard
                {...item}
                isOpen={openAccordionIndex === index}
                onToggle={() => handleAccordionToggle(index)}
              />
            )}
            contentContainerStyle={styles.contentContainer}
          />
        )}
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
  contentContainer: {
    paddingBottom: 130, // This will ensure there's enough space at the bottom
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
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderHistory;
