import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const ChatDetails: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Salom! Qanday yordam bera olaman?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Button mode="contained" onPress={() => console.log('Button pressed')}>
          Bosish
        </Button>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ChatDetails;
