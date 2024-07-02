import React from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import { RootStackParamList } from '@/type/root';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const screenWidht = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(notifications)/notification'>;

const NotificationSettings = () => {
    const {isSwitch, setIsSwitch} = useNotificationsStore();'(notifications)/(pages)/messenger'
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const toggleSwitch = () => {
        setIsSwitch(!isSwitch)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <NavigationMenu name='Настройка уведомлений' />
                </View>
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Отключить все уведомления</Text>
                    <Switch value={isSwitch} onValueChange={toggleSwitch}/>
                </View>
                <Text style={styles.header}>Настройте уведомления приложения</Text>
                <NotificationOption
                    icon={<FontAwesome5 name="sms" size={30} color="#9C0A35" />}
                    label="Месенджеры"
                    subLabel="SMS"
                    link={navigation.navigate('(notifications)/(pages)/messengers')}
                />
                <NotificationOption
                    icon={<MaterialIcons name="notifications" size={30} color="#9C0A35" />}
                    label="Напоминать о записи"
                    subLabel="Не настроено"
                    link=''
                />
                <NotificationOption
                    icon={<MaterialIcons name="cancel" size={30} color="#9C0A35" />}
                    label="Отмена записи"
                    link=''
                    subLabel="Не настроено"
                />
                <NotificationOption
                    icon={<Feather name="edit" size={30} color="#9C0A35" />}
                    label="Изменение записи"
                    link=''
                    subLabel="Не настроено"
                />
                <NotificationOption
                    icon={<Feather name="message-circle" size={30} color="#9C0A35" />}
                    link=''
                    label="Запрос отзыва"
                    subLabel="Не настроено"
                />
                <NotificationOption
                    icon={<Feather name="bell" size={30} color="#9C0A35" />}
                    label="Запрос окошка"
                    link=''
                    subLabel="Не настроено"
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const NotificationOption: React.FC<{ icon: any, label: string, subLabel: string, link: any }> = ({ icon, label, subLabel, link }) => (
    <Pressable onPress={() => link} style={styles.optionContainer}>
        <View style={styles.optionContent}>
            <View style={styles.iconContainer}>{icon}</View>
            <View>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.subLabel}>{subLabel}</Text>
            </View>
        </View>
        <MaterialIcons name="chevron-right" size={30} color="#4F4F4F" />
    </Pressable>
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
        marginBottom: 30
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
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#B9B9C9',
        borderRadius: 15,
        marginBottom: 16
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 16
    },
    label: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    subLabel: {
        color: '#4F4F4F',
        fontSize: 14
    }
});

export default NotificationSettings;
