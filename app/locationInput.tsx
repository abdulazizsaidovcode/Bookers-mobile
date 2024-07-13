import React from "react";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <SafeAreaView>
      <View style={tw`w-full mt-1`}>
        <Text style={[tw`text-gray-500 mb-3 text-lg`]}>{label}</Text>
        <TextInput
          style={tw`bg-gray-500 rounded-xl text-white p-3 w-full h-14 text-white text-xl`}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationInput;
