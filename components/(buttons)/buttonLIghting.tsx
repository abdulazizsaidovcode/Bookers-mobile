import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IButton } from "@/type/button/button";
import { View } from '../Themed';

const ButtonsLighting: React.FC<IButton> = ({ title, backgroundColor = '#fff', bordered = false, icon, textColor = '#9C0A35', textSize = 18, onPress, isDisebled = true }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: !isDisebled ? 'gray' : backgroundColor, borderWidth: bordered ? 1.5 : 0, borderColor: '#fff' }
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
        marginTop: 20,
        width: '100%',
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignSelf: 'center',
        elevation: 10,
        shadowColor: 'white',

    },
    buttonText: {
        fontWeight: '500',
    },
});

export default ButtonsLighting;
