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
import PhoneInput from "react-native-phone-number-input";

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

  const [errors, setErrors] = useState<{ [key in keyof InputValues]?: string }>(
    {}
  );
  const [showDistrictSelect, setShowDistrictSelect] = useState<boolean>(false);
  const phoneInputRef = React.useRef<PhoneInput>(null);

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
        getDistrict(inputValues.regionId, setDistrictOption);
      }
      return () => {};
    }, [inputValues.regionId])
  );

  const getDataL = () => {
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
  };

  const handleInputChange = (
    key: keyof InputValues,
    value: string | number
  ) => {
    setInputValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    // Show district select if region is selected
    if (key === "regionId" && value) {
      setShowDistrictSelect(true);
    }
  };

  const validateInput = () => {
    let valid = true;
    let newErrors: { [key in keyof InputValues]?: string } = {};
    if (routeName?.id === 1) {
      if (!inputValues.nickName.trim()) {
        newErrors.nickName = "This field is required.";
        valid = false;
      } else if (inputValues.nickName.trim().length < 4) {
        newErrors.nickName = "Must be at least 4 characters.";
        valid = false;
      }
    } else if (routeName?.id === 2) {
      if (!inputValues.firstName.trim()) {
        newErrors.firstName = "This field is required.";
        valid = false;
      } else if (inputValues.firstName.trim().length < 3) {
        newErrors.firstName = "Must be at least 3 characters.";
        valid = false;
      } else if (inputValues.firstName.trim().length > 30) {
        newErrors.firstName = "Must be less than 30 characters.";
        valid = false;
      }

      if (!inputValues.lastName.trim()) {
        newErrors.lastName = "This field is required.";
        valid = false;
      } else if (inputValues.lastName.trim().length < 5) {
        newErrors.lastName = "Must be at least 5 characters.";
        valid = false;
      } else if (inputValues.lastName.trim().length > 30) {
        newErrors.lastName = "Must be less than 30 characters.";
        valid = false;
      }
    } else if (routeName?.id === 3) {
      if (!inputValues.job.trim()) {
        newErrors.job = "This field is required.";
        valid = false;
      } else if (inputValues.job.trim().length < 1) {
        newErrors.job = "Must be at least 1 character.";
        valid = false;
      } else if (inputValues.job.trim().length > 30) {
        newErrors.job = "Must be less than 30 characters.";
        valid = false;
      }
    } else if (routeName?.id === 5) {
      // Check if region is selected
      if (!inputValues.regionId) {
        newErrors.regionId = "This field is required.";
        valid = false;
      }

      // Check if district is selected when region is selected
      if (inputValues.regionId && !inputValues.districtId) {
        newErrors.districtId = "This field is required.";
        valid = false;
      }
    } else if (routeName?.id === 6) {
      if (!inputValues.telegram.trim()) {
        newErrors.telegram = "This field is required.";
        valid = false;
      } else if (inputValues.telegram.trim().length > 30) {
        newErrors.telegram = "Must be less than 30 characters.";
        valid = false;
      }
    } else if (routeName?.id === 4) {
      if (!inputValues.phoneNumber.trim()) {
        newErrors.phoneNumber = "This field is required.";
        valid = false;
      } else if (inputValues.phoneNumber.trim().length < 9) {
        newErrors.phoneNumber = "Invalid phone number.";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validateInput()) return;

    Object.keys(inputValues).forEach((key: string) => {
      const value = inputValues[key as keyof InputValues];
      if (value) {
        updateProfileField(`${key}`, value);
      }
    });
    navigation.navigate("(client)/(profile)/(profileEdit)/profileEdit");
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
      <View style={{ paddingLeft: 10 }}>
      <NavigationMenu name={`${routeName?.value ?? "Edit"}`} />
      </View>
      {routeName?.id === 1 ? (
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Придумайте свой</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={[
                  styles.input,
                  errors.nickName ? styles.inputError : null,
                ]}
                value={inputValues.nickName}
                onChangeText={(value) => handleInputChange("nickName", value)}
                maxLength={20}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
              {errors.nickName && (
                <Text style={styles.errorText}>{errors.nickName}</Text>
              )}
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
                style={[
                  styles.input,
                  errors.firstName ? styles.inputError : null,
                ]}
                value={inputValues.firstName}
                onChangeText={(value) =>
                  handleInputChange("firstName", value)
                }
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
            </View>
            <View style={styles.formGroup}>
            <Text style={styles.labelS}>Введите свое фамилию</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.lastName ? styles.inputError : null,
                ]}
                value={inputValues.lastName}
                onChangeText={(value) => handleInputChange("lastName", value)}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
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
                style={[styles.input, errors.job ? styles.inputError : null]}
                value={inputValues.job}
                onChangeText={(value) => handleInputChange("job", value)}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
              {errors.job && (
                <Text style={styles.errorText}>{errors.job}</Text>
              )}
            </View>
          </View>
          <View>
            <Buttons onPress={handleSave} title="Сохранить" />
          </View>
        </View>
      ) : routeName?.id === 4 ? (
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Укажите номер телефона</Text>
            <View style={styles.formGroup}>
              <PhoneInput
                ref={phoneInputRef}
                defaultValue={inputValues.phoneNumber}
                defaultCode="UZ"
                layout="first"
                containerStyle={[
                  styles.phoneInput,
                  { borderColor: errors.phoneNumber ? "red" : "#9C0A35" },
                ]}
                textContainerStyle={{ backgroundColor: "#4B4B64", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                textInputStyle={{ color: "white", backgroundColor: "#4B4B64" }}
                codeTextStyle={{ color: "white" }}
                onChangeFormattedText={(value) =>
                  handleInputChange("phoneNumber", value)
                }
                withShadow
                autoFocus
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>
            <Text style={styles.description}>
            Будьте осторожны, пока телефон не поменяет номер! При следующем входе в систему на ваш новый номер будет отправлено SMS.
            </Text>
          </View>
          <View>
            <Buttons onPress={handleSave} title="Сохранить" />
          </View>
        </View>
      ) : routeName?.id === 5 ? (
        <View style={styles.containerIn}>
          <View>

          
          <View>
            <Text style={styles.label}>Выберите регион</Text>
            <View style={styles.formGroup}>
              <SelectList
                setSelected={(value: number) => handleInputChange("regionId", value)}
                data={regionOptions}
                save="key"
                search={false}
                boxStyles={{
                  borderColor: errors.regionId ? "red" : "white",
                  backgroundColor: "#4B4B64"
                }}
                dropdownStyles={styles.dropdown}
                dropdownItemStyles={styles.dropdownItem}
                dropdownTextStyles={styles.dropdownText}
                inputStyles={styles.inputText}
                placeholder="Выберите регион"
              />
              {errors.regionId && (
                <Text style={styles.errorText}>{errors.regionId}</Text>
              )}
            </View>
          </View>
          {showDistrictSelect && (
            <View>
              <Text style={styles.label}>Выберите район</Text>
              <View style={styles.formGroup}>
                <SelectList
                  setSelected={(value: number) =>
                    handleInputChange("districtId", value)
                  }
                  data={cityOptions}
                  save="key"
                  search={false}
                  boxStyles={{
                    borderColor: errors.districtId ? "red" : "white",
                  backgroundColor: "#4B4B64"
                  }}
                  dropdownStyles={styles.dropdown}
                  dropdownItemStyles={styles.dropdownItem}
                  dropdownTextStyles={styles.dropdownText}
                  inputStyles={styles.inputText}
                  placeholder="Выберите район"
                />
                {errors.districtId && (
                  <Text style={styles.errorText}>{errors.districtId}</Text>
                )}
              </View>
            </View>
          )}
          </View>
          <View>
            <Buttons onPress={handleSave} title="Сохранить" />
          </View>
        </View>
      ) : routeName?.id === 6 ? (
        <View style={styles.containerIn}>
          <View>
            <Text style={styles.label}>Введите свой telegram username</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={[
                  styles.input,
                  errors.telegram ? styles.inputError : null,
                ]}
                value={inputValues.telegram}
                onChangeText={(value) => handleInputChange("telegram", value)}
                textColor="white"
                cursorColor="#9C0A35"
                activeUnderlineColor="#9C0A35"
              />
              {errors.telegram && (
                <Text style={styles.errorText}>{errors.telegram}</Text>
              )}
              <Text style={styles.description}>
              По этой ссылке в Telegram клиент сможет общаться с вами через
              Telegram.
            </Text>
            </View>
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
    backgroundColor: "#21212E",
  },
  containerIn: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  labelS: {
    color: "#ccc",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "grey",
    marginTop: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#4B4B64",
    color: "white",
    borderWidth: 1,
    borderColor: "#4B4B64",
    borderRadius: 7
  },
  inputError: {
    borderColor: "red",
  },
  phoneInput:{
    width: "100%",
    borderRadius: 10
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  dropdown: {
    backgroundColor: "#4B4B64",
    borderColor: "white",
  },
  dropdownItem: {
    backgroundColor: "#4B4B64",
  },
  dropdownText: {
    color: "white",
  },
  inputText: {
    color: "white",
  },
});
