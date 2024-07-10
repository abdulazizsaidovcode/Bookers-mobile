import Buttons from '@/components/(buttons)/button';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import '../../i18next';
import NavigationMenu from '@/components/navigation/navigation-menu';
const Auth: React.FC = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    return (
        <SafeAreaView style={styles.container} >
            {/* <NavigationMenu name="" deleteIcon={false} key={1} /> */}
            <View style={styles.logo}>
                <Image source={require('../../assets/images/auth/logo.png')} />
            </View>
            <Text style={styles.title}>Bookers Beauty</Text>
            <Text style={styles.welcome}> </Text>
            <Text style={styles.selectLanguage}>Выберите язык</Text>
            <View style={styles.button}>
                <Buttons title="Русский" backgroundColor="#9C0A35" onPress={() => {
                    router.push('(auth)/number-create');
                    changeLanguage('ru');
                }} />
                <Buttons title="O‘zbek" backgroundColor="#9C0A35" onPress={() => {
                    router.push('(auth)/number-create');
                    changeLanguage('uz');
                }} />
                <Buttons title="English" backgroundColor="#9C0A35" onPress={() => {
                    router.push('(auth)/number-create');
                    changeLanguage('en');
                }
                } />
                <Buttons title="Online booking" backgroundColor="#9C0A35" onPress={() => {
                    router.push('(standart)/(onlineBooking)/onlineBooking');
                    changeLanguage('en');
                }
                } />
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
        fontSize: 24,
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

export default Auth;
