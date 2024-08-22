import Buttons from '@/components/(buttons)/button';
import registerStory from '@/helpers/state_managment/auth/register';
import { RootStackParamList } from '@/type/root';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import { setClientOrMaster } from "@/constants/storage";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(auth)/(register)/(roleSelection)/masterORclient'>;

const MasterorClient: React.FC = () => {
    const { setRole } = registerStory()
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const { t } = useTranslation()

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.logo}>
                <Image source={require('../../../../assets/images/auth/logo.png')} />
            </View>
            <Text style={styles.title}>Bookers Beauty</Text>
            <Text style={styles.selectLanguage}>{t("who_do_you_want_to_become")}</Text>
            <View style={styles.button}>
                <Buttons title={t("master")} backgroundColor="#9C0A35" onPress={() => {
                    setRole("ROLE_MASTER")
                    setClientOrMaster('ROLE_MASTER')
                    navigation.navigate('(auth)/(register)/(masterInformation)/getNameSurname');
                }} />
                <Buttons title={t("client")} backgroundColor="#9C0A35" onPress={() => {
                    setRole("ROLE_CLIENT")
                    setClientOrMaster('ROLE_CLIENT')
                    navigation.navigate('(auth)/(register)/(clientInformations)/getNameSurname')
                }} />
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

    }
});

export default MasterorClient;
