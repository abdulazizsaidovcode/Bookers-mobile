import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { selectedExpenseCategory } from '@/helpers/state_managment/expence/ecpense';
import { postExpence } from '@/helpers/api-function/expence/expence';

const CreateExpense: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const { expenseId } = selectedExpenseCategory();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate: any) => {
        setDate(selectedDate);
        hideDatePicker();
    };

    const handleSave = () => {
        const expenseData = {
            date: date.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
            price: parseFloat(amount),
            comment: description,
            expenseCategoryId: expenseId
        };

        if (amount.trim() && description.trim()) {
            postExpence(expenseData);                   
        }else {
            alert('Заполните все поля');
        }
    };

    useEffect(() => {
        console.log(expenseId);
    }, [expenseId]);

    return (
        <View style={styles.container}>
            <NavigationMenu name='Expense' />
            <Text style={styles.label}>Дата оплаты</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
                <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                <FontAwesome name="calendar" size={24} color="#9C0A35" />
            </TouchableOpacity>
            <Text style={styles.label}>Сумма</Text>
            <TextInput
                style={styles.input}
                placeholder="Введите сумму"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Text style={styles.label}>Описание</Text>
            <TextInput
                style={styles.textarea}
                placeholder="Введите описание"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
            />
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Сохранить</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 16,
        width: '100%',
    },
    label: {
        color: '#fff',
        marginBottom: 8,
    },
    datePicker: {
        backgroundColor: '#4B4B64',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    dateText: {
        color: '#fff',
    },
    input: {
        backgroundColor: '#4B4B64',
        borderRadius: 8,
        marginBottom: 16,
        color: '#fff',
    },
    textarea: {
        backgroundColor: '#4B4B64',
        borderRadius: 8,
        marginBottom: 16,
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#9C0A35',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 'auto',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CreateExpense;
