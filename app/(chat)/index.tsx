import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/(buttons)/custom';
import ChatList from './(chat_base)';
import axios from 'axios';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { sockjs_url } from '@/helpers/api';
import { GetChatList } from '@/helpers/api-function/chat/chat';
import chatStore from '@/helpers/state_managment/chat/chatStore';

const ChatSupport = () => {
    // const { role, chatData, setChatData } = chatStore();

    const [sidebarWidth, setSidebarWidth] = useState('w-max');
    const [siteBar, setSiteBar] = useState<boolean>(false);
    const [siteBarClass, setSiteBarClass] = useState<string>('');

    const [recipientId, setRecipientId] = useState<string | null>(null);
    const [adminId, setAdminId] = useState<string | null>(sessionStorage.getItem('userId'));

    const [messages, setMessages] = useState<any[]>([]);
    const [content, setContent] = useState<string>('');
    const [stompClient, setStompClient] = useState<any>(null);

    const [fullName, setFullName] = useState<string>('');
    const [messageStatus, setMessageStatus] = useState('ALL_MESSAGES');
    const [chatId, setChatId] = useState<string | null>(null);
    const [replyId, setreplyId] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null);
    const [photo, setPhoto] = useState<any | null>(null);

    const {chatData, setChatData } = chatStore();

    useEffect(() => {
        connect();
        GetChatList({
            status: "master",
            setData: setChatData
        });
        console.log("aa");
        
    }, []);

    useEffect(() => {
        if (recipientId) {
            // fetchMessages(adminId, recipientId);
        }
    }, [recipientId]);
    console.log("salom");
    console.log(chatData);


    const connect = () => {
        // if (adminId) {
        const socket = new SockJS(sockjs_url);
        const stomp = Stomp.over(socket);

        stomp.connect({}, (frame: any) => {
            console.log('Connected: ' + frame);
            setStompClient(stomp);
            stomp.subscribe(`/user/${adminId}/queue/messages`, (response) => {
                const receivedMessage = JSON.parse(response.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        }, (error: any) => {
            console.error('Error connecting: ', error);
        });
        // }
    };

    // const sendMessage = async () => {
    //     let fileUrl = null;
    //     if (photo) {
    //         console.log(photo);
    //         await uploadFile({
    //             file: photo,
    //             setUploadResponse: (response) => (fileUrl = response.body),
    //         })
    //     }

    //     if (stompClient && recipientId) {
    //         const chatMessage = {
    //             senderId: adminId,
    //             recipientId: recipientId,
    //             content: content,
    //             isRead: false,
    //             attachmentIds: fileUrl ? [fileUrl] : [],
    //         };
    //         console.log(JSON.stringify(chatMessage));

    //         stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
    //         setTimeout(() => {
    //             fetchMessages(adminId, recipientId);
    //         }, 500)
    //         setContent('');
    //     }
    // };

    // const fetchMessages = (adminId: string | null, recipientId: string | null) => {
    //     if (adminId && recipientId) {
    //         axios.get(`${messages_url}/${adminId}/${recipientId}`, config)
    //             .then(res => {
    //                 setMessages(res.data.body);
    //                 console.log(res.data.body);
    //             }).catch(err => {
    //                 if (err.response.status === 404) {
    //                     setMessages([]);
    //                     GetChatList({
    //                         status: role,
    //                         setData: setChatData
    //                     });
    //                 }
    //             });
    //     }
    // };

    // const readAllMessages = () => {
    //     axios.get(`/all-message-ready`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `123`
    //         }
    //     })
    //         .then(res => {
    //             // toast.success('All messages marked as read successfully');
    //             // GetChatList({
    //             //     status: role,
    //             //     setData: setChatData
    //             // })
    //         }).catch(err => {
    //             console.log(err);
    //         });
    // };

    // function readMeessage(id: any) {
    //     if (stompClient && stompClient.connected) {
    //         stompClient.send('/app/isRead', {}, JSON.stringify(id));
    //         fetchMessages(adminId, recipientId);
    //     }
    // }

    // async function replyMessage() {
    //     let fileUrl = null;
    //     if (photo) {
    //         await uploadFile({
    //             file: photo,
    //             setUploadResponse: (response) => (fileUrl = response.body),
    //         })
    //     }
    //     const replyObj = {
    //         messageId: replyId,
    //         chatDto: {
    //             senderId: adminId,
    //             recipientId: recipientId,
    //             content: content,
    //             isRead: false,
    //             attachmentIds: fileUrl ? [fileUrl] : [],
    //         }
    //     }

    //     if ((replyId && content) || fileUrl) {
    //         if (stompClient && stompClient.connected) {
    //             stompClient.send('/app/replay', {}, JSON.stringify(replyObj));
    //             setTimeout(() => {
    //                 fetchMessages(adminId, recipientId);
    //             }, 500)
    //             setContent("")
    //         }
    //     } else {
    //         // toast.error(t("Enter_your_message"));
    //     }
    // }

    // function deleteMessage() {
    //     if (chatId) {
    //         if (stompClient && stompClient.connected) {
    //             setTimeout(() => {
    //                 stompClient.send('/app/deleteMessage', {}, JSON.stringify(chatId));
    //             }, 300)
    //             setTimeout(() => {
    //                 fetchMessages(adminId, recipientId);
    //             }, 500)
    //         }
    //     }
    // }

    // async function editMessage() {
    //     let fileUrl = null;

    //     if (photo) {
    //         await uploadFile({
    //             file: photo,
    //             setUploadResponse: (response) => (fileUrl = response.body),
    //         })
    //     }

    //     const editMessage = {
    //         messageId: editId,
    //         chatDto: {
    //             senderId: adminId,
    //             recipientId: recipientId,
    //             content: content,
    //             isRead: false,
    //             attachmentIds: fileUrl ? [fileUrl] : []
    //         }
    //     }

    //     if ((editId && content) || fileUrl) {
    //         if (stompClient && stompClient.connected) {
    //             stompClient.send('/app/editMessage', {}, JSON.stringify(editMessage));
    //             fetchMessages(adminId, recipientId);
    //             setContent("")
    //         }
    //     } 
    // }
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
                <ChatList />
            </View>
        </View>
    );
};

export default ChatSupport;
