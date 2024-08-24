import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import * as Contacts from 'expo-contacts';
import {ContactItems} from '@/components/clients/client-items';
import clientStore from '@/helpers/state_managment/client/clientStore';
import tw from 'tailwind-react-native-classnames';
import {useFocusEffect} from "expo-router";

const pageSize = 50;

export const requestContactPermission = async (
    setContacts: (val: Contacts.Contact[] | any) => void,
    page: number = 0
) => {
    const {status} = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
        const {data} = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
            pageOffset: page * pageSize,
            pageSize: pageSize,
        });

        if (data.length > 0) {
            const filteredContacts = data.filter(contact =>
                contact.phoneNumbers?.some((phone: any) => /^\+998\d{9}$/.test(phone.number))
            );

            setContacts((prevContacts: Contacts.Contact[]) => [...prevContacts, ...filteredContacts]);
        } else setContacts([]);
    } else Alert.alert('Permission Denied', 'Contacts permission denied');
};


const ContactList: React.FC = () => {
    const {setSelectedClientList} = clientStore();
    const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Contacts.Contact[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    useFocusEffect(useCallback(() => {
        requestContactPermission(setContacts)
    }, []))

    useEffect(() => {
        setSelectedClientList(selectedContacts);
    }, [selectedContacts]);

    const handleContactSelect = (contact: Contacts.Contact) => {
        if (selectedContacts.some(item => item.id === contact.id)) {
            setSelectedContacts(selectedContacts.filter(item => item.id !== contact.id));
        } else setSelectedContacts([...selectedContacts, contact]);
    };

    return (
        <View>
            {contacts.length > 0 ? (
                <FlatList
                    data={contacts.slice(0, (currentPage + 1) * pageSize)}
                    renderItem={({item}) => (
                        <ContactItems
                            client={item}
                            onSelect={() => handleContactSelect(item)}
                            isSelected={selectedContacts.some(contact => contact.id === item.id)}
                        />
                    )}
                    onEndReached={async () => {
                        setCurrentPage(prevPage => {
                            const nextPage = prevPage + 1;
                            requestContactPermission(setContacts, nextPage);
                            return nextPage;
                        });
                    }}
                    onEndReachedThreshold={0.5}
                />
            ) : (
                <View style={tw`flex-1 justify-center items-center`}>
                    <Text style={tw`text-center text-base font-semibold text-white`}>
                        У вас пока нет ни одного клиента
                    </Text>
                </View>
            )}
        </View>
    );
};

export default ContactList;
