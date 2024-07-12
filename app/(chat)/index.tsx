import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/(buttons)/custom';
import ChatList from './(chat_base)';
import { getChatList } from '@/helpers/api-function/chat/chat';
import chatStore from '@/helpers/state_managment/chat/chatStore';
// import { useStomp } from '@/context/StompContext';
import fetchChatDataStore, { Data } from '@/helpers/state_managment/chat/chatfetchStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Buttons from '@/components/(buttons)/button';

const ChatSupport = () => {
    // const { stompClient, adminId } = useStomp();
    const { chatData, setChatData } = chatStore();
    const { setmessageData, messageData } = fetchChatDataStore();

    const [recipientId, setRecipientId] = useState<string | null>(null);

    // useEffect(() => {
    //     if (stompClient) {
    //         stompClient.subscribe(`/user/${adminId}/queue/messages`, (response: any) => {
    //             const receivedMessage = JSON.parse(response.body);
    //             // setmessageData((prevMessages) => [...prevMessages, receivedMessage]);
    //             console.log(receivedMessage);
    //         });
    //     }
    //     getChatList({ setData: setChatData });
    // }, []);

    const handlePress = () => {
        alert('чат пока не работает');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Чат</Text>
            {/* {chatData && chatData.length > 0 ? ( */}
            <View style={styles.empty}>
                <Ionicons name="chatbubble-ellipses-outline" size={80} color="gray" style={styles.icon} />
                <Text style={styles.supportText}>Поддержка Bookers</Text>
                <Text style={styles.descriptionText}>Свяжитесь с нами когда вам будет удобно</Text>
                <Buttons
                    title="Написать в поддержку"
                    textColor="#FFFFFF"
                    onPress={handlePress}
                />
            </View>
            {/* ) :
                <ChatList userData={chatData} />
            } */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E', // bg-gray-900
        padding: 16,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#ffffff',
        fontSize: 26,
        letterSpacing: 1,
        marginBottom: 20,
    },
    headerText: {
        color: '#FFFFFF', // text-white
        fontSize: 24, // text-2xl
        fontWeight: 'bold', // font-bold
        marginBottom: 32, // mb-8
    },
    icon: {
        marginBottom: 32, // mb-8
    },
    supportText: {
        color: '#FFFFFF', // text-white
        fontSize: 18, // text-lg
        fontWeight: 'bold', // font-bold
        marginBottom: 8, // mb-2
    },
    descriptionText: {
        color: '#9CA3AF', // text-gray-400
        textAlign: 'center', // text-center
        marginBottom: 32, // mb-8
    },
});

export default ChatSupport;
