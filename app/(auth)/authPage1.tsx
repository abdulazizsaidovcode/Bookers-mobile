import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Buttons from '@/components/(buttons)/button'

const AuthPage1: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Бронируйте услуги в области красоты и здоровья</Text>
                <Image source={require('../../assets/images/auth/Frame.png')} style={{ marginTop: 20 }} />
                <Text>в любимом салоне красоты</Text>
            </View>
            <Buttons title='Продолжить' />
        </SafeAreaView>
    )
}

export default AuthPage1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
    }
})