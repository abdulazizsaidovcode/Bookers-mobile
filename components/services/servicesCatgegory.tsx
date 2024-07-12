import React, { useEffect, useState } from "react";
import { Text, View } from "../Themed";
import tw from "tailwind-react-native-classnames";
import { Checkbox, RadioButton } from "react-native-paper";
import { ServicesProps } from "@/type/services/servicesCategory";
import { StyleSheet, TouchableOpacity } from "react-native";
import servicesStore from "@/helpers/state_managment/services/servicesStore";

const ServicesCategory: React.FC<ServicesProps> = ({
    title,
    onPress,
    isRadioButton = false,
    isChecked = false,
}) => {
    const { setIsChecked, checkedIs } = servicesStore()
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked])

    const handlePress = () => {
        if (isRadioButton) {
            setChecked(true);
        } else {
            setChecked(!checked);
        }
        if (onPress) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                handlePress();   
            }}
        >
            <View style={[tw`rounded-2xl`, { backgroundColor: "#21212E" }]}>
                <View
                    style={[
                        tw`flex p-3 mb-3 flex-row rounded-2xl items-center`,
                        { backgroundColor: "#B9B9C9" },
                    ]}
                >
                    <View
                        style={[
                            tw`rounded-full`,
                            {
                                backgroundColor: checked ? "red" : "#B9B9C9",
                            },
                        ]}
                    >
                        {isRadioButton ? (
                            <RadioButton
                                value="radio"
                                status={checked ? "checked" : "unchecked"}
                                onPress={handlePress}
                                color={checked ? "white" : "black"} // RadioButton color change
                            />
                        ) : (
                            <Checkbox
                                status={checked ? "checked" : "unchecked"}
                                onPress={handlePress}
                                color={checked ? "white" : "black"} // Checkbox color change
                            />
                        )}
                    </View>
                    <Text style={tw`text-black text-lg font-bold ml-2`}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        alignSelf: "center",
    },
});

export default ServicesCategory;