import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import NavigationMenu from "@/components/navigation/navigation-menu";
import AntDesign from '@expo/vector-icons/AntDesign';

const NotificationClient = () => {
    return (
        <View style={{ backgroundColor: '#21212E', flex: 1, padding: 10 }}>
            <View style={styles.headerContainer}>
                <NavigationMenu name={"Уведомления"} />
                <AntDesign name="delete" size={24} color="white" />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.header}>
                        <Image
                            source={require('@/assets/avatar.png')}
                            style={styles.avatar}
                        />
                        <Text style={styles.title}>Отмена бронирования</Text>
                    </View>
                    <Text style={styles.description}>
                        Натали - Наращивание 2D ресниц
                        Ваша заявка №12 на 23 февраля была отменена
                    </Text>
                    <View style={styles.footer}>
                        <Text style={styles.date}>20.04.2024 20:57:26</Text>
                        <AntDesign name="right" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                {/* Qo'shimcha kartalar qo'shish uchun NotificationCard komponentini takrorlang */}
                <TouchableOpacity style={styles.card}>
                    <View style={styles.header}>
                        <Image
                            source={require('@/assets/avatar.png')}
                            style={styles.avatar}
                        />
                        <Text style={styles.title}>Отмена бронирования</Text>
                    </View>
                    <Text style={styles.description}>
                        Натали - Наращивание 2D ресниц
                        Ваша заявка №12 на 23 февраля была отменена
                    </Text>
                    <View style={styles.footer}>
                        <Text style={styles.date}>20.04.2024 20:57:26</Text>
                        <AntDesign name="right" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.header}>
                        <Image
                            source={require('@/assets/avatar.png')}
                            style={styles.avatar}
                        />
                        <Text style={styles.title}>Отмена бронирования</Text>
                    </View>
                    <Text style={styles.description}>
                        Натали - Наращивание 2D ресниц
                        Ваша заявка №12 на 23 февраля была отменена
                    </Text>
                    <View style={styles.footer}>
                        <Text style={styles.date}>20.04.2024 20:57:26</Text>
                        <AntDesign name="right" size={24} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <View style={styles.header}>
                        <Image
                            source={require('@/assets/avatar.png')}
                            style={styles.avatar}
                        />
                        <Text style={styles.title}>Отмена бронирования</Text>
                    </View>
                    <Text style={styles.description}>
                        Натали - Наращивание 2D ресниц
                        Ваша заявка №12 на 23 февраля была отменена
                    </Text>
                    <View style={styles.footer}>
                        <Text style={styles.date}>20.04.2024 20:57:26</Text>
                        <AntDesign name="right" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default NotificationClient;

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    scrollViewContent: {
        paddingBottom: 10,
    },
    card: {
        backgroundColor: '#E2E3F3', // Background rangini moslang
        borderRadius: 10,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    description: {
        color: '#555',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        color: '#888',
        fontSize: 12,
    },
});
