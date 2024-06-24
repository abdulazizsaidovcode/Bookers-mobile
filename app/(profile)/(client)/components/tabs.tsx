import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <View style={styles.tabs}>
            <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'allClients' && styles.activeTab]} 
                onPress={() => onTabChange('allClients')}
            >
                <Text style={[styles.tabText, activeTab === 'allClients' && styles.activeTabText]}>Все клиенты</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'addressBook' && styles.activeTab]} 
                onPress={() => onTabChange('addressBook')}
            >
                <Text style={[styles.tabText, activeTab === 'addressBook' && styles.activeTabText]}>Из адресной книги</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    tabButton: {
        padding: 10,
        borderRadius: 5,
        borderColor: '#9C0A35',
        borderWidth: 1,
    },
    activeTab: {
        backgroundColor: '#9C0A35',
    },
    tabText: {
        color: '#fff',
    },
    activeTabText: {
        color: '#fff',
    },
});

export default Tabs;
