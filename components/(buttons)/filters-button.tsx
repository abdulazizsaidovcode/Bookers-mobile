import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { IButton } from '@/type/button/button'

const FiltersButton: React.FC<IButton> = ({ title, backgroundColor = '#9C0A35', textColor = 'white', onPress, isDisebled = true }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: !isDisebled ? 'gray' : backgroundColor }
            ]}
            onPress={onPress}
            activeOpacity={.8}
        >
            <Text style={[styles.buttonText, { color: textColor }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default FiltersButton