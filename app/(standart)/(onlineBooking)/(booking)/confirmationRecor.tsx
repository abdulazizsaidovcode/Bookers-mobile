import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import NavigationMenu from '@/components/navigation/navigation-menu'

const ConfirmationRecord = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ marginBottom: 10, }}></Text>
            <NavigationMenu name={`Онлайн бронирование`} />
        </SafeAreaView>
    )
}

export default ConfirmationRecord

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
    },
})