// ChatSupport.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/(buttons)/custom';
import ChatList from './(chat_base)';
import { GetChatList } from '@/helpers/api-function/chat/chat';
import chatStore from '@/helpers/state_managment/chat/chatStore';
import { useStomp } from '@/context/StompContext';

const ChatSupport = () => {
    const { stompClient, adminId } = useStomp();
    const { chatData, setChatData } = chatStore();

    const [recipientId, setRecipientId] = useState<string | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    
    useEffect(() => {
        if (stompClient) {
            stompClient.subscribe(`/user/${adminId}/queue/messages`, (response: any) => {
                const receivedMessage = JSON.parse(response.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        }
        GetChatList({
            setData: setChatData
        });
    }, []);

    const handlePress = () => {
        console.log('Support button pressed');
    };

    return (
        <View style={tw`flex-1 bg-gray-900`}>
            {/* <Navbar back={false} centerName={false} name='Chat' icons={false} /> */}
            <View style={tw`justify-center items-center bg-gray-900 p-4`}>
                {false &&
                    <View>
                        <Text style={tw`text-white text-2xl font-bold mb-8`}>Чат</Text>
                        <Ionicons name="chatbubble-ellipses-outline" size={80} color="gray" style={tw`mb-8`} />
                        <Text style={tw`text-white text-lg font-bold mb-2`}>Поддержка Bookers</Text>
                        <Text style={tw`text-gray-400 text-center mb-8`}>Свяжитесь с нами когда вам будет удобно 885305533</Text>
                        <CustomButton
                            title="Написать в поддержку"
                            backgroundColor="#A42E2B"
                            textColor="#FFFFFF"
                            onPress={handlePress}
                        />
                    </View>
                }
                <ChatList userData={chatData} />
            </View>
        </View>
    );
};

export default ChatSupport;
