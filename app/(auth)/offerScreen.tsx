import Buttons from '@/components/(buttons)/button';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const OfferScreen = () => {
    const {t}=useTranslation()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Публичная оферта</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.offerContainer}>
                    <Text style={styles.offerTitle}>
                        Онлайн сервис для самостоятельного бронирования услуг специалистов в сфере красоты и ухода за внешностью
                    </Text>
                    <Text style={styles.offerText}>
                        На сервисе уже на протяжении 2x лет дарит пользователям ...... Равным образом сложившаяся структура организации влечет за собой процесс внедрения и модернизации систем массового участия. Равным образом сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач. Равным образом сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших направлений развития. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.
                    </Text>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.button}>
                <Buttons title="Kirish" backgroundColor="#9C0A35" onPress={() => router.push('(auth)/userInfo')} />
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
