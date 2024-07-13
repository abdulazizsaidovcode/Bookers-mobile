import Buttons from '@/components/(buttons)/button';
import { RootStackParamList } from '@/type/root';
import { NavigationProp } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/address-book'>;



const SwitchPage: React.FC = () => {
    const {t}=useTranslation()
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../../assets/images/auth/logo.png')} />
            </View>
            <Text style={styles.title}>Bookers Beauty</Text>
            <View style={styles.button}>
                <Buttons title={t("start")} backgroundColor="#9C0A35" onPress={() => navigation.navigate('(auth)/offerScreen')} />
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
