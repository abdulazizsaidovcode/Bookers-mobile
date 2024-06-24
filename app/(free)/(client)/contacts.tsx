import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Contacts, { Contact } from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

    const requestContactPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts Permission',
                    message: 'This app would like to view your contacts.',
                    buttonPositive: 'Please accept',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                loadContacts();
            } else {
                Alert.alert('Permission Denied', 'Contacts permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const loadContacts = () => {
        console.log(Contacts)
        if (Contacts && Contacts.getAll) {
            Contacts.getAll()
                .then(contacts => {
                    setContacts(contacts);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            console.log('Contacts module is not properly initialized.');
        }
    };

    const handleContactSelect = (contact: Contact) => {
        if (selectedContacts.includes(contact)) {
            setSelectedContacts(selectedContacts.filter(item => item.recordID !== contact.recordID));
        } else {
            setSelectedContacts([...selectedContacts, contact]);
        }
    };

    const renderContact = ({ item }: { item: Contact }) => (
        <TouchableOpacity style={styles.contactItem} onPress={() => handleContactSelect(item)}>
            <Image source={{ uri: item.thumbnailPath || undefined }} style={styles.contactImage} />
            <View style={styles.contactText}>
                <Text style={styles.contactName}>{item.displayName}</Text>
                {item.phoneNumbers.length > 0 && <Text style={styles.contactPhone}>{item.phoneNumbers[0].number}</Text>}
            </View>
            <CheckBox
                value={selectedContacts.includes(item)}
                onValueChange={() => handleContactSelect(item)}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={item => item.recordID}
                renderItem={renderContact}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => requestContactPermission()}>
                <Text style={styles.addButtonText}>open</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => console.log(selectedContacts)}>
                <Text style={styles.addButtonText}>Добавить</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    contactImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    contactText: {
        flex: 1,
        marginLeft: 15,
    },
    contactName: {
        color: '#fff',
        fontSize: 16,
    },
    contactPhone: {
        color: '#aaa',
        fontSize: 14,
    },
    addButton: {
        backgroundColor: '#f00',
        padding: 15,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ContactList;
