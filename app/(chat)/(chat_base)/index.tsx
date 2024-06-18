import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ChatCard from '../userCard/card';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

interface Message {
    id: string;
    name: string;
    message: string;
    time: string;
    unread: number;
    avatar: string;
}

export const initialMessages: Message[] = [
    {
        id: '1',
        name: 'Служба поддержки',
        message: 'Уважаемый клиент, мы при ...',
        time: '2:14 PM',
        unread: 1,
        avatar: 'https://picsum.photos/200/300',
    },
    {
        id: '2',
        name: 'Натали',
        message: 'Не могли бы вы принять ме ...',
        time: '2:10 PM',
        unread: 1,
        avatar: 'https://picsum.photos/200/300',
    },
    {
        id: '3',
        name: 'Мелисара',
        message: 'Не могли бы вы принять ме ...',
        time: '10:16 PM',
        unread: 10,
        avatar: 'https://picsum.photos/200/300',
    },
    {
        id: '4',
        name: 'Мадина',
        message: 'Вы: Не могли бы вы принять ...',
        time: 'Среда',
        unread: 0,
        avatar: 'https://picsum.photos/200/300',
    },
];


const ChatList: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const navigation = useNavigation();

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
            router.push('(chat)/(communicatie)/7')
        }

    };

    const handleDelete = () => {
        setMessages(messages.filter((message) => !selectedIds.includes(message.id)));
        setSelectedIds([]);
        setShowDeleteButton(false);
    };

    return (
        <View style={tw`flex-1 bg-gray-900 w-full`}>
            <TextInput
                style={tw`bg-gray-700 rounded-lg p-3 mb-4 text-white py-4`}
                placeholder="Поиск сообщений"
                placeholderTextColor="#aaa"
            />
            {showDeleteButton && (
                <View style={tw`flex-row justify-between mb-2`}>
                    <View style={tw`flex-row justify-center items-center`}>
                        <Text style={tw`text-gray-400 mr-3 text-xl`}>{selectedIds.length}</Text>
                        <MaterialIcons style={tw`text-gray-400`} name="cancel" size={24} color="black" />
                    </View>
                    <Button title="Delete" onPress={handleDelete} color="#E74C3C" />
                </View>
            )}
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <ChatCard
                        item={item}
                        onPress={handlePress}
                        onLongPress={handleLongPress}
                        isSelected={selectedIds.includes(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default ChatList;
