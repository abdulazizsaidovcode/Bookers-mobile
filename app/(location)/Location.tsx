import NavigationMenu from "@/components/navigation/navigation-menu";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StatusBar, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const Location = () => {
  return (
    <View style={[tw`flex-1 px-4 mt-5`, { backgroundColor: "#21212E" }]}>
      <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
      <View style={tw`mt-2`}>
        <NavigationMenu name="Мой адрес работы" />
      </View>
      <Pressable
        onPress={() => router.push("/(location-data)/LocationData")}
        style={tw`flex-row items-center justify-between p-3 bg-gray-400 rounded-xl mt-4`}
      >
        <View>
          <View style={tw`flex-row items-center`}>
            <Image
              style={tw`w-8 h-8`}
              source={require("../../assets/images/location.png")}
            />
            <Text style={tw`text-xl font-bold ml-2`}>Адрес работы</Text>
          </View>
          <Text style={tw`text-lg text-gray-600`}>
            Адрес работы не настроен!
          </Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={30} color="#4f4f4f" />
      </Pressable>
    </View>
  );
};

export default Location;
