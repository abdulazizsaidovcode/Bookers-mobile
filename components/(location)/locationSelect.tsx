import React, { useEffect, useState } from "react";
import { View } from "../Themed";
import LocationInput from "./locationInput";
import tw from "tailwind-react-native-classnames";
import { Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { base_url } from "@/helpers/api";
import { getConfig } from "@/app/(tabs)/main";

interface Types {
  setDistrictId: () => void;
  city: string;
  setCity: () => void;
}

const LocationSelect = ({ setDistrictId, city, setCity }: Types) => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

  const getCity = async () => {
    const config = await getConfig()
    const { data } = await axios.get(
      `${base_url}district/name/filter?name=${city}`,
      config
    );
    setData(data.body);
  };

  const handleClick = (id: string, name: string) => {
    setCity(name);
    setDistrictId(id);
    setToggle(false);
  };

  useEffect(() => {
    getCity();
    if (city.length === 0) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, [city]);

  return (
    <View style={tw`w-full relative bg-transparent z-50`}>
      <View style={tw`w-full z-30 bg-transparent mt-4`}>
        <LocationInput label="Город" value={city} onChangeText={setCity} />
      </View>
      {toggle && (
        <View
          style={tw`p-4 absolute w-full  z-50 overflow-hidden rounded-lg z-50 border border-white top-28 bg-gray-900`}
        >
          {data &&
            data.map((item: any) => (
              <TouchableOpacity
                onPress={() => handleClick(item?.id, item?.name)}
                key={item?.id}
                style={tw`bg-black mt-1 rounded py-2 px-4`}
              >
                <Text style={tw`text-lg text-white`}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
          {data.length === 0 && (
            <Text style={tw`text-lg text-white`}>
              Not fount:
              <Text style={tw`text-lg text-red-500 font-bold`}> {city}</Text>
            </Text>
          )}
        </View>
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
