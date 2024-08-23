import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Explanations:React.FC<{text :string}> = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
    },
    text: {
        textAlign: 'center',
        color: '#4F4F4F',
        fontSize: 14,
        fontWeight: '300',
    }
})

export default Explanations