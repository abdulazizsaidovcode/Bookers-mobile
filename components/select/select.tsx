import React from 'react';
import tw from "tailwind-react-native-classnames";
import {View, Text} from "react-native";
import {Picker} from "@react-native-picker/picker";

const Select = ({label, value, onValueChange, child}: {
    label?: string,
    value?: any,
    onValueChange?: (val: string) => void,
    child: any
}) => {
    return (
        <>
            {label && <Text style={tw`text-gray-500 mb-2 text-base`}>{label}</Text>}
            <View style={tw`bg-gray-500 rounded-xl py-3 mb-3 w-full h-14`}>
                <Picker
                    selectedValue={value}
                    style={[tw`text-white text-lg`, {transform: 'translateY(-11px)'}]}
                    onValueChange={onValueChange}
                >
                    {child}
                </Picker>
            </View>
        </>
    );
};

export default Select;