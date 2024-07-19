import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import ProfileImgUpload from "@/components/profile-img-upload";
import { useFocusEffect, useNavigation } from "expo-router";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import SelectGender from "./selectGender";
import ProfileScreen from "./profileScreen";
import Buttons from "@/components/(buttons)/button";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import useProfileStore from "@/helpers/state_managment/client/clientEditStore";
import { updateClientProfile } from "@/helpers/api-function/client/clientPage";

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(client)/(profile)/(profileEdit)/profileEdit"
>;

const ProfileEdit = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { getMee, setGetMee } = useGetMeeStore();
  const {
    birthDate,
    attachmentId,
    districtId,
    firstName,
    gender,
    job,
    lastName,
    nickName,
    phoneNumber,
    telegram,
    regionId,
    setAttachmentId,
  } = useProfileStore();
  const [isDisabled, setIsDisabled] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUser(setGetMee);
      return () => {};
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      setIsDisabled(true);
    }, [
      birthDate,
      attachmentId,
      districtId,
      firstName,
      gender,
      job,
      lastName,
      nickName,
      phoneNumber,
      telegram,
      regionId,
    ])
  );

  const putPofile = () => {
    const data = {
      id: getMee && getMee.id ? getMee.id : null,
      nickName: nickName
        ? nickName
        : getMee && getMee.nickname
        ? getMee.nickname
        : null,
      firstName: firstName
        ? firstName
        : getMee && getMee.firstName
        ? getMee.firstName
        : null,
      lastName: lastName
        ? lastName
        : getMee && getMee.lastName
        ? getMee.lastName
        : null,
      phoneNumber: phoneNumber
        ? phoneNumber
        : getMee && getMee.phoneNumber
        ? getMee.phoneNumber
        : null,
      birthDate: birthDate
        ? birthDate
        : getMee && getMee.birthDate
        ? getMee.birthDate
        : null,
      gender: gender ? gender : true,
      telegram: telegram
        ? telegram
        : getMee && getMee.telegram
        ? getMee.telegram
        : null,
      districtId: districtId
        ? districtId
        : getMee && getMee.districtId
        ? getMee.districtId
        : 0,
      attachmentId: attachmentId
        ? attachmentId
        : getMee && getMee.attachmentId
        ? getMee.attachmentId
        : null,
      job: job ? job : getMee && getMee.job ? getMee.job : null,
    };
    console.log(data);
    
    updateClientProfile(data, () => navigation.goBack(), () => getUser(setGetMee));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name="Личные данные" />
      <ScrollView>
        <View style={{ marginBottom: 16 }}>
          <ProfileImgUpload
            setAttachmentId={setAttachmentId}
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
      <View></View>
      <Buttons onPress={() => putPofile()} title="Сохранить" />
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
    color: "#fff",
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "500",
  },
});
