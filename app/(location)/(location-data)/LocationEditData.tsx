import LocationInput from "@/app/locationInput";
import Buttons from "@/components/(buttons)/button";
import LocationSelect from "@/components/(location)/locationSelect";
import CenteredModal from "@/components/(modals)/modal-centered";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { base_url } from "@/helpers/api";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { router } from "expo-router";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { getConfig } from "@/app/(tabs)/(master)/main";
import axios from "axios";

interface ListData {
  key: string;
  value: string;
}

const LocationEditData = () => {
  const [salonId, setSalonId] = useState("");
  const [data, setData] = useState<ListData[]>([]);
  const [districtId, setDistrictId] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [target, setTarget] = useState("");
  const [validate, setValidate] = useState(false);
  const [isModal, setIsmodal] = useState(false);
  const [salonName, setSalonName] = useState("");
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState(80);

  useEffect(() => {
    if (
      !salonId ||
      !districtId ||
      street.length === 0 ||
      homeNumber.length === 0 ||
      target.length === 0
    ) {
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [salonId, districtId, street, homeNumber, target]);

  const getHairdresser = async () => {
    try {
      const config = await getConfig();
      const { data } = await axios.get(
        `${base_url}salon`,
        config ? config : {}
      );
      console.log(data);

      const listData: ListData[] =
        data.body &&
        data.body.map((item: any) => ({
          key: item.id,
          value: item.name,
        }));
      setData(listData);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setCity("");
    setStreet("");
    setDistrictId("");
    setHomeNumber("");
    setTarget("");
    setSalonId("");
  };

  const handleSubmit = async () => {
    const data = {
      districtId,
      street,
      homeNumber,
      target,
      salonId,
    };
    try {
      const config = await getConfig();
      const res = await axios.put(
        `${base_url}address`,
        data,
        config ? config : {}
      );
      console.log(res);

      if (res.data.success) {
        router.push("../(response-location)/ResponseLocationEdit");
      }
      else {
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onConfirm = async () => {
    try {
      const config = await getConfig();
      const { data } = await axios.post(
        `${base_url}message/send/admin`,
        { salonName, message },
        config ? config : {}
      );
      if (data.success === true) {
        setToggle(true);
        setIsmodal(false);
        setMessage("");
        setSalonName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentSizeChange = (event: any) => {
    const newHeight = Math.min(
      Math.max(80, event.nativeEvent.contentSize.height),
      200
    );
    setHeight(newHeight);
  };

  useEffect(() => {
    getHairdresser();
  }, []);

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#21212E" }]}>
      <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
      <NavigationMenu name="Мой адрес работы" />
      <View style={[tw`flex-1`, { backgroundColor: "#21212E" }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            flexGrow: 1,
            justifyContent: "space-between",
            backgroundColor: "#21212E",
          }}
        >
          <View style={tw``}>
            <Text style={tw`text-base my-2 text-gray-400`}>
              Название салона
            </Text>
            <SelectList
              boxStyles={styles.select}
              inputStyles={tw`text-white text-lg`}
              dropdownStyles={styles.dropdawn}
              dropdownTextStyles={tw`text-white text-lg`}
              setSelected={(val: string) => setSalonId(val)}
              data={data}
              save="key"
              search={false}
              placeholder="Название салона"
            />
            <Text style={tw`text-base text-white my-2`}>
              Не нашли свой салон красоты?
            </Text>
            <TouchableOpacity
              onPress={() => setIsmodal(!isModal)}
              activeOpacity={0.8}
              style={tw` mx-auto bg-white w-full p-2 rounded-lg mb-2`}
            >
              <Text
                style={tw`text-red-500 text-center text-base px-4 font-semibold`}
              >
                Обратиться к администратору
              </Text>
            </TouchableOpacity>
            <View style={tw``}>
              <View>
                <LocationSelect
                  setDistrictId={setDistrictId}
                  city={city}
                  setCity={setCity}
                />
              </View>
              <LocationInput
                label="Улица"
                value={street}
                onChangeText={setStreet}
              />
              <LocationInput
                label="Дом"
                value={homeNumber}
                onChangeText={setHomeNumber}
              />
              <LocationInput
                label="Ориентир"
                value={target}
                onChangeText={setTarget}
              />
            </View>
          </View>
          <View style={tw` mt-10 mb-5`}>
            <Buttons
              onPress={handleSubmit}
              title="Сохранить"
              // backgroundColor={"#9c0935"}
              isDisebled={validate}
            />
          </View>
        </ScrollView>
        {/* Не нашли свой салон красоты? */}
        <CenteredModal
          btnWhiteText={"Закрыть"}
          btnRedText={"Отправить"}
          isFullBtn={true}
          isModal={isModal}
          onConfirm={onConfirm}
          toggleModal={() => {
            setIsmodal(false);
            setSalonName("");
            setMessage("");
          }}
        >
          <View style={tw`w-full`}>
            <Text style={tw`text-center text-white text-base p-0 m-0`}>
              Расскажите администратору о вашем салоне
            </Text>
            <LocationInput
              placeholder="Укажите название"
              value={salonName}
              onChangeText={setSalonName}
            />
            <View style={tw`mt-5`}>
              <TextInput
                placeholder="Сообщение"
                style={[styles.textArea, { height }]}
                onChangeText={(e: string) => setMessage(e)}
                onContentSizeChange={handleContentSizeChange}
                value={message}
              />
            </View>
          </View>
        </CenteredModal>
        {/* Sucsess */}
        <View style={tw`flex-1 justify-center items-center`}>
          <Modal
            style={tw`px-3`}
            isVisible={toggle}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropColor="black"
            coverScreen={true}
            deviceHeight={20}
            deviceWidth={100}
            hasBackdrop={true}
            hideModalContentWhileAnimating={true}
            onBackdropPress={() => setToggle(false)}
            onBackButtonPress={() => setToggle(false)}
            useNativeDriver={true}
          >
            <View style={tw`bg-gray-800 p-3 items-center rounded-xl`}>
              <Feather
                style={tw`mt-4`}
                name="check-circle"
                size={60}
                color="#9c0a35"
              />
              <Text style={tw`text-white text-center mt-5 text-base`}>
                Сообщение отправлено! Скоро администратор добавит ваш салон
                красоты
              </Text>
              <Text style={tw`text-xl my-5 font-medium text-white`}>
                Ожидайте ответа администратора
              </Text>
              <Buttons onPress={() => setToggle(false)} title="Закрыть" />
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  dropdawn: {
    zIndex: 1000,
    width: "100%",
    position: "absolute",
    backgroundColor: "#6b7280",
    top: 55,
  },
  select: {
    width: "100%",
    backgroundColor: "#6b7280",
  },
  textArea: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#6b7280",
    color: "#E0E0E0",
    fontSize: 16,
    textAlignVertical: "top", // Align text to the top
  },
});
export default LocationEditData;
