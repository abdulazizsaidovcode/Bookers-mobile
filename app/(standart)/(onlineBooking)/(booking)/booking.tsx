import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router, useNavigation } from "expo-router";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import { SelectList } from "react-native-dropdown-select-list";
import axios from "axios";
import { base_url } from "@/helpers/api";
import SwitchWithLabel from "@/components/switchWithLabel/switchWithLabel";
import {
  GetOnlineBookingSettingsUrgently,
  onlineBookingSettingsUrgently,
} from "@/helpers/api-function/onlineBooking/onlineBooking";
import {
  OnlineBookingSettingsUrgentlyStory,
} from "@/helpers/state_managment/onlinBooking/onlineBooking";
import { getConfig } from "@/app/(tabs)/main";
import isRegister from "@/helpers/state_managment/isRegister/isRegister";

const Booking = () => {
  const { Urgently, setUrgentlyt } = OnlineBookingSettingsUrgentlyStory();
  const [salonId, setSalonId] = useState("");
  const [isEnabled, setIsEnabled] = useState(Urgently);
  const [data, setData] = useState([]);
  const navigation = useNavigation<any>();
  // const { isRegtered } = isRegister();
  // const { setBreack } = OnlineBookingCheck();
  // setBreack(isRegister);

  const getData = async () => {
    try {
      const config = await getConfig();
      const { data } = await axios.get(`${base_url}order-days/master`, config);
      setData(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const addOnlineBook = async () => {
    try {
      const config = await getConfig();
      await axios.post(
        `${base_url}online-booking-settings/record-duration/day`,
        { day: salonId },
        config
      );

      // setBreack(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(isEnabled);

    GetOnlineBookingSettingsUrgently(setUrgentlyt);
  }, [setUrgentlyt]);

  const toggleSwitch = () => {
    let newUrgently = !isEnabled;
    onlineBookingSettingsUrgently(newUrgently);
    setIsEnabled((previousState) => !previousState);
    console.log(Urgently);

    GetOnlineBookingSettingsUrgently(setUrgentlyt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
      <NavigationMenu name={`Онлайн бронирование`} />
      <View style={styles.innerContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.horizontalScrollContent}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.activeTab}>По дням</Text>
              </TouchableOpacity>
            </ScrollView>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Длительность записи</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                Настройте период в который запись к вам будет доступна заранее
              </Text>
            </View>
            <SelectList
              boxStyles={styles.selectListBox}
              inputStyles={styles.selectListInput}
              dropdownStyles={styles.selectListDropdown}
              dropdownTextStyles={styles.selectListDropdownText}
              setSelected={(val: string) => setSalonId(val)}
              data={data.map((item, i) => ({ key: i, value: `${item} day` }))}
              save="key"
              search={false}
            />
            <SwitchWithLabel
              label="Без срочно"
              value={isEnabled}
              onToggle={toggleSwitch}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Buttons
              isDisebled={!!salonId}
              title="Сохранить"
              onPress={addOnlineBook}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 6,
    backgroundColor: "#21212E",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#21212E",
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "#21212E",
  },
  horizontalScrollContent: {
    gap: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  activeTab: {
    backgroundColor: "#9C0A35",
    borderRadius: 8,
    padding: 8,
    color: "#fff",
  },
  labelContainer: {
    marginBottom: 3,
  },
  labelText: {
    color: "#fff",
    fontSize: 18,
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  descriptionText: {
    color: "#aaa",
  },
  selectListBox: {
    width: "100%",
    backgroundColor: "#4B4B64",
  },
  selectListInput: {
    color: "#fff",
    fontSize: 18,
  },
  selectListDropdown: {
    backgroundColor: "#4B4B64",
  },
  selectListDropdownText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    marginBottom: 5,
    backgroundColor: "#21212E",
  },
});

export default Booking;
