import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CreateExpense from '../../(component)/CreateExpense/CreateExpense';  // Make sure this is the correct path to your CreateExpense component
import NavigationMenu from '@/components/navigation/navigation-menu';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExpenseDetail: React.FC = () => {
    const [showCreateExpense, setShowCreateExpense] = useState(false);

    const handleAddExpense = () => {
        setShowCreateExpense(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='Expense' />
            <View style={styles.container}>
                {showCreateExpense ? (
                    <>
                        <Text style={styles.infoText}>У вас еще нет расходов по аренде</Text>
                        <TouchableOpacity
                            onPress={handleAddExpense}
                            style={styles.addButton}
                        >
                            <FontAwesome name="plus-circle" size={24} color="#fff" style={styles.addButtonIcon} />
                            <Text style={styles.addButtonText}>Добавить расход по аренде</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <CreateExpense setShowCreateExpense={setShowCreateExpense} />
                )}
            </View>
        </SafeAreaView>
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
        backgroundColor: '#E74C3C',
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
