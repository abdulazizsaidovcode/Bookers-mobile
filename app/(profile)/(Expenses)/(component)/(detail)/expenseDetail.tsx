import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useFocusEffect, useNavigation } from 'expo-router';
import { masterExpense } from '@/helpers/state_managment/expence/ecpense';
import ExpenseArendaCard from '../card/ExpenseArenda';
import Buttons from '@/components/(buttons)/button';

const ExpenseDetail: React.FC = () => {
    const [showCreateExpense, setShowCreateExpense] = useState(false);
    const [expenses, setExpenses] = useState<any>([])
    const navigation = useNavigation<any>();
    const { expense, setExpense } = masterExpense()


    useFocusEffect(
        useCallback(() => {
            console.log(expense);
            const fetchData = async () => {
                try {
                    setExpenses(expense)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
            return;
        }, [setExpense, expense])
    );

    const handleAddExpense = () => {
        setShowCreateExpense(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='Expense' />
            <View style={styles.container}>
                {
                    expenses && expenses.length > 0 ?
                        <FlatList
                            data={expenses}
                            renderItem={({ item }) => <ExpenseArendaCard item={item} />}
                            keyExtractor={(item) => item.id}
                        /> :
                        <Text style={styles.infoText}>Расходы по аренде</Text>
                }
            </View>
            <View style={{ paddingHorizontal: 16 }}>
                <Buttons
                    title='Добавить расход по аренде'
                    icon={<FontAwesome name="plus-circle" size={24} color="#fff" style={styles.addButtonIcon} />}
                    onPress={() => navigation.navigate('(profile)/(Expenses)/(component)/CreateExpense/CreateExpense')}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
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
