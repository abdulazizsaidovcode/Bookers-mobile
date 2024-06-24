import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import NotificationCard from "./card/index";
import axios from "axios";
import { config } from "@/helpers/token";
import { base_url } from "@/helpers/api";
import tw from "tailwind-react-native-classnames";

const Notification: React.FC = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);

  const getNotification = async () => {
    try {
      const { data } = await axios.get(`${base_url}notification`, config);
      if (data.succsess === true) setNotifications(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.padding}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Уведомления</Text>
          <TouchableOpacity>
            <FontAwesome name="trash" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {notifications.length === 0 && (
          <Text style={tw`text-2xl text-center text-white mt-10`}>
            Данные недоступны :(
          </Text>
        )}
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationCard item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
    padding: 16,
  },
  padding: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Notification;
