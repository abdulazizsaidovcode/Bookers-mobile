import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import Buttons from "@/components/(buttons)/button";
import { FontAwesome } from "@expo/vector-icons";
import { getFile } from "@/helpers/api";

export const TopMasterCard = ({ item }: any) => {
    const {
      id,
      attachmentId,
      fullName,
      salonName,
      genderName,
      orderCount,
      clientCount,
      street,
      mainPhoto,
      nextEntryDate,
    } = item;

    const avatarSource = attachmentId
      ? { uri: `${getFile}${attachmentId}` }
      : require("../../../assets/avatar.png");

    const mainPhotoSource = mainPhoto
      ? { uri: `${getFile}${mainPhoto}` }
      : null;

    const genderLabel =
      genderName === "MALE"
        ? "Мужской мастер"
        : genderName === "FEMALE"
          ? "Женский мастер"
          : "Не найдено";

    const nextBookingDate =
      moment().format("YYYY-MM-DD") === nextEntryDate
        ? "Сегодня"
        : moment(nextEntryDate).format("dd, DD MMM");

    return (
      <View
        key={id}
        style={[tw`rounded-lg p-2 mt-2`, { backgroundColor: "#b9b9c9" }]}
      >
        <View style={tw`flex-row justify-between`}>
          <View style={tw`flex-row`}>
            <Image style={tw`w-16 h-16 rounded-full`} source={avatarSource} />
            <View>
              <View style={tw`flex-row items-center ml-2`}>
                <Text style={tw`text-lg font-bold`}>{fullName}</Text>
                <View
                  style={[
                    tw`border rounded-lg p-1 ml-2`,
                    { borderColor: "#4F4F4F" },
                  ]}
                >
                  <Text style={{ fontSize: 8, textTransform: "capitalize" }}>
                    {salonName || "Не найдено"}
                  </Text>
                </View>
              </View>
              <Text style={tw`ml-3 capitalize text-gray-500`}>
                {genderLabel}
              </Text>
            </View>
          </View>
          <View>
            <Text>{orderCount} заказа</Text>
            <Text>{clientCount} клиентов</Text>
          </View>
        </View>
        <View>
          <Text style={tw`ml-3 my-2 text-gray-500`}>
            {street || "Не найдено"}
          </Text>
          {mainPhotoSource ? (
            <Image
              style={tw`w-full h-80 rounded-lg`}
              source={mainPhotoSource}
            />
          ) : (
            <View
              style={tw`w-full h-80 bg-gray-600 rounded-lg items-center justify-center`}
            >
              <FontAwesome name="photo" size={70} color="#fff" />
            </View>
          )}
          <Text style={tw`ml-3 mt-3 text-base font-medium`}>
            Ближайшая запись: {nextBookingDate}
          </Text>
          <View style={tw`mt-2 flex-row px-9 justify-center`}>
            <Buttons title="Записаться" />
            <TouchableOpacity
            //   onPress={() => {
            //     setMapData(item);
            //     navigation.navigate(
            //       "(client)/(master-locations)/master-locations"
            //     );
            //   }}
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
    );
  };