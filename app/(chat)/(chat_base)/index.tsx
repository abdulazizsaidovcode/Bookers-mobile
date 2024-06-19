import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ChatCard from '../userCard/card';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChatList: React.FC<{ userData: any }> = ({ userData }) => {
    const [messages, setMessages] = useState<any[]>(userData);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const navigation = useNavigation();

    // use effect bolmasa birinchi render bolayotganda ishlaydi
    useEffect(() => {
        setMessages(userData);
    }, [userData])


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
                        isSelected={selectedIds.includes(item.userId)}
                    />
                )}
                keyExtractor={(item) => item.userId}
            />
        </View>
    );
};

export default ChatList;
