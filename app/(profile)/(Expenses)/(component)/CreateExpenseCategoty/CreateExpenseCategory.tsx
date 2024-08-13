import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { postExpenceCategory } from '@/helpers/api-function/expence/expence';
import Buttons from '@/components/(buttons)/button';
import { useNavigation } from '@react-navigation/native';
import LoadingButtons from '@/components/(buttons)/loadingButton';

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
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='Расходы' />
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Введите сумму"
                    placeholderTextColor="#aaa"
                    value={amount}
                    onChangeText={setAmount}
                />
                <Text style={styles.label}>Название категории расхода</Text>
            </View>
            <View style={styles.saveButton}>
                {loading ?
                    <LoadingButtons title='Сохранить' />
                    :
                    <Buttons title='Сохранить' isDisebled={!!amount.trim() || loading} onPress={handleSave} />
                }
            </View>
        </SafeAreaView>
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
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 'auto',
        paddingHorizontal: 16,
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
