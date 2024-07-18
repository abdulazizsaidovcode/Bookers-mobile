import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import ProfileImgUpload from "@/components/profile-img-upload";
import { useFocusEffect } from "expo-router";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import SelectGender from "./selectGender";
import ProfileScreen from "./profileScreen";
import Buttons from "@/components/(buttons)/button";
import { getUser } from "@/helpers/api-function/getMe/getMee";

const ProfileEdit = () => {
  const { getMee, setGetMee } = useGetMeeStore();

  useFocusEffect(
    useCallback(() => {
      getUser(setGetMee)
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name="История сеансов" />
      <ScrollView>
        <View style={{ marginBottom: 16 }}>
          <ProfileImgUpload
            attachmentID={
              getMee && getMee.attachmentId ? getMee.attachmentId : null
            }
            editPin={true}
          />
          <ProfileScreen />
          <Text style={styles.genderText}>Ваш пол</Text>
          <SelectGender />
        </View>
      </ScrollView>
      <View>
      </View>
        <Buttons title="Title"/>
    </SafeAreaView>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#21212E",
  },
  genderText: {
    color:"#fff",
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "500"
  }
});
