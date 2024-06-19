import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IoSend } from 'react-icons/io5';
import { IoMdAttach } from "react-icons/io";
import { BiReply, BiReplyAll } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { GiCancel } from 'react-icons/gi';
import { ArrowDownOutlined, EditFilled } from '@ant-design/icons';
import tw from 'tailwind-react-native-classnames';
import { useRoute } from '@react-navigation/native';

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
    <Text style={tw`text-xl`}>No Messages</Text>
  </View>
);

const ChatDetails = () => {
  const [chats, setChats] = useState<ChatSentSmstList[]>(chat);
  const scrolRef = useRef<any>();
  const [selreplyId, setSelreplyId] = useState<string>('');
  const [seleditId, setseleditId] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [attachmentIds, setAttachmentIds] = useState<any>(null);
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

  let senderId = '';

  useEffect(() => {
    console.log('Chat ID:', id);
    // Fetch the chat data based on the received id
  }, [id]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getUnreadMessages = () => {
    const unread = chats.filter((item) => !item.read);
    setUnReadMessages(unread);
  };

  useEffect(() => {
    getUnreadMessages();
  }, [chats]);

  useEffect(() => {
    setChats(chat);
  }, [chat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollToEnd({ animated: true });
    }
  }, [chats]);

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
    let cont = chats.find((item) => item.id === id)?.content;
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

  return (
    <View style={tw`h-full relative`}>
      <View style={tw`w-full h-full flex flex-col`}>
        <ScrollView
          style={tw`bg-gray-200 flex-1 h-full`}
          ref={chatContainerRef}
          onContentSizeChange={() => chatContainerRef.current?.scrollToEnd({ animated: true })}
        >
          {chats.length > 0 ? (
            chats.map((item, index) => (
              <View
                ref={scrolRef}
                key={index}
                style={tw`py-2 ${item.senderId === senderId ? 'flex items-end justify-end flex-col' : 'justify-start'}`}
              >
                <View style={tw`flex items-center mb-2`}>
                  <Image
                    style={tw`w-8 h-8 rounded-full mr-2`}
                    source={{ uri: item.senderId !== senderId ? getFileId(item.receiverImg) : getFileId(item.senderImg) }}
                  />
                  <Text style={tw`font-medium`}>{item.senderId === senderId ? item.senderName : item.receiverName}</Text>
                </View>
                <View
                  style={tw`p-2 rounded-md flex flex-col ${item.replayDto ? 'dark:bg-[#9c093543] bg-[#85828343]' : ''} ${item.senderId === senderId ? 'items-end ml-20' : 'items-start mr-20'}`}
                >
                  {item.replayDto && (
                    <View
                      style={tw`flex gap-2 items-center ${item.senderId === senderId ? 'justify-end' : 'justify-start'}`}
                    >
                      <View style={tw`w-10 h-10 flex justify-center items-center`}>
                        <BiReply style={{ fontSize: 25 }} />
                      </View>
                      <View
                        style={tw`bg-gray text-black py-1 px-3 mb-1 rounded-md dark:border-[#9c0935] ${item.senderId === senderId ? 'border-r-2' : 'border-l-2'}`}
                      >
                        {item.replayDto.content ? item.replayDto.content : <Image source={{ uri: getFileId(item.attachmentIds[0]) }} style={tw`w-10 h-10`} />}
                      </View>
                    </View>
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
                      style={tw`flex items-start gap-5 ${item.senderId === senderId ? 'bg-white rounded-lg py-2 px-3 shadow max-w-sm w-max' : 'bg-lime-500 text-white rounded-lg py-2 px-3 shadow mb-2 max-w-max flex-col-reverse'}`}
                    >
                      <Text style={tw`w-[95%]`}>{item.content ? item.content : '(null)'}</Text>
                      {/* Qo'shimcha element */}
                    </Text>
                  )}
                </View>
                <Text style={tw`text-xs`}>{item.createdAt}</Text>
              </View>
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
                <Text>{item.content}</Text>
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
        <View ref={checkReadElement} style={tw`bg-red-400 rounded-full absolute bottom-9 p-2`}></View>
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
          <View style={tw`flex items-center gap-5 w-full flex-row`}>
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
              style={tw`w-full border-2 rounded-md py-2 px-4 mr-2 bg-transparent focus:outline-none focus:ring-0 custom-textarea`}
              onChangeText={setContent}
              placeholder={'Type your message'}
            />
            <View style={tw`flex flex-row justify-end items-center text-2xl w-max gap-5`}>
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
