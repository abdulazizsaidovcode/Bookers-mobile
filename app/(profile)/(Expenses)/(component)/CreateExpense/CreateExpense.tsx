import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { masterExpense, selectedExpenseCategory } from '@/helpers/state_managment/expence/ecpense';
import { getExpence, postExpence } from '@/helpers/api-function/expence/expence';
import CalendarComponent from '@/components/calendar/calendar';
import financeStore from '@/helpers/state_managment/finance/financeStore';
import Buttons from '@/components/(buttons)/button';
import { useNavigation } from 'expo-router';
import LoadingButtons from '@/components/(buttons)/loadingButton';
import tw from 'tailwind-react-native-classnames';

const CreateExpense: React.FC = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [response, setResponse] = useState(null);
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);
    const { setExpense } = masterExpense()
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
    }, [response, setResponse])

    const handleSave = () => {
        const expenseData = {
            date: date,
            price: parseFloat(amount),
            comment: description,
            expenseCategoryId: expenseId
        };

        if (amount.trim() && description.trim() && date) {
            setLoading(true);
            postExpence(expenseData, setResponse, () => getExpence(expenseId, setExpense));
        } else {
            console.log(expenseData);

            alert('Заполните все поля');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='Expense' />
            <View style={{ padding: 16 }}>
                <Text style={styles.label}>Дата оплаты</Text>
                <CalendarComponent color='#4B4B64' />
                <Text style={[tw`mt-3`, styles.label]}>Сумма</Text>
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
            </View>
            <View style={styles.saveButton}>
                {
                    loading ?
                        <LoadingButtons title='Сохранить' />
                        :
                        <Buttons title='Сохранить' isDisebled={!!amount.trim() && !!description.trim() || loading} onPress={handleSave} />
                }
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
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
        marginBottom: 20,
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
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 'auto',
        paddingHorizontal: 16
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
