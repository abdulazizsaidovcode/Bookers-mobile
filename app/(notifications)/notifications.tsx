import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import { RootStackParamList } from '@/type/root';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  '(notifications)/notification'
>;

const NotificationSettings: React.FC = () => {
  const { isSwitch, setIsSwitch } = useNotificationsStore();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const toggleSwitch = () => {
    setIsSwitch(!isSwitch);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <NavigationMenu name='Настройка уведомлений' />
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Отключить все уведомления</Text>
          <Switch value={isSwitch} onValueChange={toggleSwitch} />
        </View>
        <Text style={styles.header}>Настройте уведомления приложения</Text>
        <NotificationOption
          icon={<FontAwesome5 name="sms" size={30} color="#9C0A35" />}
          label="Месенджеры"
          subLabel="SMS"
          onPress={() => navigation.navigate('(notifications)/(pages)/messengers')}
          />
        <NotificationOption
          icon={<MaterialIcons name="notifications" size={30} color="#9C0A35" />}
          label="Напоминать о записи"
          subLabel="Не настроено"
          onPress={() => navigation.navigate('(notifications)/(pages)/remind-about-appointment')}
        />
        <NotificationOption
          icon={<MaterialIcons name="cancel" size={30} color="#9C0A35" />}
          label="Отмена записи"
          subLabel="Не настроено"
          onPress={() => navigation.navigate('(notifications)/(pages)/cancel-recording')}
        />
        <NotificationOption
          icon={<Feather name="edit" size={30} color="#9C0A35" />}
          label="Изменение записи"
          subLabel="Не настроено"
          onPress={() => navigation.navigate('(notifications)/(pages)/changing-an-entry')}
        />
        <NotificationOption
          icon={<Feather name="message-circle" size={30} color="#9C0A35" />}
          label="Запрос отзыва"
          subLabel="Не настроено"
          onPress={() => navigation.navigate('(notifications)/(pages)/request-feedback')}
        />
        <NotificationOption
          icon={<Feather name="bell" size={30} color="#9C0A35" />}
          label="Запрос окошка"
          subLabel="Не настроено"
          onPress={() => navigation.navigate('(notifications)/(pages)/request-window')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

interface NotificationOptionProps {
  icon: React.ReactNode;
  label: string;
  subLabel: string;
  onPress: () => void | undefined;
}

const NotificationOption: React.FC<NotificationOptionProps> = ({
  icon,
  label,
  subLabel,
  onPress,
}) => (
  <Pressable onPress={onPress} style={styles.optionContainer}>
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
    flex: 1,
    padding: 16,
    backgroundColor: '#21212E',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  switchLabel: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#B9B9C9',
    borderRadius: 15,
    marginBottom: 16,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subLabel: {
    color: '#4F4F4F',
    fontSize: 14,
  },
});

export default NotificationSettings;
