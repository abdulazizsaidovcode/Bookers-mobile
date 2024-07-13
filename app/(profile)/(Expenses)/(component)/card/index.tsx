import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { masterExpense, selectedExpenseCategory } from '@/helpers/state_managment/expence/ecpense';
import { getExpence } from '@/helpers/api-function/expence/expence';

const ExpenseCard = ({ item }: any) => {
    const navigation = useNavigation<any>();
    const { setExpenseId } = selectedExpenseCategory();

    const { setExpense, expense } = masterExpense()

    function getExpense(id: string) {
        getExpence(id, setExpense)
    }

    
    return (
        <TouchableOpacity
            onPress={() => {
                setExpenseId(item.id);
                getExpense(item.id)
                navigation.navigate("(profile)/(Expenses)/(component)/(detail)/expenseDetail")
            }}
            style={styles.container}
        >
            <FontAwesome
                name='home'
                size={24}
                color="#9C0A35"
                style={styles.icon}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.expensePrice > 0 ? "" : "Не добавлено"}</Text>
            </View>
            <Text style={styles.amount}>{item.expensePrice}</Text>
            <MaterialIcons name="navigate-next" size={36} color='gray' />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B9B9C9', // equivalent to bg-gray-700
        padding: 16, // equivalent to p-4
        borderRadius: 8, // equivalent to rounded-lg
        marginBottom: 16, // equivalent to mb-4
        flexDirection: 'row', // equivalent to flex-row
        alignItems: 'center', // equivalent to items-center
    },
    icon: {
        marginRight: 16, // equivalent to mr-4
    },
    textContainer: {
        flex: 1, // equivalent to flex-1
    },
    title: {
        color: '#333', // equivalent to text-white
        fontWeight: 'bold', // equivalent to font-bold
    },
    description: {
        color: '#4F4F4F', // equivalent to text-gray-400
        marginTop: 4, // equivalent to mt-1
    },
    amount: {
        color: '#9C0A35', // equivalent to text-red-500
        fontWeight: 'bold', // equivalent to font-bold
    },
    chevron: {
        marginLeft: 16, // equivalent to ml-4
    },
});

export default ExpenseCard;
