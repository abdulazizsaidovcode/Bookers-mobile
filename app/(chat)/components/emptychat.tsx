import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { BsChatSquareDots } from "react-icons/bs"

const ChatEmptyState = () => {
  return (
    <View style={tw`flex flex-col items-center justify-center h-[50vh]`}>
      <BsChatSquareDots style={tw`text-6xl`} />
      <Text style={tw`text-lg text-gray-600 mt-5 z-0 relative`}>not selected</Text>
    </View>
  );
};

export default ChatEmptyState;