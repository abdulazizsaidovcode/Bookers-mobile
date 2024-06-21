import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Pressable, TextInput, StyleSheet, Text } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'; // Use Expo icons
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { fetchMessages } from '@/helpers/api-function/chat/getmessages';
import fetchChatDataStore from '@/helpers/state_managment/chat/chatfetchStore';
import { useStomp } from '@/context/StompContext';
import { Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';

const { Popover } = renderers;

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
  <View >
    <Text >No Messages</Text>
  </View>
);

const ChatDetails = () => {
  const { setmessageData, messageData } = fetchChatDataStore();
  const { stompClient, adminId } = useStomp();

  const [chats, setChats] = useState<ChatSentSmstList[]>(messageData);
  const [selreplyId, setSelreplyId] = useState<string>('');
  const [seleditId, setseleditId] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [attachmentIds, setAttachmentIds] = useState<any>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [unReadMessages, setUnReadMessages] = useState<any[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [content, setContent] = useState<string>('');

  const messageRefs = useRef<Record<string, HTMLDivElement>>({});
  const scrolRef = useRef<any>();
  const chatContainerRef = useRef<ScrollView>(null);
  const checkReadElement = useRef<View>(null);

  const route = useRoute();
  const { id } = route.params as { id: string };

  let senderId = 'cde806d1-1da5-4264-85b6-47d066cadca1';

  useEffect(() => {
    console.log('Chat ID:', id);
  }, [id]);

  useEffect(() => {
    console.log(selectedMessageId);
  }, [selectedMessageId]);

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

  const handleDelete = () => {
    // deleteMessage();
  };

  const handleReply = (id: any) => {
    setseleditId('');
    setSelreplyId(id);
    setseleditId('');
    setContent('');
  };

  const handleEdit = (id: any) => {
    let cont = chats.find((item: any) => item.id === id)?.content;
    setseleditId(id);
    setContent("salom");
    setSelreplyId('');
  };

  const items = (id: any) => [
    {
      key: '1',
      onPress: () => {
        openModal();
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
    }else {
      console.log(stompClient);
      
    }
  };

  const scrollToMessage = (messageId: string) => {
    const messageElement = messageRefs.current[messageId];
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth' });
      messageElement.style.backgroundColor = '#85828343';
      messageElement.style.transition = "1s";
      messageElement.style.animationTimingFunction = 'ease-out';
      setTimeout(() => {
        messageElement.style.backgroundColor = 'transparent';
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView
          style={styles.scrollView}
          ref={chatContainerRef}
          onContentSizeChange={() => chatContainerRef.current?.scrollToEnd({ animated: true })}
        >
          {messageData.length > 0 ? (
            messageData.map((item, index) => (
              <Pressable
                onLongPress={() => setSelectedMessageId(item.id)}
                ref={(el) => { messageRefs.current[item.id] = el; }}
                key={index}
                style={[styles.messageContainer, item.senderId === senderId ? styles.senderMessage : styles.receiverMessage]}
              >
                <View style={styles.messageHeader}>
                  {/* <Image
                    style={styles.avatar}
                    source={{ uri: item.senderId !== senderId ? getFileId(item.receiverImg) : getFileId(item.senderImg) }}
                  /> */}
                  <Text style={styles.senderName}>{item.senderId === senderId ? item.senderName : item.receiverName}</Text>
                </View>
                <View style={[
                  styles.messageContent,
                  item.replayDto ? styles.repliedMessage : {},
                  item.senderId === senderId ? styles.senderContent : styles.receiverContent
                ]}>
                  {item.replayDto && (
                    <TouchableOpacity
                      onPress={() => scrollToMessage(item.replayDto.id)}
                      style={styles.replyContainer}
                    >
                      <View style={styles.replyIcon}>
                        <Ionicons name="md-arrow-undo" style={styles.replyIconStyle} />
                      </View>
                      <View style={[
                        styles.replyContent,
                        item.senderId === senderId ? styles.replyBorderRight : styles.replyBorderLeft
                      ]}>
                        <Text>{item.replayDto.content ? item.replayDto.content : <Image source={{ uri: getFileId(item.attachmentIds[0]) }} style={styles.replyImage} />}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  {item.attachmentIds.length > 0 && (
                    <View style={styles.attachmentContainer}>
                      <Image source={{ uri: getFileId(item.attachmentIds[0]) }} style={styles.attachmentImage} />
                    </View>
                  )}
                  {item.content && (
                    <View style={[
                      styles.textContent,
                      item.senderId === senderId ? styles.senderText : styles.receiverText
                    ]}>
                      <Text style={styles.textContentText}>{item.content ? item.content : '(null)'}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.timestamp}>{item.createdAt}</Text>
                {selectedMessageId === item.id &&
                  <Menu renderer={Popover} rendererProps={{ placement: 'bottom' }}>
                    <MenuTrigger />
                    <MenuOptions>
                      <MenuOption onSelect={() => handleReply(item.id)} text='Ответить' />
                      <MenuOption onSelect={() => console.log(`Copy message with id: ${item.id}`)} text='Копировать' />
                      <MenuOption onSelect={() => handleEdit(item.id)} text='Редактировать' />
                      <MenuOption onSelect={() => handleDelete()} text='Удалить' />
                    </MenuOptions>
                  </Menu>
                }
              </Pressable>
            ))
          ) : (
            <ChatEmptyState />
          )}
        </ScrollView>
        {selreplyId &&
          chats.length > 0 &&
          chats.filter((item) => item.id === selreplyId).map((item, index) => (
            <View key={index} style={styles.replyFooter}>
              <View style={styles.replyFooterContent}>
                <Ionicons name="md-arrow-undo" style={styles.replyFooterIcon} />
                <Text style={styles.replyFooterText}>{item.content}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelreplyId('');
                  handleReply(null);
                }}
              >
                <MaterialIcons name="cancel" style={styles.cancelIcon} />
              </TouchableOpacity>
            </View>
          ))}
        <View style={styles.inputContainer}>
          {isAtBottom && unReadMessages.length > 0 && (
            <TouchableOpacity style={styles.unreadMessageButton}>
              {unReadMessages.length !== 0 && (
                <View style={styles.unreadMessageContainer}>
                  <Text style={styles.unreadMessageCount}>
                    {unReadMessages.length}
                  </Text>
                </View>
              )}
              <Text style={styles.scrollDownIcon}>
                <AntDesign name="down" style={styles.scrollDownIconStyle} />
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.inputWrapper}>
            <TouchableOpacity onPress={handleClick} style={styles.attachButton}>
              <Ionicons name="attach" style={styles.attachIcon} />
              {photoPreview ? (
                <View style={styles.photoPreviewContainer}>
                  <Image source={{ uri: photoPreview }} style={styles.photoPreview} />
                  <TouchableOpacity
                    onPress={() => {
                      setPhotoPreview(null);
                      setPhotos(null);
                    }}
                  >
                    <MaterialIcons name="cancel" style={styles.cancelIcon} />
                  </TouchableOpacity>
                </View>
              ) : null}
            </TouchableOpacity>
            <TextInput
              value={content}
              style={styles.textInput}
              onChangeText={setContent}
              placeholder={'Type your message'}
              placeholderTextColor="#aaa"
            />
            <View style={styles.sendButtonContainer}>
              {(content.trim() || photoPreview) && !selreplyId && !seleditId && (
                <TouchableOpacity onPress={handleSendMessage}>
                  <Ionicons name="send" style={styles.sendIcon} />
                </TouchableOpacity>
              )}
              {(content.trim() || photoPreview) && selreplyId && (
                <TouchableOpacity
                  onPress={() => {
                    handleReply(1);
                    setSelreplyId('');
                    setPhotoPreview(null);
                    setPhotos(null);
                  }}
                >
                  <Ionicons name="arrow-undo" style={styles.sendIcon} />
                </TouchableOpacity>
              )}
              {(content.trim() || photoPreview) && seleditId && (
                <TouchableOpacity
                  onPress={() => {
                    handleEdit(1);
                    setseleditId('');
                    setPhotoPreview(null);
                    setPhotos(null);
                  }}
                >
                  <AntDesign name="edit" style={styles.sendIcon} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#21212e',
  },
  messageContainer: {
    padding: 8,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'column',
    // backgroundColor: '#1a1a1a51',
    width: '100%',
  },
  senderMessage: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  receiverMessage: {
    justifyContent: 'flex-start',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  senderName: {
    fontWeight: '500',
    color: 'white',
  },
  messageContent: {
    padding: 8,
    borderRadius: 8,
    flexDirection: 'column',
    // backgroundColor: '#333',
  },
  repliedMessage: {
    backgroundColor: '#85828343',
  },
  senderContent: {
    marginLeft: 80,
  },
  receiverContent: {
    marginRight: 80,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyIconStyle: {
    fontSize: 25,
  },
  replyContent: {
    backgroundColor: '#d1d1d1',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  replyBorderRight: {
    borderRightWidth: 2,
  },
  replyBorderLeft: {
    borderLeftWidth: 2,
  },
  replyImage: {
    width: 40,
    height: 40,
  },
  attachmentContainer: {
    position: 'relative',
  },
  attachmentImage: {
    borderRadius: 8,
    marginBottom: 8,
  },
  textContent: {
    flexDirection: 'column',
  },
  senderText: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    maxWidth: '80%',
  },
  receiverText: {
    backgroundColor: '#e74c3c',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '80%',
    flexDirection: 'column-reverse',
  },
  textContentText: {
    width: '95%',
  },
  timestamp: {
    fontSize: 10,
    color: 'white',
  },
  replyFooter: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3b3b3b',
  },
  replyFooterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  replyFooterIcon: {
    fontSize: 25,
  },
  replyFooterText: {
    color: 'white',
  },
  cancelIcon: {
    fontSize: 25,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    position: 'relative',
    backgroundColor: '#21212e',
  },
  unreadMessageButton: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    left: '90%',
  },

  unreadMessageContainer: {
    position: 'relative',
  },

  unreadMessageCount: {
    position: 'absolute',
    padding: 1,
    top: -8,
    left: 8,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 10,
    color: 'black',
    zIndex: 1,
  },
  scrollDownIcon: {
    padding: 10,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 50,
  },
  scrollDownIconStyle: {
    fontSize: 24,
    color: 'white',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachIcon: {
    fontSize: 24,
    color: 'white',
  },
  photoPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  photoPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    padding: 4,
    backgroundColor: '#9c0935',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: 'transparent',
    color: 'white',
  },
  sendButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  sendIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default ChatDetails;
