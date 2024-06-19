import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateExpense = ({ setShowCreateExpense }: any) => {
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
        <View style={tw`flex-1 bg-gray-900 w-full`}>
            <Text style={tw`text-white mb-2 w-full`}>Дата оплаты</Text>
            <TouchableOpacity onPress={showDatePicker} style={tw`bg-gray-700 p-2 rounded-lg mb-4 flex-row justify-between items-center`}>
                <Text style={tw`text-white`}>{date.toLocaleDateString()}</Text>
                <FontAwesome name="calendar" size={24} color="#E74C3C" />
            </TouchableOpacity>
            {/* <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            /> */}

            <Text style={tw`text-white mb-2 w-full`}>Сумма</Text>
            <TextInput
                style={tw`bg-gray-700 rounded-lg mb-4 text-white`}
                placeholder="Введите сумму"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <Text style={tw`text-white mb-2`}>Описание</Text>
            <TextInput
                style={tw`bg-gray-700 rounded-lg mb-4 text-white`}
                placeholder="Введите описание"
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity onPress={handleSave} style={tw`bg-gray-500 p-4 rounded-lg mt-auto`}>
                <Text style={tw`text-white text-center font-bold`}>Сохранить</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateExpense;
