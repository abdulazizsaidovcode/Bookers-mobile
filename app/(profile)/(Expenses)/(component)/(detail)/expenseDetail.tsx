import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome } from '@expo/vector-icons';
import CreateExpense from '../../(component)/CreateExpense/CreateExpense';  // Make sure this is the correct path to your CreateExpense component

const ExpenseDetail = () => {
    const [showCreateExpense, setShowCreateExpense] = useState(false);

    const handleAddExpense = () => {
        setShowCreateExpense(true);
    };

    return (
        <View style={tw`flex-1 bg-gray-900 p-4 justify-center items-center w-full`}>
            {!showCreateExpense ? (
                <>
                    <Text style={tw`text-gray-400 mb-4`}>У вас еще нет расходов по аренде</Text>
                    <TouchableOpacity
                        onPress={handleAddExpense}
                        style={tw`absolute bottom-4 left-4 right-4 bg-red-700 p-4 rounded-lg flex-row justify-center items-center`}
                    >
                        <FontAwesome name="plus-circle" size={24} color="#fff" style={tw`mr-2`} />
                        <Text style={tw`text-white font-bold`}>Добавить расход по аренде</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <CreateExpense setShowCreateExpense={setShowCreateExpense} />
            )}
        </View>
    );
};

export default ExpenseDetail;
