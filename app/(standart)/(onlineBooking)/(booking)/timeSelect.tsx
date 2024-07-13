import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import SwitchWithLabelBlack from "@/components/switchWithLabel/switchWithLabelBlack";
import Buttons from "@/components/(buttons)/button";
import { OnlineBookingStory3 } from "@/helpers/state_managment/onlinBooking/onlineBooking";
import axios from "axios";
import { base_url } from "@/helpers/api";
import useNotificationsStore from "@/helpers/state_managment/notifications/notifications";
import {
  fetchAllData,
  fetchAppoinmentActiveData,
} from "@/helpers/api-function/notifications/notifications";
import BottomModal from "@/components/(modals)/modal-bottom";
import tw from "tailwind-react-native-classnames";
import { router } from "expo-router";
import { getConfig } from "@/app/(tabs)/main";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const TimeSelect = () => {
  const { setTimeEnabled, timeEnabled } = OnlineBookingStory3();
  const [vipCount, setVipCount] = useState({});
  const {
    isAppoinmentModal,
    appoinmentData,
    appoinmentActiveData,
    setAppoinmentActiveData,
    setAppoinmentData,
    setIsAppoinmentModal,
  } = useNotificationsStore();

  useEffect(() => {
    fetchAllData(setAppoinmentData, "APPOINTMENT");
  }, [setAppoinmentData]);

  useEffect(() => {
    fetchAppoinmentActiveData(setAppoinmentActiveData);
  }, [setAppoinmentActiveData]);

  const toggleSwitch = () => setAppoinmentActiveData(!appoinmentActiveData);
  const toggleModal = () => setIsAppoinmentModal(!isAppoinmentModal);

  const onMessageChange = (text: string) =>
    setAppoinmentData({ ...appoinmentData, content: text });

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const renderPickerItems = (
    items: number[],
    selectedItem: number | undefined,
    onSelectItem: (val: number) => void
  ) => (
    <ScrollView style={styles.picker}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => onSelectItem(item)}
          style={[
            styles.pickerItem,
            selectedItem === item && styles.selectedPickerItem,
          ]}
        >
          <Text
            style={[
              styles.pickerItemText,
              selectedItem === item && styles.selectedPickerItemText,
            ]}
          >
            {item} {items === hours ? "ч." : "мин."}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const getVipCount = async () => {
    try {
      const config = await getConfig();
      const { data } = await axios.get(
        `http://134.122.77.107:8080/online-booking-settings/vip-client`,
        config
      );
      console.log(data);
      
      if(data.success) setVipCount(data.body);
      setTimeEnabled(data.body.vipClient);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    const data = {
      hour: appoinmentData.hour,
      minute: appoinmentData.minute,
      vipClient: timeEnabled,
    };
    try {
      const config = await getConfig()
      const res = await axios.put(
        `${base_url}online-booking-settings/vip-client`,
        data,
        config
      );
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const selectTime = () => {
    setVipCount(appoinmentData);
    toggleModal();
  };

  const timeSwitch = () => {
    const newValue = !timeEnabled;
    setTimeEnabled(newValue);
  };

  useEffect(() => {
    getVipCount();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavigationMenu name={`Онлайн бронирование`} />
        <View style={styles.switchContainer}>
          <SwitchWithLabelBlack
            onToggle={timeSwitch}
            value={timeEnabled}
            label="Подтверждать записи для всех клиентов"
          />
        </View>
        {timeEnabled && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleModal}
            style={styles.messageContainer}
          >
            <Text style={tw`text-lg font-bold`}>Время для ВИП клиентов </Text>
            <View style={tw`flex-row bg-gray-800 rounded-lg p-2 mt-2`}>
              <Text style={tw`text-lg text-white`}>{vipCount ? vipCount.hour : "0"} час.</Text>
              <Text style={tw`text-lg text-white ml-2`}>
                {vipCount ? vipCount.minute : "0" } мин
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <BottomModal
        isBottomModal={isAppoinmentModal}
        toggleBottomModal={toggleModal}
      >
        <View style={{ width: screenWidth / 1.3 }}>
          <View style={styles.modalContent}>
            <View style={styles.customPickerContainer}>
              <View>
                {renderPickerItems(hours, appoinmentData.hour, (hour: number) =>
                  setAppoinmentData({ ...appoinmentData, hour })
                )}
              </View>
              <View>
                {renderPickerItems(
                  minutes,
                  appoinmentData.minute,
                  (minute: number) =>
                    setAppoinmentData({ ...appoinmentData, minute })
                )}
              </View>
            </View>
          </View>
          <Buttons title="Выбрать" onPress={selectTime} />
        </View>
      </BottomModal>
      <Buttons
        title="Сохранить"
        backgroundColor="#9C0A35"
        onPress={handleClick}
        isDisebled={timeEnabled}
      />
    </SafeAreaView>
  );
};

export default TimeSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#21212E",
    padding: 16,
  },
  switchContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: "#B9B9C9",
    borderRadius: 15,
  },
  messageContainer: {
    padding: 16,
    backgroundColor: "#B9B9C9",
    borderRadius: 15,
    marginTop: 10,
  },
  messageText: {
    color: "#000",
    fontSize: 16,
  },
  picker: {
    maxHeight: screenHeight / 3,
  },
  pickerItem: {
    paddingVertical: 10,
    alignItems: "center",
  },
  pickerItemText: {
    fontSize: 22,
    color: "#828282",
  },
  selectedPickerItem: {
    backgroundColor: "#9C0B35",
    paddingHorizontal: screenWidth / 11,
    borderRadius: 15,
  },
  selectedPickerItemText: {
    color: "#fff",
  },
  modalContent: {
    padding: 20,
  },
  customPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 10,
  },
});
