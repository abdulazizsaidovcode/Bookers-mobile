import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface ChatCardProps {
  item: any;
  onPress: (id: string) => void;
  onLongPress: (id: string) => void;
  isSelected: boolean;
}

const ChatCard: React.FC<ChatCardProps> = ({ item, onPress, onLongPress, isSelected }) => {
  const { name, chatDto, newMessageCount, avatar, status } = item;
  const message = chatDto?.content || 'No message';

  return (
    <Pressable
      onPress={() => onPress(item.userId)}
      onLongPress={() => onLongPress(item.userId)}
      style={[
        tw`flex-row bg-gray-500 rounded-xl p-5 mb-3 items-center`,
        isSelected && tw`bg-gray-700`,
      ]}
    >
      <View style={tw`relative`}>
        <Image source={{ uri: avatar }} style={tw`w-12 h-12 rounded-full mr-3`} />
        {isSelected &&
          <AntDesign style={tw`text-xs text-white absolute right-2 bottom-0 bg-green-400 rounded-full flex justify-center w-4 h-4`} name="check" size={24} color="black" />
        }
      </View>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-black font-bold`}>{name}</Text>
          {newMessageCount > 0 && (
            <View style={tw`bg-red-600 rounded-full px-2 py-1`}>
              <Text style={tw`text-white text-xs font-bold`}>{newMessageCount}</Text>
            </View>
          )}
        </View>
        <View style={tw`flex-row justify-between`}>
          <Text style={tw`text-black mt-1`}>{message}</Text>
          <View style={tw`flex-row justify-between items-center mt-1 `}>
            <Text style={tw`text-black mr-2`}>{status}</Text>
            {newMessageCount === 0 && <FontAwesome name="check" size={14} color="#ccc" />}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatCard;
