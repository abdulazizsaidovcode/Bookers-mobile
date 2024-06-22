import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { base_url } from "@/helpers/api";
import { config } from "@/helpers/token";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import tw from "tailwind-react-native-classnames";

const ResponseLocation = () => {
  const [data, setData] = useState({});

  const getLocationData = async () => {
    const { data } = await axios.post(`${base_url}address`, config);
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getLocationData();
  }, []);

  return (
    <View style={[tw`flex-1  mt-4`, { backgroundColor: "#21212e" }]}>
      <View style={tw`mt-2 bg-transparent`}>
        <NavigationMenu name="Мой адрес работы" />
      </View>
      <View style={tw`px-5 bg-transparent w-full`}>
        <View style={tw`w-full bg-gray-500 p-2 rounded-lg w-full`}>
          <View style={tw`bg-gray-500 flex-row justify-between w-full`}>
            <View style={tw`bg-transparent flex-row`}>
              <Image source={require("../../../assets/images/location.png")} />
              <Text style={tw`text-lg font-medium ml-2`}>Адрес работы</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color="#4f4f4f"
            />
          </View>
          <View>
            {/* <Text>
              <Text>Салон:</Text>{data.districtId}
            </Text> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ResponseLocation;
