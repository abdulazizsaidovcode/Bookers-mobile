import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Buttons from '@/components/(buttons)/button';
import { router } from 'expo-router';

const AuthPage1: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Бронируйте услуги в области красоты и здоровья</Text>
                <Image source={require('../../assets/images/auth/Frame.png')} style={styles.image} />
                <Text style={styles.subtitle}>в любимом салоне красоты</Text>
                <Text style={styles.description}>
                    Бронирование свиданий без хлопот с волосами. Bookers позволяет выбрать день, время и стилиста, дает цену и сроки на все услуги в простом в использовании меню.
                </Text>
            </View>
            <Buttons title='Продолжить' onPress={() => router.push('(auth)/authPage2')} />
        </SafeAreaView>
    );
}

export default AuthPage1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        justifyContent: 'space-between',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        marginTop: 80
    },
    title: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    subtitle: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        marginBottom: 30,
    }
});
