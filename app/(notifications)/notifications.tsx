import React from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationSettings = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Отключить все уведомления</Text>
                    <Switch value={true} />
                </View>
                <Text style={styles.header}>Настройте уведомления приложения</Text>
                <NotificationOption
                    icon={<FontAwesome5 name="sms" size={24} color="#F76C6C" />}
                    label="Месенджеры"
                    subLabel="SMS"
                />
                <NotificationOption
                    icon={<MaterialIcons name="notifications" size={24} color="#F76C6C" />}
                    label="Напоминать о записи"
                    subLabel="Не настроено"
                />
                <NotificationOption
                    icon={<MaterialIcons name="cancel" size={24} color="#F76C6C" />}
                    label="Отмена записи"
                    subLabel="Не настроено"
                />
                <NotificationOption
                    icon={<Feather name="edit" size={24} color="#F76C6C" />}
                    label="Изменение записи"
                    subLabel="Не настроено"
                />
                <NotificationOption
                    icon={<Feather name="message-circle" size={24} color="#F76C6C" />}
                    label="Запрос отзыва"
                    subLabel="Не настроено"
                />
                <NotificationOption
                    icon={<Feather name="bell" size={24} color="#F76C6C" />}
                    label="Запрос окошка"
                    subLabel="Не настроено"
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const NotificationOption: React.FC<{ icon: any, label: string, subLabel: string }> = ({ icon, label, subLabel }) => (
    <TouchableOpacity style={styles.optionContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.textContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.subLabel}>{subLabel}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#21212E'
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },
    switchLabel: {
        color: '#FFFFFF',
        fontSize: 16
    },
    header: {
        color: '#FFFFFF',
        fontSize: 18,
        marginBottom: 16
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#29263A',
        borderRadius: 8,
        marginBottom: 16
    },
    iconContainer: {
        marginRight: 16
    },
    textContainer: {
        flex: 1
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16
    },
    subLabel: {
        color: '#7A758E',
        fontSize: 14
    }
});

export default NotificationSettings;