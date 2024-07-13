import Buttons from '@/components/(buttons)/button';
import NavigationMenu from '@/components/navigation/navigation-menu';
import registerStory from '@/helpers/state_managment/auth/register';
import { RootStackParamList } from '@/type/root';
import { NavigationProp } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Toast from "react-native-simple-toast";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(auth)/masterORclient'>;




const MasterorClient: React.FC = () => {
    const { setRole } = registerStory()
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const {t}=useTranslation()
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.logo}>
                <Image source={require('../../assets/images/auth/logo.png')} />
            </View>
            <Text style={styles.title}>Bookers Beauty</Text>
            <Text style={styles.selectLanguage}>{t("who_do_you_want_to_become")}</Text>
            <View style={styles.button}>
                <Buttons title={t("master")} backgroundColor="#9C0A35" onPress={() => {
                    setRole("ROLE_MASTER")
                    navigation.navigate('(auth)/switchPage');
                }} />
                <Buttons title={t("client")} backgroundColor="#9C0A35" onPress={() => {
                    setRole("ROLE_CLIENT")
                    Toast.show("клиентская панель пока недоступна в этой версии", Toast.LONG)
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
