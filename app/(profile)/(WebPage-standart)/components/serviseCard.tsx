import { getFile } from "@/helpers/api";
import { getAddress } from "@/helpers/api-function/wepPage/wepPage";
import webPageStore from "@/helpers/state_managment/wepPage/wepPage";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const UserProfileCardEdit: React.FC = () => {
  const { getme, specialization, setAddress, address } = webPageStore();

  useFocusEffect(

    useCallback(() => {
      getAddress(setAddress)
      return () => {}
    }, [])
  )


  // Function to generate star rating
  const generateStars = (count: number) => {
    let stars = '';
    for (let i = 0; i < count; i++) {
      stars += '★';
    }
    for (let i = count; i < 5; i++) {
      stars += '☆';
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{
            uri: getme
              ? getme.attachmentId
                ? getFile + getme.attachmentId
                : "https://static.thenounproject.com/png/363639-200.png"
              : "noData"
          }} // Profil rasm manzili
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <View style={styles.headerInfoin}>
            <Text style={styles.name}>
              {getme && getme.firstName ? getme.firstName : "No data"}
            </Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Beauty Wave</Text>
            </View>
          </View>
          <Text style={styles.role}>
            {getme && getme.gender
              ? getme.gender === "MALE"
                ? "Erkak master"
                : getme.gender === "FEMALE"
                ? "Женский мастер"
                : ""
              : "No data"}
          </Text>
          <Text style={styles.phone}>
            {getme && getme.phoneNumber ? getme.phoneNumber : "No data"}
          </Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.stars}>
            {getme && getme.starCount ? generateStars(getme.starCount) : generateStars(0)}
          </Text>
          <Text style={styles.orderInfo}>
            {getme && getme.orderCount ? getme.orderCount : "No data"} заказа,{" "}
            {getme && getme.clientCount ? getme.clientCount : "No data"} клиентов
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.buttons}>
          {
            specialization ? specialization.map((item: any) => 
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity>
            ) : 
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Malumot topilmadi</Text>
          </TouchableOpacity>

          } 
        </View>
        <Text style={styles.address}>{(address.homeNumber && address.street) ? `Street: ${address.street}, home: ${address.homeNumber} ` : "Address is not found"}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#B9B9C9",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  headerInfoin: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  tag: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#828282",
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginTop: 2,
  },
  tagText: {
    color: "#4F4F4F",
    fontSize: 11,
  },
  rating: {
    alignItems: "flex-end",
  },
  stars: {
    color: "red",
    fontSize: 20,
  },
  orderInfo: {
    color: "#4F4F4F",
    fontSize: 10,
  },
  body: {
    marginTop: 15,
  },
  role: {
    color: "#4F4F4F",
    fontSize: 13,
    marginBottom: 5,
  },
  phone: {
    color: "#4F4F4F",
    fontSize: 13,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  button: {
    borderWidth: 1,
    borderColor: "#828282",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#4F4F4F",
    fontSize: 14,
  },
  address: {
    color: "#4F4F4F",
    fontSize: 14,
  },
});

export default UserProfileCardEdit;
