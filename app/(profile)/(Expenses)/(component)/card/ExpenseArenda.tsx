import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { masterExpense } from '@/helpers/state_managment/expence/ecpense';
import { getExpence } from '@/helpers/api-function/expence/expence';

const ExpenseArendaCard = ({ item }: any) => {
    const navigation = useNavigation<any>();

    const { setExpense, expense } = masterExpense()

   console.log(expense);
   
    return (
        <View
            style={styles.container}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.date}</Text>
            </View>
            <Text style={styles.amount}>{item.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B9B9C9', // equivalent to bg-gray-700
        padding: 16, // equivalent to p-4
        paddingVertical: 28, // equivalent to pt-2
        borderRadius: 8, // equivalent to rounded-lg
        marginBottom: 16, // equivalent to mb-4
        flexDirection: 'row', // equivalent to flex-row
        alignItems: 'center', // equivalent to items-center
    },
    textContainer: {
        flex: 1, // equivalent to flex-1
    },
    title: {
        fontSize: 16, // equivalent to text-lg
        color: '#333', // equivalent to text-white
        fontWeight: 'bold', // equivalent to font-bold
    },
    amount: {
        fontSize: 16, // equivalent to text-lg
        color: '#9C0A35', // equivalent to text-red-500
        fontWeight: 'bold', // equivalent to font-bold
    },
    chevron: {
        marginLeft: 16, // equivalent to ml-4
    },
});

export default ExpenseArendaCard;
