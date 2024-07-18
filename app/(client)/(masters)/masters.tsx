import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import tw from "tailwind-react-native-classnames";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import moment from "moment";
import Buttons from "@/components/(buttons)/button";
import useTopMastersStore from "@/helpers/state_managment/masters";
import { getTopMasters } from "@/helpers/api-function/masters";
import { FontAwesome } from "@expo/vector-icons";
import BottomModal from "@/components/(modals)/modal-bottom";
import AccordionItem from "@/components/accordions/accardion";
import AccardionSlider from "@/components/accordions/accardionSlider";
import AccardionSliderTwo from "@/components/accordions/accardionSliderTwo";
import AccordionFree from "@/components/accordions/accardionFree";

const Masters = () => {
  const { masters, isLoading } = useTopMastersStore();
  const [bottmModal, setBottomModal] = useState(false);

  const toggleBottomModal = () => setBottomModal(!bottmModal);

  useEffect(() => {
    getTopMasters();
  }, []);

  return (
    <View
      style={[
        tw`px-5`,
        {
          flex: 1,
          backgroundColor: "#21212E",
        },
      ]}
    >
      <View style={tw`mt-10 w-full flex-row justify-between`}>
        <TouchableOpacity
          onPress={toggleBottomModal}
          style={[
            tw`rounded-lg px-4 py-2 border justify-center items-center flex-row`,
            { backgroundColor: "#9c0935" },
          ]}
        >
          <Ionicons name="filter-sharp" size={24} color="#fff" />
          <Text style={tw`text-white text-lg font-medium ml-2`}>Фильтр</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            tw`rounded-lg px-4 py-2 border justify-center items-center border flex-row`,
            { borderColor: "#fff" },
          ]}
        >
          <Entypo name="compass" size={24} color="#fff" />
          <Text style={tw`text-white text-lg font-medium ml-2`}>На карте</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`w-full`}>
        <TextInput
          style={tw`bg-gray-500 rounded-xl py-1 px-5 mb-3 w-full h-10 mt-10 text-white text-lg`}
          placeholder="Search"
        />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-white text-lg font-medium mt-5`}>
          Топ 100 специалисты
        </Text>
        {isLoading && <ActivityIndicator size="large" color={"#888"} />}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            backgroundColor: "#21212E",
          }}
        >
          {masters &&
            masters.map((item) => (
              <View
                key={item.id}
                style={[
                  tw`rounded-lg p-2 mt-2`,
                  { backgroundColor: "#b9b9c9" },
                ]}
              >
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-row`}>
                    <Image
                      style={tw`w-16 h-16 rounded-full`}
                      source={
                        item.attachmentId
                          ? {
                              uri: `http://134.122.77.107:8080/attachment/getFile/${item.attachmentId}`,
                            }
                          : require("../../../assets/avatar.png")
                      }
                    />
                    <View>
                      <View style={tw`flex-row items-center ml-2`}>
                        <Text style={tw`text-lg font-bold`}>
                          {item.fullName}
                        </Text>
                        <View
                          style={[
                            tw`border rounded-lg p-1 ml-2`,
                            { borderColor: "#4F4F4F" },
                          ]}
                        >
                          <Text
                            style={{ fontSize: 8, textTransform: "capitalize" }}
                          >
                            {item.salonName ? item.salonName : "Не найдено"}
                          </Text>
                        </View>
                      </View>
                      <Text style={tw`ml-3 capitalize text-gray-500`}>
                        {item.genderName === "MALE"
                          ? "Мужской мастер"
                          : item.genderName === "FEMALE"
                          ? "Женский мастер"
                          : "Не найдено"}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text>{item.orderCount} заказа</Text>
                    <Text>{item.clientCount} клиентов</Text>
                  </View>
                </View>
                <View>
                  <Text style={tw`ml-3 mt-3 text-gray-500`}>
                    {item.street ? item.street : "Не найдено"}
                  </Text>
                  {item.mainPhoto ? (
                    <Image
                      style={tw`w-full h-52 rounded-lg`}
                      source={{
                        uri: `http://134.122.77.107:8080/attachment/getFile/${item.mainPhoto}`,
                      }}
                    />
                  ) : (
                    <View
                      style={tw`w-full h-52 bg-gray-600 rounded-lg items-center justify-center`}
                    >
                      <FontAwesome name="photo" size={50} color="#fff" />
                    </View>
                  )}
                  <Text style={tw`ml-3 mt-3 text-base font-medium`}>
                    Ближайшая запись:
                    {moment().format("YYYY-MM-DD") === item.nextEntryDate
                      ? "Сегодня"
                      : moment(item.nextEntryDate).format("dd, DD MMM")}
                  </Text>
                  <View style={tw`mt-2 flex-row px-9 justify-center`}>
                    <Buttons title="Записаться" />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        tw`w-12 h-12 items-center justify-center rounded-full bg-black ml-3`,
                        { backgroundColor: "#9c0935" },
                      ]}
                    >
                      <Ionicons
                        name="location-outline"
                        size={24}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
        <BottomModal
          isBottomModal={bottmModal}
          toggleBottomModal={toggleBottomModal}
          children={
            <View>
              <Text style={tw`text-xl text-white font-bold`}>Фильтр</Text>
              <AccordionFree title="Пол мастера" />
              <AccardionSlider title="Рядом со мной" />
              <AccardionSliderTwo title="Рейтинг" />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default Masters;
