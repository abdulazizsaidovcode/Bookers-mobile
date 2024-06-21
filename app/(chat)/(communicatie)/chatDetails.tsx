import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import { IoSend } from 'react-icons/io5';
import { IoMdAttach } from 'react-icons/io';
import { BiReply, BiReplyAll } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { GiCancel } from 'react-icons/gi';
import { ArrowDownOutlined, EditFilled } from '@ant-design/icons';
import tw from 'tailwind-react-native-classnames';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { fetchMessages } from '@/helpers/api-function/chat/getmessages';
import fetchChatDataStore, { ChatData } from '@/helpers/state_managment/chat/chatfetchStore';
import { useStomp } from '@/context/StompContext';

// Mock data and functions
const getFileId = (file: string) => `https://example.com/files/${file}`;
const chat: ChatSentSmstList[] = []; // Replace with actual chat data
const sendMessage = () => { };
const deleteMessage = () => { };
const replyId = (id: any) => { };
const editId = (id: any) => { };
const deleteId = (id: any) => { };
const markMessageAsRead = (id: any) => { };
const editMessage = (id: any) => { };
const reply = (id: any) => { };

interface ChatSentSmstList {
  id: string;
  senderId: string;
  receiverImg: string;
  senderImg: string;
  senderName: string;
  receiverName: string;
  replayDto: {
    content: string;
    attachmentIds: string[];
  };
  attachmentIds: string[];
  content: string;
  createdAt: string;
  read: boolean;
}

const ChatEmptyState = () => (
  <View style={tw`flex-1 items-center justify-center`}>
    <Text style={tw`text-xl text-white`}>No Messages</Text>
  </View>
);

