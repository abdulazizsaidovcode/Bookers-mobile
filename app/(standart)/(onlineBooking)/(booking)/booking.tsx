import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useFocusEffect, useNavigation } from "expo-router";
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
import { getConfig } from "@/app/(tabs)/(master)/main";
import Toast from "react-native-simple-toast";
import clientStore from "@/helpers/state_managment/client/clientStore";

const Booking = () => {
  const {tariff} = clientStore()
  const { Urgently, setUrgentlyt, salonId, setSalonId } = OnlineBookingSettingsUrgentlyStory();
  const [isEnabled, setIsEnabled] = useState(false);
  const [data, setData] = useState([]);
  const navigation = useNavigation<any>();
  

  useFocusEffect(
    useCallback(() => {
      setIsEnabled(Urgently)
      return () => null
    }, [])
  )

  const getData = async () => {
    try {
      const config = await getConfig();
      const { data } = await axios.get(`${base_url}order-days/master`, config ? config : {});
      setData(data.body);
    } catch (error) {
    }
  };
  



  const addOnlineBook = async () => {
    try {
      const config = await getConfig();
      let res = await axios.post(
        `${base_url}online-booking-settings/record-duration/day`,
       salonId,
        config ? config : {}
      );

      Toast.show(res.data.message, Toast.SHORT);
      navigation.goBack();
    } catch (error) {
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {

    GetOnlineBookingSettingsUrgently(setUrgentlyt);
  }, [setUrgentlyt]);

  const toggleSwitch = () => {
    let newUrgently = !isEnabled;
    onlineBookingSettingsUrgently(newUrgently, setIsEnabled);
    setIsEnabled(() => isEnabled);
    GetOnlineBookingSettingsUrgently(setUrgentlyt);

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
      <View style={{ paddingLeft: 10, marginTop: 14 }}>
      <NavigationMenu name={`Онлайн бронирование`} />
      </View>
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
              setSelected={(val: string) => {
                setSalonId({
                  id: "", 
                  day: val
                })
              }}
              defaultOption={data.find((item) => item === salonId?.day) ? { key: salonId?.day, value: `${salonId?.day} day` } : { key: 0, value: 0 }}
              data={data.map((item) => ({ key: item, value: `${item} day` }))}
              save="key"
              search={false}
            />
            {
              tariff && tariff === "STANDARD" && 
              <SwitchWithLabel
                label="Без срочно"
                value={isEnabled}
                onToggle={toggleSwitch}
              />
            }
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
    paddingVertical: 16,
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
    backgroundColor: "#21212E",
  },
});

export default Booking;
