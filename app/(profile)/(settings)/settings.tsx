import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import SettingsGallery from '@/app/(settings)/(settings-gallery)/settings-gallery';

const SettingsPage: React.FC = () => {
    const navigation = useNavigation();

    const navigateTo = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <NavigationMenu name='Настройки'/>
                {[
                    { icon: 'image', label: 'Галерея', screen: '(settings)/(settings-gallery)/settings-gallery' },
                    { icon: 'check-square', label: 'Услуги', screen: 'Services' },
                    { icon: 'briefcase', label: 'Место работы', screen: 'WorkLocation' },
                    { icon: 'calendar', label: 'Расписание работы', screen: 'WorkSchedule' },
                    { icon: 'calendar-check', label: 'Онлайн бронирование', screen: 'OnlineBooking' },
                    { icon: 'bell', label: 'Настройки уведомлений', screen: 'NotificationSettings' },
                    { icon: 'cogs', label: 'Настройки приложения', screen: '(profile)/(settings)/(childSettings)/(Application Settings)/index' },
                    { icon: 'user', label: 'Личные данные', screen: '(profile)/(settings)/(childSettings)/Personal data/PersonalData' }
                ].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => navigateTo(item.screen)}
                    >
                        <View style={styles.menuItemContent}>
                            <FontAwesome name={item.icon} size={20} color="#9C0A35" />
                            <Text style={styles.menuItemText}>{item.label}</Text>
                        </View>
                        <FontAwesome name="chevron-right" size={20} color="#9C0A35" />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 16,
    },
    header: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#b9b9c9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        color: '#000',
        marginLeft: 16,
    },
});

export default SettingsPage;
