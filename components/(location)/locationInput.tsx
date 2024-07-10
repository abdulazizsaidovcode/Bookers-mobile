import React from "react";
import { Text, View, TextInput, SafeAreaView, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";

const LocationInput: React.FC<LocationInputProps> = (
    {
        label,
        labalVisible = true,
        value,
        onChangeText,
        placeholder,
        type
    }) => {
    return (
        <SafeAreaView>
            <View style={{ width: "100%" }}>
                {labalVisible ? (
                    <Text style={tw`text-white text-base ${label ? 'mb-2' : ''}`}>{label}</Text>
                ) : (
                    ""
                )}
                <TextInput
                    style={tw`bg-gray-500 rounded-xl py-3 px-5 mb-3 w-full h-14 text-white text-lg`}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    // placeholderTextColor="white"
                    placeholderTextColor={"white"}
                    value={value}
                    keyboardType={type}
                />
            </View>
        </SafeAreaView>
    );
};

export default LocationInput;
