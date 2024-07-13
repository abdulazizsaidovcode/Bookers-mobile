import React, {  useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import UserProfileCard from "./serviseCard";
import webPageStore from "@/helpers/state_managment/wepPage/wepPage";
import { getServiseWith } from "@/helpers/api-function/wepPage/wepPage";
import { getFile } from "@/helpers/api";

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState("");

  const { servise, category, setServise, getme } = webPageStore();

  const getServise = (id: any) => {
    if (id) {
      getServiseWith(setServise, id);
    }
  };

  return (
    <ScrollView style={styles.contentContainer}>
      <View style={styles.profileCard}>
        <UserProfileCard />
      </View>

      <Text style={styles.sectionTitle}>
        Услуги {getme ? getme.firstName : ""}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {category && category.length > 0 ? (
          category.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.tabButton,
                activeTab === item.id && styles.activeTab,
              ]}
              onPress={() => {
                setActiveTab(item.id); // Update activeTab state
                getServise(item.id);
              }}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab !== item.id && styles.inactiveText,
                ]}
              >
                {item.name.trim()}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.placeholderText}>Category not found</Text>
        )}
      </ScrollView>

      {servise && servise.length !== 0 ? (
        servise.map((item: any, index: number) => (
          <View key={index} style={styles.serviceCard}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.header}>
              <Text style={styles.subtitle}>{item.category.name}</Text>
              <Text style={styles.price}>{item.price} so'm</Text>
            </View>
            <Image
              source={{
                uri: item.attachmentId
                  ? getFile + item.attachmentId
                  : "https://img.freepik.com/free-photo/gray-stone-background_24972-1659.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1719878400&semt=ais_user",
              }} // Rasmingiz manzili
              style={styles.image}
            />
            <Text style={styles.serviceDescription}>{item.description}</Text>
          </View>
        ))
      ) : (
        <Text
          style={[
            styles.subtitle,
            { textAlign: "center", color: "#fff", borderColor: "#fff" },
          ]}
        >
          Hozircha servise yo'q
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#21212E",
  },
  tabContainer: {
    flexDirection: "row",
    overflow: "scroll",
    marginVertical: 10,
    paddingLeft: 0,
    gap: 10,
    marginBottom: 25,
  },
  tabButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "#9C0A35",
    borderColor: "#9C0A35",
  },
  tabText: {
    color: "#fff",
  },
  placeholderText: {
    color: "gray",
  },
  inactiveText: {
    color: "gray",
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
    borderRadius: 5,
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
