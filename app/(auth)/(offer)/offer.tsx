import Buttons from '@/components/(buttons)/button';
import NavigationMenu from '@/components/navigation/navigation-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Offer = () => {

    const navigation = useNavigation()
    const handleAccept = () => {
        navigation.goBack()
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='Публичная оферта' />

            <View style={styles.contentContainer}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>
                        Онлайн сервис для самостоятельного бронирования услуг специалистов в сфере красоты и ухода за внешностью
                    </Text>
                    <Text style={styles.content}>
                        На сервис уже на протяжении 2х лет дарит пользователям .... Равным образом сложившаяся структура
                        организации имеет за собой процесс внедрения и модернизации систем массового участия. Равным образом
                        сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших
                        направлений развития. Разнообразный и богатый опыт постоянный количественный рост в сфере нашей активности
                        требует от нас анализа позиций, занимаемых участниками в отношении поставленных задач.
                    </Text>
                    <Text style={styles.content}>
                        Равным образом сложившаяся структура организации представляет собой интересный эксперимент проверки дальнейших
                        направлений развития. Разнообразный и богатый опыт постоянный количественный рост в сфере нашей активности
                        требует от нас анализа позиций, занимаемых участниками в отношении поставленных задач.
                    </Text>
                </ScrollView>
            </View>

            <Buttons onPress={handleAccept} title='Подтвердить согласие' />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        paddingHorizontal: 16,
        paddingBottom: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        color: '#fff',
        fontSize: 18,
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        borderRadius: 12,
        marginBottom: 20
    },
    scrollView: {
        padding: 16,
        backgroundColor: '#E8E8E8',
        borderRadius: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#1A1A1A',
    },
    content: {
        fontSize: 14,
        color: '#1A1A1A',
        lineHeight: 22,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#E53935',
        paddingVertical: 16,
        borderRadius: 8,
        marginHorizontal: 16,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default Offer