import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import NotificationSelect from "@/helpers/state_managment/notification";

const NotificationCard: React.FC<{ item: any }> = ({ item }) => {
  const { onOpen, setNotification } = NotificationSelect();

  const handleClick = () => {
    onOpen();
    setNotification(item);
  };

  return (
    <Pressable onLongPress={handleClick} style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} /> 
      <View style={styles.cardContent}>
        <Text style={styles.title}>
          {item.title === null ? "Untitled" : item.title}
        </Text>
        <Text style={styles.message}>{item.content.slice(0, 100)}</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={styles.time}>
            {item.createAt}
          </Text>
        </View>
      </View>
      <View style={styles.link}>
        <FontAwesome name="chevron-right" size={20} color="#9C0A35" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#B9B9C9",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
  message: {
    color: "#4F4F4F",
    marginTop: 4,
  },
  time: {
    color: "#888",
    marginTop: 8,
    fontSize: 12,
  },
  link: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default NotificationCard;
