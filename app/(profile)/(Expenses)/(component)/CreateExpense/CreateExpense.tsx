import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { selectedExpenseCategory } from '@/helpers/state_managment/expence/ecpense';
import { postExpence } from '@/helpers/api-function/expence/expence';
import CalendarComponent from '@/components/calendar/calendar';
import financeStore from '@/helpers/state_managment/finance/financeStore';
import Buttons from '@/components/(buttons)/button';
import { useNavigation } from 'expo-router';

const CreateExpense: React.FC = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [response, setResponse] = useState(null);
    const navigation = useNavigation<any>();

    const [loading, setLoading] = useState(false);

    const { expenseId } = selectedExpenseCategory();
    const { date } = financeStore();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    useEffect(() => {
        console.log(response);
        
        if (response) {
            setLoading(false);
            navigation.goBack()
        }
    }, [response,setResponse])

    const handleSave = () => {
        const expenseData = {
            date: date,
            price: parseFloat(amount),
            comment: description,
            expenseCategoryId: expenseId
        };

        if (amount.trim() && description.trim() && date) {
            setLoading(true);
            postExpence(expenseData, setResponse);
        } else {
            console.log(expenseData);

            alert('Заполните все поля');
        }
    };

    return (
        <View style={styles.container}>
            <NavigationMenu name='Expense' />
            <Text style={styles.label}>Дата оплаты</Text>
            <CalendarComponent color='#4B4B64' />
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
            {loading ?
                <View style={styles.saveButton}>
                    <View style={styles.loading}>
                        <ActivityIndicator size="small" color="#fff" />
                    </View>
                </View>
                :
                <View style={styles.saveButton}>
                    <Buttons title='Сохранить' isDisebled={!!amount.trim() && !!description.trim() || loading} onPress={handleSave} />
                </View>

            }
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
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 'auto',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loading: {
        paddingHorizontal: 16,
        paddingVertical: 13,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 8,
        color: '#fff',
    },
});

export default CreateExpense;
