import React, { useEffect, useState } from "react";
import { Text, View } from "../Themed";
import tw from "tailwind-react-native-classnames";
import { Checkbox, RadioButton } from "react-native-paper";
import { ServicesProps } from "@/type/services/servicesCategory";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import servicesStore from "@/helpers/state_managment/services/servicesStore";
import { MaterialIcons } from "@expo/vector-icons";

const ServicesCategory: React.FC<ServicesProps> = ({
    title,
    onPress,
    isRadioButton = false,
    isChecked = false,
}) => {
    const { setIsChecked, checkedIs } = servicesStore();
    const [checked, setChecked] = useState(isChecked);
    const [showCheckboxes, setShowCheckboxes] = useState(true); // Checkbox'ni ko'rsatish uchun true qildim
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

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
            <View style={[tw`rounded-2xl`, { backgroundColor: "#21212E"}]}>
                <View
                    style={[
                        tw`flex p-3 mb-3 flex-row items-center`,
                        { borderRadius: 18 },
                    ]}
                >
                    <View style={styles.checkboxContainer}>
                        {isRadioButton ? (
                            <RadioButton
                                value="radio"
                                status={checked ? "checked" : "unchecked"}
                                onPress={handlePress}
                                color={checked ? "#9C0A35" : "black"}
                            />
                        ) : (

                            showCheckboxes && (
                                <View style={styles.checkboxContainer}>
                                    <MaterialIcons
                                        name={checked ? "check-box" : "check-box-outline-blank"}
                                        size={24}
                                        color={checked ? "#9C0A35" : "black"}
                                    />
                                </View>
                            )
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
        transform: [{ scale: Platform.OS === 'ios' ? 1.1 : 1.1 }], // Scale adjustment for iOS and Android
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        
    },
    checkbox: {
        alignSelf: 'center'
    },
});

export default ServicesCategory;
