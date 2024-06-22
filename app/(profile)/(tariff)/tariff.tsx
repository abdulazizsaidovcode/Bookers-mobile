// TariffsPage.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(profile)/(tariff)/tariff'>;


const tariffs = [
  {
    name: 'Тариф бесплатный',
    description: 'Стандартный набор функций',
    price: 'Срок до: 31.12.2024',
    details: ['Бронирование услуг', 'Галерея', 'Предоплата']
  },
  {
    name: 'Тариф STANDART',
    description: 'Продвинутый набор функций',
    price: '49 000 в месяц',
    trial: 'Пробный период доступен на 3 месяца',
    details: ['Бронирование услуг', 'Галерея', 'Предоплата', 'Еще функции']
  },
];

const TariffsPage: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleDetailsPress = (tariff: any) => {
    // navigation.navigate('(profile)/(tariff)/tariff ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <NavigationMenu name='Tarifi' />
        <View >
          {tariffs.map((tariff, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.name}>{tariff.name}</Text>
              <Text style={styles.description}>{tariff.description}</Text>
              <Text style={styles.price}>{tariff.price}</Text>
              {tariff.trial && <Text style={styles.trial}>{tariff.trial}</Text>}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.activateButton}>
                  <Text style={styles.buttonText}>Активировать</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsButton} onPress={() => handleDetailsPress(tariff)}>
                  <Text style={[styles.buttonText, styles.detailsButtonText]}>Подробнее</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    marginVertical: 5,
    color: '#666',
  },
  price: {
    color: '#666',
  },
  trial: {
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  activateButton: {
    backgroundColor: '#9C0A35',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  detailsButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#9C0A35',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
  },
  detailsButtonText: {
    color: '#9C0A35',
  },
});

export default TariffsPage;
