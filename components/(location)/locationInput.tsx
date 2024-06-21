import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, View, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const LocationInput: React.FC<LocationInputProps> = ({ label,value, onChangeText }) => {
  return (
    <SafeAreaView>
      <View style={tw`w-full`}>
        <Text style={tw`text-gray-500 mb-2 w-full `}>{label}</Text>
        <TextInput
          style={tw`bg-gray-500 rounded-xl p-3 mb-3 w-full h-18 text-white text-xl`}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationInput;
