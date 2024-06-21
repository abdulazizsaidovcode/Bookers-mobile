import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import ChatCard from '../userCard/card'; // Ensure this path is correct
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(chat)/(communicatie)/chatDetails'>;

const ChatList: React.FC<{ userData: any }> = ({ userData }) => {
    const [messages, setMessages] = useState<any[]>(userData);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    useEffect(() => {
        setMessages(userData);
    }, [userData]);

    const handleLongPress = (id: string) => {
        if (!showDeleteButton) {
            setSelectedIds([id]);
            setShowDeleteButton(true);
        }
    };

    const handlePress = (id: string) => {
        let updatedSelectedIds;

        if (showDeleteButton) {
            if (selectedIds.includes(id)) {
                updatedSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
            } else {
                updatedSelectedIds = [...selectedIds, id];
            }
            setSelectedIds(updatedSelectedIds);
            if (updatedSelectedIds.length === 0) {
                setShowDeleteButton(false);
            }
        } else {
            navigation.navigate('(chat)/(communicatie)/chatDetails', { id });
        }
    };

    const handleDelete = () => {
        setMessages(messages.filter((message) => !selectedIds.includes(message.userId)));
        setSelectedIds([]);
        setShowDeleteButton(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Поиск сообщений"
                placeholderTextColor="#fff"
            />
            {showDeleteButton && (
                <View style={styles.deleteButtonContainer}>
                    <View style={styles.selectedCountContainer}>
                        <Text style={styles.selectedCountText}>{selectedIds.length}</Text>
                        <MaterialIcons style={styles.cancelIcon} name="cancel" size={24} color="black" />
                    </View>
                    <Button title="Delete" onPress={handleDelete} color="#E74C3C" />
                </View>
            )}
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <ChatCard
                        item={item}
                        onPress={() => handlePress(item.userId)}
                        onLongPress={() => handleLongPress(item.userId)}
                        isSelected={selectedIds.includes(item.userId)}
                    />
                )}
                keyExtractor={(item) => item.userId}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    textInput: {
        backgroundColor: '#4B5563',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        color: '#fff',
    },
    deleteButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    selectedCountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCountText: {
        color: '#9CA3AF',
        marginRight: 12,
        fontSize: 20,
    },
    cancelIcon: {
        color: '#9CA3AF',
    },
});

export default ChatList;
