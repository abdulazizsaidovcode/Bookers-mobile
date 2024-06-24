import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ExpenseCard from './(component)/card/index';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';

const expenses = [
  {
    id: '1',
    title: 'Аренда',
    description: 'Не добавлено',
    amount: '0,00 сум',
    icon: 'home',
  },
];

const Expenses: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationMenu name='Expenses'/>
      <Text style={styles.headerText}>
        Добавляйте свои расходы, что бы видеть свою прибыль
      </Text>
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ExpenseCard item={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        // onPress={() => navigation.navigate('CreateExpenseCategory')}
      >
        <FontAwesome name="plus-circle" size={24} color="#fff" style={styles.addButtonIcon} />
        <Text style={styles.addButtonText}>Создать категорию расхода</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
    padding: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#E74C3C',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Expenses;
