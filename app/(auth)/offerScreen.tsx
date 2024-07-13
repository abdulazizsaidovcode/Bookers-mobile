import Buttons from '@/components/(buttons)/button';
import { RootStackParamList } from '@/type/root';
import { NavigationProp } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'   ;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/address-book'>;


const OfferScreen = () => {
    const {t}=useTranslation()
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t("public_offer")}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.offerContainer}>
                    <Text style={styles.offerTitle}>
                       {t("online_service")}
                    </Text>
                    <Text style={styles.offerText}>
                        {t("service_duration")}
                    </Text>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button}>
                <Buttons title={t("login")} backgroundColor="#9C0A35" onPress={() => navigation.navigate('(auth)/userInfo')} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default OfferScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1B2E',
    },
    header: {
        padding: 16,
        marginTop: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    contentContainer: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#2A2A3D',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    offerContainer: {
        backgroundColor: '#E5E5EA',
        padding: 16,
        borderRadius: 10,
    },
    offerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    offerText: {
        fontSize: 14,
        color: '#000',
    },
    button: {
        // backgroundColor: '#E70062',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 16,
    },
    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
