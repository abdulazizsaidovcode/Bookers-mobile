import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClientDetails: React.FC<{ route: any }> = ({ route }) => {
  const { type } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Детали клиента</Text>
      <Text style={styles.details}>Тип клиента: {type === 'all' ? 'Все клиенты' : 'Из адресной книги'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    padding: 16,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  details: {
    color: '#ccc',
    fontSize: 18,
  },
});

export default ClientDetails;
