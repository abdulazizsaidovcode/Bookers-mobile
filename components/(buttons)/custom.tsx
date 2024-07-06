// CustomButton.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type Props = {
  title: string;
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
  onPress: () => void;
};

const CustomButton: React.FC<Props> = ({ title, backgroundColor, textColor, borderColor, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        tw`w-[100%] px-9 py-4 rounded-xl`,
        { backgroundColor, borderColor, borderWidth: borderColor ? 1 : 0 }
      ]}
      onPress={onPress}
    >
      <Text style={[{ color: textColor, textAlign: 'center' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
