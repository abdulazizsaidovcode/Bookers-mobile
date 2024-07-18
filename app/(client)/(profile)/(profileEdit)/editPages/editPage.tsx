import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import useProfileStore from "@/helpers/state_managment/client/clientEditStore";
import { TextInput } from "react-native-paper";
import Buttons from "@/components/(buttons)/button";

const EditProfilePage = () => {
  const { routeName } = useProfileStore();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu
        name={`${routeName && routeName.value ? routeName.value : "Edit"}`}
      />
      {routeName && routeName.id === 1 ? (
        // Nickname edit qismi
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Придумайте свой</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
            <Text style={styles.description}>
              Будем использовать вместо вашего имени
            </Text>
          </View>
          <View>
            <Buttons onPress={() => {}} title="Сохранить" />
          </View>
        </View>
      ) : routeName && routeName.id === 2 ? (
        // Ism Familiya edit qismi
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Введите свое имя и фамилию</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
              
            </View>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
              
            </View>
          </View>
          <View>
            <Buttons onPress={() => {}} title="Сохранить" />
          </View>
        </View>
      ) : routeName && routeName.id === 3 ? (
        // Job edit qismi
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Придумайте свой</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
            <Text style={styles.description}>
              Будем использовать вместо вашего имени
            </Text>
          </View>
          <View>
            <Buttons onPress={() => {}} title="Сохранить" />
          </View>
        </View>
      ) : routeName && routeName.id === 4 ? (
        // PhoneNumber edit qismi
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Придумайте свой</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
            <Text style={styles.description}>
              Будем использовать вместо вашего имени
            </Text>
          </View>
          <View>
            <Buttons onPress={() => {}} title="Сохранить" />
          </View>
        </View>
      ) : routeName && routeName.id === 5 ? (
        // City edit qismi
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Придумайте свой</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
            <Text style={styles.description}>
              Будем использовать вместо вашего имени
            </Text>
          </View>
          <View>
            <Buttons onPress={() => {}} title="Сохранить" />
          </View>
        </View>
      ) : routeName && routeName.id === 6 ? (
        // telegram edit qismi
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Придумайте свой</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
            <Text style={styles.description}>
              Будем использовать вместо вашего имени
            </Text>
          </View>
          <View>
            <Buttons onPress={() => {}} title="Сохранить" />
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#21212E",
  },
  containerIn: {
    flex: 1,
    justifyContent: "space-between",
  },
  formGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#4B4B64",
    borderRadius: 8,
  },
  label: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 15,
  },
  description: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "400",
    marginVertical: 7,
  },
});
