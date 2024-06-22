import { useNavigation } from "expo-router";
import React from "react";
import { Text, View, TextInput, SafeAreaView, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={tw`w-full mt-1`}>
        <Text style={tw`text-gray-500 mb-3 text-lg`}>{label}</Text>
        <TextInput
          placeholder={placeholder}
          style={tw`bg-gray-500 rounded-xl p-3 w-full h-14 text-white text-xl`}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationInput;
