import React from 'react';
import { Text, View, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const LocationInput: React.FC<LocationInputProps> = ({ label,value, onChangeText }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={tw`w-full p-4 mt-4`}>
        <Text style={tw`text-gray-500 mb-3 text-lg mt-4`}>{label}</Text>
        <TextInput
          style={tw`bg-gray-500 rounded-xl p-3 mb-3 w-full h-18 text-white text-xl`}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationInput;
