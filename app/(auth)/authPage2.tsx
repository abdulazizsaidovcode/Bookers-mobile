import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Buttons from '@/components/(buttons)/button';
import { router } from 'expo-router';
import NavigationMenu from '@/components/navigation/navigation-menu';

const AuthPage2: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name="" deleteIcon={false} key={1} />
            <View style={styles.content}>
                <Text style={styles.title}>Бронируйте услуги в области красоты и здоровья</Text>
                <Image source={require('../../assets/images/auth/averr.png')} style={styles.image} />
                <Text style={styles.subtitle}>у любимых мастеров</Text>
                <Text style={styles.description}>
                    Бронирование свиданий без хлопот с волосами. Bookers позволяет выбрать день, время и стилиста, дает цену и сроки на все услуги в простом в использовании меню.
                </Text>
            </View>
            <Buttons title='Продолжить' onPress={() => router.push('(auth)/authPage3')} />
        </SafeAreaView>
    );
}

export default AuthPage2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        justifyContent: 'space-between',
        padding: 20,
    },
    content: {
        alignItems: 'center',
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
        color: '#828282',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        marginBottom: 30,
    }
});
