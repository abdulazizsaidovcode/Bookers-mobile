import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useNavigation } from 'expo-router';
import { masterExpense } from '@/helpers/state_managment/expence/ecpense';
import ExpenseCard from '../card';

const ExpenseDetail: React.FC = () => {
    const [showCreateExpense, setShowCreateExpense] = useState(false);
    const navigation = useNavigation<any>();
    const { expense } = masterExpense()

    useEffect(() => {
        console.log(expense);
    }, [expense])

    const handleAddExpense = () => {
        setShowCreateExpense(true);
    };

    return (
        <View style={styles.container}>
            <NavigationMenu name='Expense' />
            <View style={styles.container}>
                {
                    expense ? <FlatList
                        data={expense}
                        renderItem={({ item }) => <ExpenseCard item={item} />}
                        keyExtractor={(item) => item.id}
                    /> : <Text style={styles.infoText}>Расходы по аренде</Text>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    head: {
        flex: 1,
        backgroundColor: '#21212E',
        width: '100%',
        padding: 16,

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#21212E',
    },
    infoText: {
        color: '#cccccc',
        marginBottom: 16,
    },
    addButton: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: '#9C0A35',
        padding: 16,
        borderRadius: 8,
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
