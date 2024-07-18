import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
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

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(client)/(profile)/(profileEdit)/profileEdit'>;

const ProfileEdit = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { getMee, setGetMee } = useGetMeeStore();
  const { birthDate, attachmentId, districtId, firstName, gender, job, lastName, nickName, phoneNumber, telegram, regionId, setAttachmentId } = useProfileStore();
  const [isDisabled, setIsDisabled] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getUser(setGetMee);
    }, [])
  );

  useEffect(() => {
    setIsDisabled(false);
  }, [birthDate, attachmentId, districtId, firstName, gender, job, lastName, nickName, phoneNumber, telegram, regionId]);

  const putProfile = () => {
    const data = {
      id: getMee?.id ?? null,
      nickName: nickName ?? getMee?.nickname ?? null,
      firstName: firstName ?? getMee?.firstName ?? null,
      lastName: lastName ?? getMee?.lastName ?? null,
      phoneNumber: phoneNumber ?? getMee?.phoneNumber ?? null,
      birthDate: birthDate ?? getMee?.birthDate ?? null,
      gender: gender ?? getMee?.gender ?? true,
      telegram: telegram ?? getMee?.telegram ?? null,
      districtId: districtId ?? getMee?.districtId ?? 0,
      attachmentId: attachmentId ?? getMee?.attachmentId ?? null,
      job: job ?? getMee?.job ?? null
    };
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name="Личные данные" />
      <ScrollView>
        <View style={{ marginBottom: 16 }}>
          <ProfileImgUpload
            setAttachmentId={setAttachmentId}
            attachmentID={getMee?.attachmentId ?? null}
            editPin={true}
          />
          <ProfileScreen />
          <Text style={styles.genderText}>Ваш пол</Text>
          <SelectGender />
        </View>
      </ScrollView>
      <View>
        <Buttons onPress={putProfile} isDisebled={isDisabled} title="Сохранить" />
      </View>
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
