import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ClientPage: React.FC = () => {
    const navigation = useNavigation();
    const handlePress = (clientType: string) => {
        navigation.navigate(clientType);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>salom</Text>
            <TouchableOpacity style={styles.item} onPress={() => handlePress('(profile)/(client)/components/AllClients')}>
                <View style={styles.itemContent}>
                    <FontAwesome name="users" size={24} color="#9C0A35" />
                    <Text style={styles.itemText}>Все клиенты</Text>
                </View>
                <FontAwesome name="chevron-right" size={24} color="#9C0A35" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => handlePress('(profile)/(client)/components/AddressBookClients')}>
                <View style={styles.itemContent}>
                    <FontAwesome name="address-book" size={24} color="#9C0A35" />
                    <Text style={styles.itemText}>Из адресной книги</Text>
                </View>
                <FontAwesome name="chevron-right" size={24} color="#9C0A35" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <FontAwesome name="plus-circle" size={24} color="#fff" />
                <Text style={styles.buttonText}>Создать</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <FontAwesome name="address-book" size={24} color="#fff" />
                <Text style={styles.buttonText}>Добавить из книги</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f1f1f',
        padding: 16,
    },
    header: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        backgroundColor: '#333',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        color: '#fff',
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#9C0A35',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        marginLeft: 8,
    },
});

export default ClientPage;
