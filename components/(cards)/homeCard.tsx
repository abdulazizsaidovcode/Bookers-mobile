import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

import { HomeCard } from "@/type/card/homeCard";

const HomeCards: React.FC<HomeCard> = ({ icon: Icon, title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={[tw`flex rounded-3xl items-center p-5`, { backgroundColor: "#e8e8e8" }]}>
        <View style={[tw`w-full flex items-center`]}>
          <View
            style={[
              tw`p-5 rounded-full flex items-center justify-center`,
              { backgroundColor: "#9C0A35" },
            ]}
          >
            <Icon style={[tw``, { height: 43, width: 43 }]} />
          </View>
        </View>
        <Text style={[tw`text-2xl mt-3 font-bold`]}>{title}</Text>
        <Text style={[tw`text-lg text-gray-600 text-center`]}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCards;

const styles = StyleSheet.create({});
