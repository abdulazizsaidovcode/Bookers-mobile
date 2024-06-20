import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import ExpenseCard from './(component)/card/index'
import { FontAwesome } from '@expo/vector-icons';

const expenses = [
  {
    id: '1',
    title: 'Аренда',
    description: 'Не добавлено',
    amount: '0,00 сум',
    icon: 'home',
  },
];

const Expenses = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-gray-900 p-4`}>
      <Text style={tw`text-white text-lg font-bold mb-6`}>
        Добавляйте свои расходы, что бы видеть свою прибыль
      </Text>
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ExpenseCard item={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={tw`absolute bottom-4 left-4 right-4 bg-red-700 p-4 rounded-lg flex-row justify-center items-center`}
        // onPress={() => navigation.navigate('CreateExpenseCategory')}
      >
        <FontAwesome name="plus-circle" size={24} color="#fff" style={tw`mr-2`} />
        <Text style={tw`text-white font-bold`}>Создать категорию расхода</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Expenses;
