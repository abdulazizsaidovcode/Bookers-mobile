import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import ProfileImgUpload from "@/components/profile-img-upload";
import { useFocusEffect } from "expo-router";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import SelectGender from "./selectGender";



const ProfileEdit = () => {
  const { getMee } = useGetMeeStore();

  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, [])
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name="История сеансов" />
      <View style={{ padding: 16 }}>
        <ProfileImgUpload
          attachmentID={
            getMee && getMee.attachmentId ? getMee.attachmentId : null
          }
          editPin={true}
        />

        <SelectGender/>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
  },
  
});
