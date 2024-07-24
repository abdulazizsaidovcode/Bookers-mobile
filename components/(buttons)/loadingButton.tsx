import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { IButton } from "@/type/button/button";

const LoadingButtons: React.FC<IButton> = ({ title, backgroundColor = '#9C0A35', textColor = 'white', textSize = 18, isDisebled = true }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: isDisebled ? 'gray' : backgroundColor }
            ]}
            activeOpacity={.8}
            disabled={isDisebled}
        >
            <Text style={[styles.buttonText, { color: textColor }, { fontSize: textSize }]}>
                {title}
            </Text>
            <ActivityIndicator size="small" color={textColor} style={styles.loader} />
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
        flexDirection: 'row',
    },
    buttonText: {
        fontWeight: '500',
    },
    loader: {
        marginLeft: 20,
    },
});

export default LoadingButtons;
