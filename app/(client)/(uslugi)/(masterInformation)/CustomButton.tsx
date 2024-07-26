// CustomButton1.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type Props = {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  onPress: () => void;
  active?: boolean;
};

const CustomButton1: React.FC<Props> = ({ title, backgroundColor, textColor, borderColor, onPress, active }) => {
  const activeBackgroundColor = active ? '#B9B9C9' : backgroundColor;
  const activeTextColor = active ? '#9C0A35' : textColor;

  return (
    <TouchableOpacity
      style={[
        tw`flex px-3 py-2 mx-2 rounded-xl `,
        { backgroundColor: activeBackgroundColor, borderColor, borderWidth: borderColor ? 1 : 0 }
      ]}
      onPress={onPress}
    >
      <Text style={[tw`text-center text-xl`, { color: activeTextColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton1;
