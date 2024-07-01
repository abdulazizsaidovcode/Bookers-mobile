import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import UserProfileCard from "./serviseCard";
import Buttons from "@/components/(buttons)/button";

const servicesData = [
  {
    title: "Женская для взрослых",
    subtitle: "Маникюр Обычный",
    description:
      "Стрижка и укладка – это одно из важнейших вещей при создании красивого образа Стрижка и укладка – это одно из важнейших вещей при создании красивого образа Стрижка и укладка – это одно из важнейших вещей при создании красивого образа Стрижка и укладка – это одно из важнейших вещей при создании красивого образаСтрижка и укладка – это одно из важнейших вещей при создании красивого образаСтрижка и укладка – это одно из важнейших вещей при создании красивого образа",
    price: "350 000 сум",
    image: "https://picsum.photos/200/300",
  },
];

const Services: React.FC = () => {
  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.profileCard}>
        <UserProfileCard />
      </View>

      <Text style={styles.sectionTitle}>Услуги Натали</Text>
      {servicesData.map((service, index) => (
        <View key={index} style={styles.serviceCard}>
          <Text style={styles.title}>{service.title}</Text>
          <View style={styles.header}>
            <Text style={styles.subtitle}>{service.subtitle}</Text>
            <Text style={styles.price}>{service.price}</Text>
          </View>
          <Image
            source={{ uri: service.image }} // Rasmingiz manzili
            style={styles.image}
          />
          <Text style={styles.serviceDescription}>{service.description}</Text>
          <Buttons title="Подробнее"/>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#21212E",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d00000",
  },

  subtitle: {
    borderWidth: 1,
    borderColor: "#555",
    fontSize: 12,
    color: "#555",
    padding: 6,
    borderRadius: 5
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  profileCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 16,
  },

  serviceCard: {
    backgroundColor: "#B9B9C9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  serviceDescription: {
    color: "#333",
    marginBottom: 11,
  },
});

export default Services;
