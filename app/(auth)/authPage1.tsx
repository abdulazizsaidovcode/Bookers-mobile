import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Buttons from '@/components/(buttons)/button';
import { router, useNavigation } from 'expo-router';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useTranslation } from 'react-i18next';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(auth)/authPage1'>;


const AuthPage1: React.FC = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const { t } = useTranslation()
    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name="" deleteIcon={false} key={1} />
            <View style={styles.content}>
                <Text style={styles.title}>{t("Book_beauty_and_health_services")}</Text>
                <Image source={require('../../assets/images/auth/Frame.png')} style={styles.image} />
                <Text style={styles.subtitle}>{t("in_your_favorite_beauty_salon")}</Text>
                <Text style={styles.description}>
                    {t("Hassle_free_date_booking_with_hair")}
                </Text>
            </View>
            <Buttons title={t("Continue")} onPress={() => navigation.navigate('(auth)/authPage2')} />
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
