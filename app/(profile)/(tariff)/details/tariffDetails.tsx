// DetailPage.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type DetailPageRouteProp = RouteProp<{ "(profile)/(tariff)/details/tariffDetails": { tariff: any } }, '(profile)/(tariff)/details/tariffDetails'>;

const TariffDetailPage: React.FC = () => {
  const route = useRoute<DetailPageRouteProp>();
  const { tariff } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{tariff.name}</Text>
        <Text style={styles.price}>{tariff.price}</Text>
        <Text style={styles.header}>Доступные функции:</Text>
        {tariff.details.map((detail: string, index: number) => (
          <Text key={index} style={styles.detail}>{index + 1}. {detail}</Text>
        ))}
        <TouchableOpacity style={styles.activateButton}>
          <Text style={styles.buttonText}>Активировать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2b2b2b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
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
  price: {
    color: '#666',
    marginBottom: 10,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    color: '#666',
    marginBottom: 5,
  },
  activateButton: {
    backgroundColor: '#9C0A35',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});

export default TariffDetailPage;
