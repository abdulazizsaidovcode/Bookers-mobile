import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { getFile } from "@/helpers/api";
import {
  getAge,
  getAgeId,
  getDistrictId,
  getRegion,
  putPersonalData,
} from "@/helpers/api-function/profile/personalData";
import { AgeData } from "@/type/client/client";

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
  const [name, setName] = useState<string>(getMee.firstName);
  const [surname, setSurname] = useState<string>(getMee.lastName);
  const [phone, setPhone] = useState<string>(getMee.phoneNumber);
  const [nickname, setNickname] = useState<string>(getMee.nickname);
  const [gender, setGender] = useState<any>(null);
  const [age, setAge] = useState<any | null>(null);
  const [region, setRegion] = useState<any | null>(null);
  const [city, setCity] = useState<any>(null);
  const [telegram, setTelegram] = useState<string | null>(
    getMee.telegram ? getMee.telegram : null
  );
  const [instagram, setInstagram] = useState<string | null>(
    getMee.instagram ? getMee.instagram : null
  );

  useEffect(() => {
    getUser(setGetMee);
    getAgeId(getMee.ageId, setAge);
    getAge(setAgeOption);
    getRegion(setRegionOption);
  }, []);

  const genderOptions = [
    { key: "FEMALE", value: "Женский" },
    { key: "MALE", value: "Мужской" },
  ];

  const ageOptions =
    ageOption &&
    ageOption.map((item: any) => {
      return { key: item.id, value: item.ageRange };
    });

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
              {getMee.firstName}
              {getMee.lastName}
            </Text>
            <Text style={styles.profilePhone}>{getMee.phoneNumber}</Text>
            <Text style={styles.profileUsername}>{getMee.nickname}</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Имя</Text>
          <TextInput
            style={styles.input}
            value={name ? name : ""}
            onChangeText={setName}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Фамилия</Text>
          <TextInput
            style={styles.input}
            value={surname ? surname : ""}
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
              value={phone ? phone : ""}
              onChangeText={setPhone}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nickname</Text>
          <TextInput
            style={styles.input}
            value={nickname ? nickname : ""}
            onChangeText={setNickname}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Пол</Text>
          <SelectList
            inputStyles={{ color: "#fff" }}
            setSelected={setGender}
            data={genderOptions}
            defaultOption={{ key: `${gender.key}`, value: gender.value}}
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
            data={ageOptions}
            defaultOption={{ key: age.id, value: age.value }}
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
            defaultOption={{ key: region.id, value: region.name }}
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
            defaultOption={{ key: city.id, value: city.name }}
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
            value={telegram ? telegram : ""}
            onChangeText={setTelegram}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Instagram</Text>
          <TextInput
            style={styles.input}
            placeholder="Your telegram url"
            value={instagram ? instagram : ""}
            onChangeText={setInstagram}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            putPersonalData({
              setAge: age.key, // Assuming age.value is the actual value you want to pass
              setCity: city.key, // Assuming city.value is the actual value you want to pass
              setGender: gender,
              setName: name,
              setPhone: phone,
              setRegion: region.key, // Assuming region.value is the actual value you want to pass
              setSurname: surname,
              setInstagram: instagram,
              setNickname: nickname,
              setTelegram: telegram,
            });
          }}
        >
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
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
    justifyContent: "center",
  },
  inputText: {
    color: "#fff",
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
