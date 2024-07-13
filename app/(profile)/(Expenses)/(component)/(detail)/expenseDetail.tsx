import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useFocusEffect, useNavigation } from 'expo-router';
import { masterExpense } from '@/helpers/state_managment/expence/ecpense';
import ExpenseCard from '../card';
import ExpenseArendaCard from '../card/ExpenseArenda';

const ExpenseDetail: React.FC = () => {
    const [showCreateExpense, setShowCreateExpense] = useState(false);
    const [expenses, setExpenses] = useState<any>([])
    const navigation = useNavigation<any>();
    const { expense, setExpense } = masterExpense()

    useEffect(() => {
        console.log(expense);
    }, [expense])

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    setExpenses(expense)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }, [setExpense, expense])
    );

    const handleAddExpense = () => {
        setShowCreateExpense(true);
    };

    return (
        <View style={styles.container}>
            <NavigationMenu name='Expense' />
            <View style={styles.container}>
                {
                    expenses && expenses.length > 0 ? <FlatList
                        data={expenses}
                        renderItem={({ item }) => <ExpenseArendaCard item={item} />}
                        keyExtractor={(item) => item.id}
                    /> : <Text style={styles.infoText}>Расходы по аренде</Text>
                }
            </View>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('(profile)/(Expenses)/(component)/CreateExpense/CreateExpense')}
            >
                <FontAwesome name="plus-circle" size={24} color="#fff" style={styles.addButtonIcon} />
                <Text style={styles.addButtonText}>Добавить расход по аренде</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        width: '100%',
        backgroundColor: '#21212E',
    },
    infoText: {
        color: '#cccccc',
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: '#9C0A35',
        position: 'absolute',
        borderRadius: 8,
        paddingBottom: 16,
        paddingTop: 16,
        bottom: 1,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonIcon: {
        marginRight: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ExpenseDetail;
