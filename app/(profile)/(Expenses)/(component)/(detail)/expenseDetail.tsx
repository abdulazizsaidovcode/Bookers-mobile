import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useNavigation } from 'expo-router';

const ExpenseDetail: React.FC = () => {
    const [showCreateExpense, setShowCreateExpense] = useState(false);
    const navigation = useNavigation<any>();


    const handleAddExpense = () => {
        setShowCreateExpense(true);
    };

    return (
        <View style={styles.container}>
            <NavigationMenu name='Expense' />
            <View style={styles.container}>
                {!showCreateExpense ? (
                    <>
                        <Text style={styles.infoText}>У вас еще нет расходов по аренде</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("(profile)/(Expenses)/(component)/(detail)/expenseDetail")}
                            style={styles.addButton}
                        >
                            <FontAwesome name="plus-circle" size={24} color="#fff" style={styles.addButtonIcon} />
                            <Text style={styles.addButtonText}>Добавить расход по аренде</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={styles.infoText}>Расходы по аренде</Text>
                )}
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
