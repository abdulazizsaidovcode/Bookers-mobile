import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { FromAddressBookList } from '@/components/clients/client-items';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationMenu from '@/components/navigation/navigation-menu';
// import { addressBookClients } from './data/clients'; // Assume this is the data source for address book clients

const AddressBookClients: React.FC = () => {
    const navigation = useNavigation();

    const handleSelect = (clientId: string) => {
        // navigation.navigate('ClientDetails', { clientId });
    };

    const addressBookClients = [
        { id: '3', name: 'Анна Смирнова', phone: '+998 95 123-45-67', image: 'https://picsum.photos/200/300' },
        { id: '4', name: 'Елена Кузнецова', phone: '+998 96 123-45-67', image: 'https://picsum.photos/200/300' },
        // Qo'shimcha mijozlar
    ];

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='booking' />
            <FlatList
                data={addressBookClients}
                renderItem={({ item }) => (
                    <FromAddressBookList client={item} clicks={() => handleSelect(item.id)} />
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

export default AddressBookClients;
