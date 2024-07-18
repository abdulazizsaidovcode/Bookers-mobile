import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { TextInput } from "react-native-paper";
// icons
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getTopMasters } from "@/helpers/api-function/masters";
import moment from "moment";
import Buttons from "@/components/(buttons)/button";
// icons end

const data = [
  {
    id: "f5777043-6fed-41a3-9fe0-35a162a6c739",
    fullName: "Alisher",
    phone: "+998912120257",
    salonName: "Salon 2",
    genderName: "MALE",
    feedbackCount: 0,
    orderCount: 4,
    clientCount: 5,
    lat: 38.846120694492946,
    lng: 65.79828898433686,
    district: "yakkabog'",
    street: "Zur",
    house: "Nima ",
    attachmentId: null,
    nextEntryDate: "2024-07-17",
  },
  {
    id: "3299a18a-21ef-486b-8cde-2755c43717d5",
    fullName: "Test 16",
    phone: "+998000000016",
    salonName: null,
    genderName: null,
    feedbackCount: 0,
    orderCount: 0,
    clientCount: 0,
    lat: null,
    lng: null,
    district: null,
    street: null,
    house: null,
    attachmentId: null,
    nextEntryDate: "2024-07-17",
  },
  {
    id: "1cd5fb9c-7d19-42dd-b41b-16425908687e",
    fullName: "Test",
    phone: "+99899899004",
    salonName: null,
    genderName: null,
    feedbackCount: 0,
    orderCount: 0,
    clientCount: 0,
    lat: null,
    lng: null,
    district: null,
    street: null,
    house: null,
    attachmentId: null,
    nextEntryDate: "2024-07-17",
  },
  {
    id: "ebfd3757-a736-4c02-bc1f-c04b5a861576",
    fullName: "Test 15",
    phone: "+998000000015",
    salonName: null,
    genderName: null,
    feedbackCount: 0,
    orderCount: 0,
    clientCount: 0,
    lat: null,
    lng: null,
    district: null,
    street: null,
    house: null,
    attachmentId: null,
    nextEntryDate: "2024-07-17",
  },
  {
    id: "445a5cd7-ee8c-4790-a10c-c54182dc8df2",
    fullName: "Test 1",
    phone: "+998000000000",
    salonName: null,
    genderName: "FEMALE",
    feedbackCount: 0,
    orderCount: 0,
    clientCount: 0,
    lat: null,
    lng: null,
    district: null,
    street: "Мирабадский р-н, ул. Нурафшон, 32",
    house: null,
    attachmentId: null,
    nextEntryDate: "2024-07-17",
  },
  {
    id: "874f6390-1976-4c33-82b5-ea8b84b6061c",
    fullName: "Qorbek",
    phone: "+998908714010",
    salonName: null,
    genderName: null,
    feedbackCount: 0,
    orderCount: 0,
    clientCount: 0,
    lat: null,
    lng: null,
    district: null,
    street: null,
    house: null,
    attachmentId: "380642bf-dbcb-45b0-87f0-6be88f81a52e",
    nextEntryDate: "2024-07-18",
  },
];

const Masters = () => {
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
          // onChangeText={onChangeText}
          placeholder="Search"
          // value={value}
        />
        {/* </View> */}
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-white text-lg font-medium mt-5`}>
          Топ 100 специалисты
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            backgroundColor: "#21212E",
          }}
        >
          {data.map((item) => (
            <View
              style={[tw`rounded-lg p-2 mt-2`, { backgroundColor: "#b9b9c9" }]}
            >
              <View style={tw`flex-row justify-between`}>
                <View style={tw`flex-row`}>
                  <Image
                    style={tw`w-16 h-16 rounded-full`}
                    source={
                      item.attachmentId
                        ? `http://134.122.77.107:8080/attachment/getFile/${item.attachmentId}`
                        : require("../../../assets/avatar.png")
                    }
                  />
                  <View>
                    <View style={tw`flex-row items-center ml-2`}>
                      <Text style={tw`text-lg font-bold`}>{item.fullName}</Text>
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
                  <Text>{item.clientCount} клинетов</Text>
                </View>
              </View>
              <View>
                <Text style={tw`ml-3 mt-3 text-gray-500`}>
                  {item.street ? item.street : "Не найдено"}
                </Text>
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
                    <Ionicons name="location-outline" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Masters;
