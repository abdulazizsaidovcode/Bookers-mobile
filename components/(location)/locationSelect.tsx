import React, { useEffect, useState } from "react";
import { View } from "../Themed";
import LocationInput from "./locationInput";
import tw from "tailwind-react-native-classnames";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { base_url } from "@/helpers/api";
import { getConfig } from "@/app/(tabs)/(master)/main";

interface Types {
  setDistrictId: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
}

const LocationSelect = ({ setDistrictId, city, setCity }: Types) => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const getCity = async () => {
    try {
      setIsloading(true);
      const config = await getConfig();
      const { data } = await axios.get(
        `${base_url}district/name/filter?name=${city}`,
        config ? config : {}
      );9

      setData(data.body);
    } catch (error) {
    } finally {
      setIsloading(false);
    }
  };

  const handleClick = (id: string, name: string) => {
    setToggle(false);
    setCity(name);
    setDistrictId(id);
  };

  useEffect(() => {
    getCity();
    console.log();

    if (city.trim().length) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [city]);

  return (
    <View style={tw`w-full relative bg-transparent z-50`}>
      <View style={tw`w-full z-30 bg-transparent mt-4`}>
        <LocationInput label="Город" value={city} onChangeText={setCity} />
      </View>
      {toggle && (
        <ScrollView
        showsVerticalScrollIndicator={false}
          style={[tw`py-2 px-2 absolute max-h-96  w-full z-50 overflow-hidden rounded-lg z-50 border border-white top-28 `, {backgroundColor: "#6b7280" }]}
        >
          {isLoading && <ActivityIndicator size="large" color={"#888"} />}
          {data && data.length
            ? data.map((item: any) => (
                <TouchableOpacity
                  onPress={() => handleClick(item.id, item.name)}
                  key={item?.id}
                  style={[tw`mt-1 rounded py-2 px-4`, {backgroundColor: "#6b7280" }]}
                >
                  <Text style={tw`text-lg text-white`}>{item?.name}</Text>
                </TouchableOpacity>
              ))
            : !isLoading && <Text style={tw`text-white`}>City not found</Text>}
        </ScrollView>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   drop_dawn: {
//     flex: 1,
//     padding: 6,
//     position: "absolute",
//     bottom: -18,
//     width: "100%",
//     zIndex: 1000,
//     backgroundColor: "rgb(17 2 39)",
//     borderRadius: 20,
//     borderStyle: "solid",
//     borderColor: "#fff",
//   },
// });

export default LocationSelect;
