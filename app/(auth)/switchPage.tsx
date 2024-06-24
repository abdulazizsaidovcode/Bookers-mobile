import Buttons from '@/components/(buttons)/button';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';


const SwitchPage: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../../assets/images/auth/logo.png')} />
            </View>
            <Text style={styles.title}>Bookers Beauty</Text>
            <View style={styles.button}>
                <Buttons title="Kirish" backgroundColor="#9C0A35" onPress={() => router.push('(auth)/number-create')} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 10,
    },
    welcome: {
        fontSize: 18,
        color: '#ffffff',
        marginBottom: 5,
    },
    selectLanguage: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 20,
    },
    button: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 15,
        marginTop: 20

    }
});

export default SwitchPage;
