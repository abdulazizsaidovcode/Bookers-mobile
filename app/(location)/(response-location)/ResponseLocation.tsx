import { getConfig } from "@/app/(tabs)/(master)/main";
import Buttons from "@/components/(buttons)/button";
import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { base_url } from "@/helpers/api";
import { getLocationData } from "@/helpers/api-function/location";
import { getNumbers, putNumbers } from "@/helpers/api-function/numberSittings/numbersetting";
import { createLocation } from "@/helpers/state_managment/location";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";

interface Types {
    districtId: number;
    homeNumber: string;
    id: number;
    salonId: string;
    street: string;
    target: string;
}

const ResponseLocation = () => {
    const { setNumber } = numberSettingStore();
    const navigation = useNavigation<any>()
    const [data, setData] = useState<Types | null>();

    const getLocationData = async () => {
      try {
          const config = await getConfig();
          const { data } = await axios.get(`${base_url}address`, config ? config : {});
          console.log(data);
          setData(data.body);
  
          const salonName = await axios.get(`${base_url}salon/${data.body.salonId}`, config ? config : {});
          setData({ ...data.body, salonId: salonName.data.body.name });
          return data;
      } catch (error) {
          console.log(error);
      }
  };
    
    useEffect(() => {
      getLocationData()
    }, [])

    return (
        <View style={[tw`flex-1  mt-4`, { backgroundColor: "#21212e" }]}>
            <View style={tw`mt-2 bg-transparent pb-5`}>
                <NavigationMenu name="Мой адрес работы" />
            </View>
            <View style={tw`px-3 bg-transparent w-full flex-1 items-center`}>
                <View
                    style={[
                        tw`w-full p-5 rounded-2xl w-full`,
                        { backgroundColor: "#b9b9c9" },
                    ]}
                >
                    <View
                        style={[
                            tw`flex-row justify-between w-full`,
                            { backgroundColor: "#b9b9c9" },
                        ]}
                    >
                        <View style={tw`bg-transparent flex-row`}>
                            <Entypo name="location" size={30} color="#9d0a36" />
                            <Text style={tw`text-xl text-black font-bold ml-3`}>Адрес работы</Text>
                        </View>
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={30}
                            color="#4f4f4f"
                        />
                    </View>
                    <View style={tw`bg-transparent mt-3`}>
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
                    </View>
                </View>
                <View style={tw`bg-transparent absolute bottom-5 w-full`}>
                    <Buttons
                        title="На главную"
                        onPress={() => {
                            if (data) putNumbers(4, () => getNumbers(setNumber))
                            navigation.navigate("(welcome)/Welcome");
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default ResponseLocation;
