import React, { useEffect, useState } from "react";
import { Text, View } from "../Themed";
import tw from "tailwind-react-native-classnames";
import { Checkbox, RadioButton } from "react-native-paper";
import { ServicesProps } from "@/type/services/servicesCategory";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import servicesStore from "@/helpers/state_managment/services/servicesStore";

const ServicesCategory: React.FC<ServicesProps> = ({
    title,
    onPress,
    isRadioButton = false,
    isChecked = false,
}) => {
    const { setIsChecked, checkedIs } = servicesStore();
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

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
            activeOpacity={1}
            onPress={handlePress}
        >
            <View style={[tw`rounded-2xl`, { backgroundColor: "#21212E" }]}>
                <View
                    style={[
                        tw`flex p-3 mb-3 flex-row items-center`,
                        { backgroundColor: "#B9B9C9", borderRadius: 18 },
                    ]}
                >
                    <View style={[styles.checkboxContainer]}>
                        {isRadioButton ? (
                            <RadioButton
                                value="radio"
                                status={checked ? "checked" : "unchecked"}
                                onPress={handlePress}
                                color={checked ? "#9C0A35" : "black"}
                            />
                        ) : (
                            <Checkbox
                                status={checked ? "checked" : "unchecked"}
                                onPress={handlePress}
                                color={checked ? "#9C0A35" : "black"}
                            />
                        )}
                    </View>
                    <Text style={tw`text-black text-lg font-bold ml-2`}>
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        transform: [{ scale: Platform.OS === 'ios' ? 1 : 1.1 }], 
        backgroundColor: '#B9B9C9',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ServicesCategory;
