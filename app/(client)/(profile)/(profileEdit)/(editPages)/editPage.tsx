import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import useProfileStore from "@/helpers/state_managment/client/clientEditStore";
import { TextInput } from "react-native-paper";
import Buttons from "@/components/(buttons)/button";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { useFocusEffect, useNavigation } from "expo-router";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import {
  getDistrict,
  getDistrictId,
  getRegion,
  getRegionId,
} from "@/helpers/api-function/profile/personalData";
import { SelectList } from "react-native-dropdown-select-list";
type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(client)/(profile)/(profileEdit)/(editPages)/editPage"
>;

interface InputValues {
  nickName: string;
  firstName: string;
  lastName: string;
  job: string;
  phoneNumber: string;
  telegram: string;
  regionId: number | string;
  districtId: number | string;
}

const EditProfilePage: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const {
    birthDate,
    districtId,
    firstName,
    job,
    lastName,
    nickName,
    phoneNumber,
    telegram,
    regionId,
    setShowCalendar,
    routeName,
    updateProfileField,
    setDistirictIdData,
    setRegionIdData,
  } = useProfileStore();
  const {
    getMee,
    setRegionOption,
    regionOption,
    setDistrictOption,
    districtOption,
  } = useGetMeeStore();

  const [inputValues, setInputValues] = useState<InputValues>({
    nickName: "",
    firstName: "",
    lastName: "",
    job: "",
    phoneNumber: "",
    telegram: "",
    regionId: 0,
    districtId: 0,
  });

  useEffect(() => {
    setInputValues({
      nickName: nickName || "",
      firstName: firstName || "",
      lastName: lastName || "",
      job: job || "",
      phoneNumber: phoneNumber || "",
      telegram: telegram || "",
      regionId: regionId || 0,
      districtId: districtId || 0,
    });
  }, [nickName, firstName, lastName, job, phoneNumber, telegram, regionId]);

  useFocusEffect(
    useCallback(() => {
      getRegion(setRegionOption);
      return () => {};
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (inputValues.regionId) {
        getDistrict(inputValues.regionId, setDistrictOption); // Call getDistrict when regionId changes
      }
      return () => {};
    }, [inputValues.regionId])
  );

  const getDataL = () => {
    console.log(regionId, districtId);
    
    getRegionId(
      regionId ? regionId : getMee && getMee.regionId ? getMee.regionId : "",
      setRegionIdData
    );
    getDistrictId(
      districtId
        ? districtId
        : getMee && getMee.districtId
        ? getMee.districtId
        : "",
      setDistirictIdData
    );
    console.log("ishladi");
  };

  const handleInputChange = (
    key: keyof InputValues,
    value: string | number
  ) => {
    setInputValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = () => {
    Object.keys(inputValues).forEach((key: string) => {
      const value = inputValues[key as keyof InputValues];
      if (value) {
        updateProfileField(`${key}`, value);
        navigation.navigate("(client)/(profile)/(profileEdit)/profileEdit");
      }
    });
  };

  const regionOptions =
    regionOption &&
    regionOption.map((item: any) => {
      return { key: item.id, value: item.name };
    });

  const cityOptions =
    districtOption &&
    districtOption.map((item: any) => {
      return { key: item.id, value: item.name };
    });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name={`${routeName?.value ?? "Edit"}`} />
      {routeName?.id === 1 ? (
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Придумайте свой</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.input}
                value={inputValues.nickName}
                onChangeText={(value) => handleInputChange("nickName", value)}
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
            <Buttons onPress={handleSave} title="Сохранить" />
          </View>
        </View>
      ) : routeName?.id === 2 ? (
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Введите свое имя и фамилию</Text>
            <View style={styles.formGroup}>
              <Text style={styles.labelS}>Введите свое имя</Text>
              <TextInput
                value={inputValues.firstName}
                onChangeText={(value) => handleInputChange("firstName", value)}
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.labelS}>Введите свое фамилию</Text>
              <TextInput
                value={inputValues.lastName}
                onChangeText={(value) => handleInputChange("lastName", value)}
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
          </View>
          <View>
            <Buttons onPress={handleSave} title="Сохранить" />
          </View>
        </View>
      ) : routeName?.id === 3 ? (
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Введите свою профессию</Text>
            <View style={styles.formGroup}>
              <TextInput
                value={inputValues.job}
                onChangeText={(value) => handleInputChange("job", value)}
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
          </View>
          <View>
            <Buttons onPress={handleSave} title="Сохранить" />
          </View>
        </View>
      ) : routeName?.id === 4 ? (
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Введите свой номер</Text>
            <View style={styles.formGroup}>
              <TextInput
                value={inputValues.phoneNumber}
                onChangeText={(value) =>
                  handleInputChange("phoneNumber", value)
                }
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
            <Text style={styles.description}>
              Номер телефона необходимо писать вместе с кодом страны (+998).
            </Text>
          </View>
          <View>
            <Buttons onPress={handleSave} title="Сохранить" />
          </View>
        </View>
      ) : routeName?.id === 5 ? (
        <View style={styles.containerIn}>
          <View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Регион</Text>
              <SelectList
                inputStyles={{ color: "#fff" }}
                setSelected={(value: number) => {
                  handleInputChange("regionId", value);
                  getDataL();
                }}
                data={regionOptions}
                boxStyles={styles.selectListBox}
                dropdownStyles={styles.absoluteDropdown}
                dropdownTextStyles={styles.selectListDropdownText}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Город</Text>
              <SelectList
                inputStyles={{ color: "#fff" }}
                setSelected={(value: number) => {
                  handleInputChange("districtId", value);
                  getDataL();
                }}
                data={cityOptions}
                boxStyles={styles.selectListBox}
                dropdownStyles={styles.absoluteDropdown}
                dropdownTextStyles={styles.selectListDropdownText}
                notFoundText="Data not found"
              />
            </View>
          </View>
          <View>
            <Buttons onPress={handleSave} title="Сохранить" />
          </View>
        </View>
      ) : routeName?.id === 6 ? (
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Введите ссылку на ваш телеграмм</Text>
            <View style={styles.formGroup}>
              <TextInput
                value={inputValues.telegram}
                onChangeText={(value) => handleInputChange("telegram", value)}
                style={styles.input}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
            </View>
            <Text style={styles.description}>
              По этой ссылке в Telegram клиент сможет общаться с вами через
              Telegram.
            </Text>
          </View>
          <View>
            <Buttons onPress={handleSave} title="Сохранить" />
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
  labelS: {
    color: "#ccc",
    marginBottom: 8,
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
  selectListBox: {
    backgroundColor: "#4B4B64",
    borderRadius: 8,
    padding: 12,
    borderWidth: 0,
    position: "relative",
    zIndex: 0,
  },
  selectListDropdownText: {
    color: "#fff",
  },
  absoluteDropdown: {
    position: "absolute",
    backgroundColor: "#4B4B64",
    top: "100%",
    width: "100%",
    zIndex: 100,
  },
});
