import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";

interface MessageOptionProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  IconComponent?: JSX.Element;
  disebled?: boolean;
}

const MessageOption: React.FC<MessageOptionProps> = ({
  title,
  subtitle,
  onPress,
  IconComponent,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={ onPress}
    >
      <View
        style={[
          tw`p-3 mb-2 rounded-xl`,
          { backgroundColor: "#B9B9C9" },
        ]}
      >
        <View style={tw`flex flex-row justify-between items-center`}>
          <View style={tw`flex flex-row items-center`}>
            {IconComponent}
            <Text style={tw`text-lg font-bold ml-2`}>{title}</Text>
          </View>
          <AntDesign name="right" size={24} color="black" style={tw`mt-3`} />
        </View>
        <View>
          <Text>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MessageOption;
