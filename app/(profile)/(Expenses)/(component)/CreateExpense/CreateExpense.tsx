import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import NavigationMenu from '@/components/navigation/navigation-menu';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateExpense: React.FC<{ setShowCreateExpense: any }> = ({ setShowCreateExpense }) => {
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

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
        // Save the expense details here
        setShowCreateExpense(false);
    };

    return (
        <View style={styles.container}>
            <NavigationMenu name='Expense' />
            <Text style={styles.label}>Дата оплаты</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
                <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
                <FontAwesome name="calendar" size={24} color="#E74C3C" />
            </TouchableOpacity>
            {/* <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            /> */}

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
        backgroundColor: '#333',
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
        backgroundColor: '#333',
        borderRadius: 8,
        marginBottom: 16,
        color: '#fff',
    },
    textarea: {
        backgroundColor: '#333',
        borderRadius: 8,
        marginBottom: 16,
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#E74C3C',
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
