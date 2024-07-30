import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { useFocusEffect, useNavigation } from "expo-router";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import ProfileScreen from "./profileScreen";
import Buttons from "@/components/(buttons)/button";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import useProfileStore from "@/helpers/state_managment/client/clientEditStore";
import {
  updateClientProfile,
  updateMasterProfile,
} from "@/helpers/api-function/client/clientPage";
import SelectMasterGender from "./selectGender";
import ProfileImgUploadProfile from "@/components/profile-img-upload";
import { Loading } from "@/components/loading/loading";

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(profile)/(settings)/(childSettings)/(profileEdit)/profileEdit"
>;

const ProfileMasterEdit = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { getMee, setGetMee, isLoading, setIsLoading } = useGetMeeStore();
  const {
    birthDate,
    attachmentId,
    districtId,
    firstName,
    gender1,
    job,
    ageId,
    lastName,
    nickName,
    phoneNumber,
    telegram,
    instagram,
    regionId,
    setAttachmentId,
    setProfile,
  } = useProfileStore();
  const [isDisabled, setIsDisabled] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getUser(setGetMee, setIsLoading);
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
      gender1,
      job,
      lastName,
      nickName,
      phoneNumber,
      telegram,
      regionId,
    ])
  );
  const clearStore = () => {
    setProfile({
      nickName: null,
      firstName: null,
      lastName: null,
      birthDate: null,
      job: null,
      ageId: null,
      phoneNumber: null,
      regionId: null,
      districtId: 1,
      telegram: null,
      gender: true,
      attachmentId: null,
      distiricyIdData: null,
      regionIdData: null,
    });
  };

  const putPofile = () => {
    const data = {
      nickName: nickName
        ? nickName
        : getMee && getMee.nickName
        ? getMee.nickName
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
      ageId: ageId ? ageId : getMee && getMee.ageId ? getMee.ageId : null,
      gender: gender1 ? gender1 : "MALE",
      telegram: telegram
        ? telegram
        : getMee && getMee.telegram
        ? getMee.telegram
        : null,
      instagram: instagram
        ? instagram
        : getMee && getMee.instagram
        ? getMee.instagram
        : null,
      regionId: regionId
        ? regionId
        : getMee && getMee.regionId
        ? getMee.regionId
        : 0,
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
      // job: job ? job : getMee && getMee.job ? getMee.job : null,
      starCount: 0,
      clientCount: 0,
      orderCount: 0,
      birthDate: null,
    };

    updateMasterProfile(
      data,
      () => navigation.goBack(),
      () => getUser(setGetMee),
      () => clearStore(),
      setIsLoading
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#21212E" />
          <View style={{ paddingLeft: 10 }}>
            <NavigationMenu name="Личные данные" />
          </View>
          <ScrollView>
            <View style={{ marginBottom: 16, padding: 16 }}>
              <ProfileImgUploadProfile
                setAttachmentId={setAttachmentId}
                attachmentID={
                  getMee && getMee.attachmentId ? getMee.attachmentId : null
                }
                editPin={true}
              />
              <ProfileScreen />
              <Text style={styles.genderText}>Ваш пол</Text>
              <SelectMasterGender />
            </View>
          </ScrollView>
          <View style={{ margin: 16 }}>
            <Buttons onPress={() => putPofile()} title="Сохранить" />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default ProfileMasterEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
  },
  genderText: {
    color: "#fff",
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "500",
  },
});
