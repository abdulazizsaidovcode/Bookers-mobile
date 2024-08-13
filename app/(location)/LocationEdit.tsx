import NavigationMenu from "@/components/navigation/navigation-menu";
import { getLocationData } from "@/helpers/api-function/location";
import { createLocation } from "@/helpers/state_managment/location";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StatusBar, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { getConfig } from "../(tabs)/(master)/main";
import axios from "axios";
import { base_url } from "@/helpers/api";

interface Types {
  districtId: number;
  homeNumber: string;
  id: number;
  salonId: string;
  street: string;
  target: string;
}

const LocationEdit = () => {
  const [data, setData] = useState<Types | null>();

  const getLocationData = async () => {
    try {
      const config = await getConfig();
      const { data } = await axios.get(`${base_url}address`, config ? config : {});
      setData(data.body);

      const salonName = await axios.get(`${base_url}salon/${data.body.salonId}`, config ? config : {});
      setData({ ...data.body, salonId: salonName.data.body.name });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);


  useEffect(() => {
    getLocationData()
  }, [])
  return (
    <SafeAreaView style={[tw`flex-1 px-4`, { backgroundColor: "#21212E" }]}>
      <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
      <View style={tw`mt-2`}>
        <NavigationMenu name="Мой адрес работы" />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Pressable
          onPress={() => router.push("/(location-data)/LocationEditData")}
          style={[
            tw`flex-row items-center justify-between p-3 rounded-2xl mt-4`,
            { backgroundColor: "#b9b9c9" },
          ]}
        >
          <View>
            <View style={tw`flex-row items-center`}>
              <Entypo name="location" size={30} color="#9d0a36" />
              <Text style={tw`text-xl font-bold ml-3`}>Адрес работы</Text>
            </View>
            {data ? <View style={tw`bg-transparent mt-3`}>
              <View style={tw`text-lg text-gray-500 bg-transparent flex-row`}>
                <Text style={[tw`text-lg font-bold mr-2`, { color: "#4F4F4F" }]}>
                  Салон:
                </Text>
                <Text style={[tw`text-lg`, { color: "#4F4F4F" }]}>{data?.salonId}</Text>
              </View>
              <View style={tw`text-lg text-gray-500 bg-transparent flex-row`}>
                <Text style={[tw`text-lg font-bold mr-2`, { color: "#4F4F4F" }]}>
                  Адрес:
                </Text>
                <Text style={[tw`text-lg`, { color: "#4F4F4F" }]}> {data?.street},{data?.homeNumber}</Text>
              </View>
              <View style={[tw`text-lg text-gray-500  bg-transparent flex-row`]}>
                <Text style={[tw`text-lg font-bold mr-2`, { color: "#4F4F4F" }]}>
                  Ориентир:
                </Text>
                <Text style={[tw`text-lg`, { color: "#4F4F4F" }]}>{data?.target}</Text>
              </View>
            </View> : <Text style={[tw`text-lg mt-2`, { color: "#4F4F4F" }]}>Адрес работы не настроен!</Text>}
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="#4f4f4f" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LocationEdit;