const ChatDetails = () => {
  const { setmessageData, messageData } = fetchChatDataStore();
  const { stompClient, adminId } = useStomp();

  const [chats, setChats] = useState<any>(messageData);
  const scrolRef = useRef<any>();
  const messageRefs = useRef<Record<string, HTMLDivElement>>({});
  const [selreplyId, setSelreplyId] = useState<string>('');
  const [seleditId, setseleditId] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [attachmentIds, setAttachmentIds] = useState<any>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const chatContainerRef = useRef<ScrollView>(null);
  const checkReadElement = useRef<View>(null);
  const [unReadMessages, setUnReadMessages] = useState<any[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [content, setContent] = useState<string>('');

  const route = useRoute();
  const { id } = route.params as { id: string };

  let senderId = 'cde806d1-1da5-4264-85b6-47d066cadca1';

  useEffect(() => {
    console.log('Chat ID:', id);
    // Fetch the chat data based on the received id
  }, [id]);

  useEffect(() => {
    fetchMessages({
      adminId: "cde806d1-1da5-4264-85b6-47d066cadca1",
      recipientId: id,
      setmessageData
    });
  }, [id]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getUnreadMessages = () => {
    const unread = chats.filter((item: any) => !item.read);
    setUnReadMessages(unread);
  };

  useEffect(() => {
    getUnreadMessages();
  }, [chats]);

  useEffect(() => {
    setChats(chat);
  }, [chat]);

  const handleDelete = () => {
    deleteMessage();
  };

  const handleReply = (id: any) => {
    setseleditId('');
    setSelreplyId(id);
    replyId(id);
    setseleditId('');
    setContent('');
  };

  const handleEdit = (id: any) => {
    let cont = chats.find((item: any) => item.id === id)?.content;
    editId(id);
    setseleditId(id);
    setContent("salom");
    setSelreplyId('');
  };

  const items = (id: any) => [
    {
      key: '1',
      onPress: () => {
        openModal();
        deleteId(id);
      },
      label: 'Delete',
    },
    {
      key: '2',
      onPress: () => handleReply(id),
      label: 'Answer',
    },
    {
      key: '3',
      onPress: () => handleEdit(id),
      label: 'Edit',
    },
  ];

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const setAttachment = (info: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = info.target.files ? info.target.files[0] : null;
    setPhoto(selectedFile);
    setAttachmentIds(selectedFile);

    if (selectedFile) {
      setPhotoPreview(URL.createObjectURL(selectedFile));
    } else {
      setPhotoPreview(null);
    }
  };

  const handleSendMessage = () => {
    sendMessage();
    setPhotoPreview(null);
    setPhoto(null);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrolRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  const sendMessage = async () => {
    let fileUrl = null;
    console.log(stompClient);

    if (stompClient) {
      const chatMessage = {
        senderId: "cde806d1-1da5-4264-85b6-47d066cadca1",
        recipientId: id,
        content: content,
        isRead: false,
        attachmentIds: fileUrl ? [fileUrl] : [],
      };
      console.log(JSON.stringify(chatMessage));

      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      setTimeout(() => {
        fetchMessages({
          adminId: "cde806d1-1da5-4264-85b6-47d066cadca1",
          recipientId: id,
          setmessageData
        });
      }, 500);
      setContent('');
    }
  };

  const scrollToMessage = (messageId: string) => {
    const messageElement = messageRefs.current[messageId];
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth' });
      messageElement.style.backgroundColor = '#85828343';
      messageElement.style.transition = "1s"
      messageElement.style.animationTimingFunction = 'ease-out';
      setTimeout(() => {
        messageElement.style.backgroundColor = 'transparent';
      }, 1000);
    }
  };

  return (
    <View style={tw`h-full relative`}>
      <View style={tw`w-full h-full flex flex-col`}>
        <ScrollView
          style={[tw`flex-1 h-full`, { backgroundColor: "#21212e" }]}
          ref={chatContainerRef}
          onContentSizeChange={() => chatContainerRef.current?.scrollToEnd({ animated: true })}
        >
          {messageData.length > 0 ? (
            messageData.map((item, index) => (
              <Pressable
                onLongPress={() => setSelectedMessageId(item.id)}
                ref={(el) => { messageRefs.current[item.id] = el; }}
                key={index}
                style={[tw`p-2 mb-3 text-white flex-col`, item.senderId === senderId ? tw`flex items-end justify-end flex-col` : tw`flex justify-start`]}
              >
                <View style={tw`flex items-center flex-row mb-2`}>
                  <Image
                    style={tw`w-8 h-8 rounded-full mr-2 bg-black flex flex-row`}
                    source={{ uri: item.senderId !== senderId ? getFileId(item.receiverImg) : getFileId(item.senderImg) }}
                  />
                  <Text style={tw`font-medium text-white`}>{item.senderId === senderId ? item.senderName : item.receiverName}</Text>
                </View>
                <View

                  style={[
                    tw`p-2 rounded-md flex flex-col`,
                    item.replayDto ? { backgroundColor: '#85828343' } : {},
                    item.senderId === senderId ? tw`items-end ml-20` : tw`items-start mr-20`
                  ]}
                >
                  {item.replayDto && (
                    <TouchableOpacity
                      onPress={() => scrollToMessage(item.replayDto.id)}
                      style={tw`flex items-center ${item.senderId === senderId ? 'justify-end flex-row' : 'justify-start flex-row-reverse'}`}
                    >
                      <View style={tw`w-10 h-10 flex justify-center items-center`}>
                        <BiReply style={{ fontSize: 25 }} />
                      </View>
                      <View
                        style={[
                          tw`border-red-800 bg-gray-200 text-black py-1 px-3 mb-1 rounded-md`,
                          item.senderId === senderId ? tw`border-r-2` : tw`border-l-2`
                        ]}
                      >
                        {item.replayDto.content ? item.replayDto.content : <Image source={{ uri: getFileId(item.attachmentIds[0]) }} style={tw`w-10 h-10`} />}
                      </View>
                    </TouchableOpacity>
                  )}
                  {item.attachmentIds.length > 0 && (
                    <View style={tw`relative`}>
                      <Image source={{ uri: getFileId(item.attachmentIds[0]) }} style={tw`rounded-md mb-2`} />
                      {!item.content && (
                        <View style={tw`absolute top-3 right-2`}>
                          {/* Qo'shimcha element */}
                        </View>
                      )}
                    </View>
                  )}
                  {item.content && (
                    <Text
                      style={[
                        tw`flex items-end`,
                        item.senderId === senderId ? tw`bg-white rounded-lg py-2 px-3 shadow max-w-sm w-max` : tw` bg-red-800 text-white rounded-lg py-2 px-3 shadow mb-2 max-w-max flex-col-reverse`
                      ]}
                    >
                      <Text style={tw`w-max`}>{item.content ? item.content : '(null)'}</Text>
                      {/* Qo'shimcha element */}
                    </Text>
                  )}
                </View>
                <Text style={tw`text-xs text-white`}>{item.createdAt}</Text>
              </Pressable>
            ))
          ) : (
            <ChatEmptyState />
          )}
        </ScrollView>
        {selreplyId &&
          chats.length > 0 &&
          chats.filter((item) => item.id === selreplyId).map((item, index) => (
            <View key={index} style={tw`border flex gap-3 justify-between rounded-t-md p-3`}>
              <View style={tw`flex gap-3`}>
                <BiReply style={{ fontSize: 25 }} />
                <Text style={tw`text-white`}>{item.content}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelreplyId('');
                  handleReply(null);
                }}
              >
                <ImCancelCircle />
              </TouchableOpacity>
            </View>
          ))}
        <View style={tw`px-4 py-2 border relative`}>
          {isAtBottom && unReadMessages.length > 0 && (
            <TouchableOpacity style={tw`flex justify-center h-max flex-col items-center bottom-5 left-[90%] absolute -top-13`}>
              <View style={tw`relative`}>
                {unReadMessages.length !== 0 && (
                  <Text style={tw`absolute -top-2 left-2 w-4 h-4 flex items-center justify-center bg-gray text-black rounded-full`}>
                    {unReadMessages.length}
                  </Text>
                )}
              </View>
              <Text style={tw`w-10 h-10 flex items-center justify-center bg-gray text-black rounded-full p-5`}>
                <ArrowDownOutlined style={tw`text-white text-xl`} />
              </Text>
            </TouchableOpacity>
          )}
          <View style={[tw`flex items-center w-full flex-row`, { backgroundColor: "#21212e" }]}>
            <TouchableOpacity onPress={handleClick} style={tw`flex items-center flex-row`}>
              <IoMdAttach style={tw`cursor-pointer text-3xl`} />
              {photoPreview ? (
                <View style={tw`flex items-center gap-2`}>
                  <Image source={{ uri: photoPreview }} style={tw`w-10 h-10 rounded-md p-1 bg-[#9c0935]`} />
                  <TouchableOpacity
                    onPress={() => {
                      setPhotoPreview(null);
                      setPhotos(null);
                    }}
                  >
                    <GiCancel />
                  </TouchableOpacity>
                </View>
              ) : null}
            </TouchableOpacity>
            <TextInput
              value={content}
              style={tw`w-full border-2 rounded-md py-2 px-4 mr-2 bg-transparent custom-textarea text-white`}
              onChangeText={setContent}
              placeholder={'Type your message'}
              placeholderTextColor="#aaa"
            />
            <View style={tw`flex flex-row justify-end items-center text-2xl w-max`}>
              {(content.trim() || photoPreview) && !selreplyId && !seleditId && (
                <TouchableOpacity onPress={handleSendMessage}>
                  <IoSend />
                </TouchableOpacity>
              )}
              {(content.trim() || photoPreview) && selreplyId && (
                <TouchableOpacity
                  onPress={() => {
                    reply(1);
                    setSelreplyId('');
                    setPhotoPreview(null);
                    setPhotos(null);
                  }}
                >
                  <BiReplyAll />
                </TouchableOpacity>
              )}
              {(content.trim() || photoPreview) && seleditId && (
                <TouchableOpacity
                  onPress={() => {
                    editMessage(1);
                    setseleditId('');
                    setPhotoPreview(null);
                    setPhotos(null);
                  }}
                >
                  <EditFilled />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatDetails;
