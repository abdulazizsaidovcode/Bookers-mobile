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
      <View style={tw`w-full mt-1`}>
        <Text style={[tw`text-gray-500 mb-2 text-md`]}>{label}</Text>
        <TextInput
          style={[tw`rounded-xl text-white py-2 px-3 w-full h-14 text-white text-md`, { backgroundColor: '#4B4B64' }]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor={'#828282'}
        />
      </View>
  );
};

export default LocationInput;
