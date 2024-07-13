import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { getFile } from "@/helpers/api";
import {
  formatPhoneNumber,
  getAge,
  getAgeId,
  getDistrict,
  getDistrictId,
  getRegion,
  getRegionId,
  putPersonalData,
} from "@/helpers/api-function/profile/personalData";
import { useFocusEffect, useNavigation } from "expo-router";

const EditProfile: React.FC = () => {
  const {
    getMee,
    setGetMee,
    ageOption,
    setAgeOption,
    setRegionOption,
    regionOption,
    setDistrictOption,
    districtOption,
  } = useGetMeeStore();

  const navigation = useNavigation();

  const genderOptions = [
    { key: "FEMALE", value: "Женский" },
    { key: "MALE", value: "Мужской" },
  ];
  
  
  const [name, setName] = useState<any>(getMee?.firstName);
  const [surname, setSurname] = useState<any>(getMee?.lastName);
  const [phone, setPhone] = useState<any>(formatPhoneNumber(getMee.phoneNumber));
  const [nickname, setNickname] = useState<any>(getMee.nickname);
  const [gender, setGender] = useState<any>(null);
  const [age, setAge] = useState<any | null>(null);
  const [region, setRegion] = useState<any | null>(null);
  const [city, setCity] = useState<any>(null);
  const [telegram, setTelegram] = useState<any | null>(
    getMee.telegram
  );
  const [instagram, setInstagram] = useState<any | null>(
    getMee.instagram
  );

  useFocusEffect(
    useCallback(() => {
      getUser(setGetMee);
      if (getMee.ageId) getAgeId(getMee.ageId, setAge);
      getAge(setAgeOption);
      getRegion(setRegionOption);
      return () => {}
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      if (region) {
        getDistrict( region, setDistrictOption); // Call getDistrict when region changes
      }
      return () => {}
    }, [region])
  )

  useFocusEffect(
    useCallback(() => {
      if (getMee.regionId) {
        getRegionId( getMee.regionId,setRegion); // Set region based on getMee.regionId
        if (getMee.districtId) {
          getDistrictId( getMee.districtId, setCity); // Set city based on getMee.districtId
        }
      }
      setName(getMee?.firstName)
      setSurname(getMee?.lastName)
      setGender(getMee?.gender)
      setPhone(formatPhoneNumber(getMee.phoneNumber))
      setNickname(getMee?.nickname)
      setTelegram(getMee?.telegram)
      setInstagram(getMee?.instagram)
      return () => {}
    }, [getMee])
  )

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

  const handleSave = () => {
    const sanitizeValue = (value: any) => {
      return value === 0 || value === "" || value === undefined || value === null
        ? null
        : value;
    };

    putPersonalData({
      setAge: sanitizeValue(age?.key),
      setCity: sanitizeValue(city),
      setGender: sanitizeValue(gender),
      setName: sanitizeValue(name),
      setPhone: sanitizeValue(phone) !== null ? `+998${sanitizeValue(phone)}` : null,
      setRegion: sanitizeValue(region),
      setSurname: sanitizeValue(surname),
      setInstagram: sanitizeValue(instagram),
      setNickname: sanitizeValue(nickname),
      setTelegram: sanitizeValue(telegram),
      birthdate: getMee.birthDate ? getMee.birthDate : null,
      navigate: () => navigation.goBack()
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <NavigationMenu name="Мой профиль" />

        <View style={styles.profileContainer}>
          <Image
            source={
              getMee.attachmentId
                ? { uri: getFile + getMee.attachmentId }
                : require("@/assets/avatar.png")
            }
            style={styles.avatar}
          />
          <View>
            <Text style={styles.profileName}>
              {getMee.firstName} {getMee.lastName}
            </Text>
            <Text style={styles.profilePhone}>{getMee.phoneNumber}</Text>
            <Text style={styles.profileUsername}>{getMee.nickname}</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Имя</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Фамилия</Text>
          <TextInput
            style={styles.input}
            value={surname}
            onChangeText={setSurname}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Номер телефона</Text>
          <View style={styles.phoneContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+998</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nickname</Text>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Пол</Text>
          <SelectList
            inputStyles={{ color: "#fff" }}
            setSelected={setGender}
            data={genderOptions}
            defaultOption={
              genderOptions.find((option) => option.key === getMee.gender)
            }
            boxStyles={styles.selectListBox}
            dropdownStyles={styles.absoluteDropdown}
            dropdownTextStyles={styles.selectListDropdownText}
          />

        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Возраст</Text>
          <SelectList
            inputStyles={{ color: "#fff" }}
            setSelected={setAge}
            data={ageOption ? ageOption.map((item: any) => {
              return { key: item.id, value: item.ageRange };
            }) : []}
            defaultOption={
              ageOption && ageOption.map((item: any) => {
                return { key: item.id, value: item.ageRange };
              }).find((option) => option.key === getMee.ageId)
            }
            boxStyles={styles.selectListBox}
            dropdownStyles={styles.absoluteDropdown}
            dropdownTextStyles={styles.selectListDropdownText}
            notFoundText="Data not found"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Регион</Text>
          <SelectList
            inputStyles={{ color: "#fff" }}
            setSelected={setRegion}
            data={regionOptions}
            defaultOption={
              regionOptions &&
              regionOptions.find((option) => option.key === getMee.regionId)
            }
            boxStyles={styles.selectListBox}
            dropdownStyles={styles.absoluteDropdown}
            dropdownTextStyles={styles.selectListDropdownText}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Город</Text>
          <SelectList
            inputStyles={{ color: "#fff" }}
            setSelected={setCity}
            data={cityOptions}
            defaultOption={
              cityOptions &&
              cityOptions.find((option) => option.key === getMee.cityId)
            }
            boxStyles={styles.selectListBox}
            dropdownStyles={styles.absoluteDropdown}
            dropdownTextStyles={styles.selectListDropdownText}
            notFoundText="Data not found"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Telegram</Text>
          <TextInput
            style={styles.input}
            placeholder="Your telegram url"
            value={telegram || ""}
            onChangeText={setTelegram}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Instagram</Text>
          <TextInput
            style={styles.input}
            placeholder="Your instagram url"
            value={instagram || ""}
            onChangeText={setInstagram}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
  },
  scrollContainer: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#b9b9c9",
    padding: 16,
    borderRadius: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileName: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  profilePhone: {
    color: "#555",
  },
  profileUsername: {
    color: "#555",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#ccc",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#4B4B64",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryCode: {
    backgroundColor: "#4B4B64",
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  countryCodeText: {
    color: "#fff",
  },
  phoneInput: {
    flex: 1,
    backgroundColor: "#4B4B64",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  saveButton: {
    backgroundColor: "#9c0935",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
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

export default EditProfile;
