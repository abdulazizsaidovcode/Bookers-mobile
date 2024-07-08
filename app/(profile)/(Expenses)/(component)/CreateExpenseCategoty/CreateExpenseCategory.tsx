import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { postExpenceCategory } from '@/helpers/api-function/expence/expence';
import Buttons from '@/components/(buttons)/button';
import { useNavigation } from '@react-navigation/native';

const CreateExpenseCategory: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<any>();

    useEffect(() => {
        if (response) {
            setLoading(false);
            navigation.navigate("(profile)/(Expenses)/index");
        }
    }, [response, navigation]);

    const handleSave = () => {
        let categoryName = {
            name: amount
        };
        if (amount.trim()) {
            setLoading(true);
            postExpenceCategory(categoryName, setResponse);
        }
    };

    return (
        <View style={styles.container}>
            <NavigationMenu name='Расходы' />
            <TextInput
                style={styles.input}
                placeholder="Введите сумму"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Text style={styles.label}>Название категории расхода</Text>
            {loading ?
                <View style={styles.saveButton}>
                    <View style={styles.loading}>
                        <ActivityIndicator size="small" color="#fff" />
                    </View>
                </View>
                :
                <View style={styles.saveButton}>
                    <Buttons title='Сохранить' isDisebled={!!amount.trim() || loading} onPress={handleSave} />
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
    },
    label: {
        color: '#828282',
        marginBottom: 8,
    },
    input: {
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

export default CreateExpenseCategory;
