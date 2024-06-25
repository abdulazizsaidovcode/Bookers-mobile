import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ClientItem } from '@/components/clients/client-items';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
// import { clients } from './data/clients'; // Assume this is the data source for clients

const AllClients: React.FC = () => {
    const navigation = useNavigation();

    const handleSelect = (clientId: string) => {
        // navigation.navigate('ClientDetails', { clientId });
    };

    const clients = [
        { id: '1', name: 'Иван Иванов', phone: '+998 93 123-45-67', image: 'https://picsum.photos/200/300' },
        { id: '2', name: 'Петр Петров', phone: '+998 94 123-45-67', image: 'https://picsum.photos/200/300' },
        // Qo'shimcha mijozlar
    ];


    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='All client' />
            <FlatList
                data={clients}
                renderItem={({ item }) => (
                    <ClientItem client={item} isSelected={false} onSelect={handleSelect} />
                )}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 16,
    },
});

export default AllClients;
