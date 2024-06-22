import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IButton } from "@/type/button/button";

const Buttons: React.FC<IButton> = ({ title, backgroundColor = '#9C0A35', icon, textColor = 'white', textSize = 18, onPress, isDisebled = true }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: !isDisebled ? 'gray' : backgroundColor }
            ]}
            onPress={onPress}
            activeOpacity={.8}
            disabled={!isDisebled}
        >
            <Text style={[styles.buttonText, { color: textColor }, { fontSize: textSize }]}>
                {icon ? icon : ''} {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: '500',
    },
});

export default Buttons;
