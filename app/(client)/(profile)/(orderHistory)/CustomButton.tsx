import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  active: boolean;
};

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, active }) => {
  return (
    <TouchableOpacity style={[styles.button, active && styles.activeButton]} onPress={onPress}>
      <Text style={[styles.buttonText, active && styles.activeButtonText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#B9B9C9',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#B9B9C9',
  },
  buttonText: {
    color: '#ccc',
  },
  activeButtonText: {
    color: '#9C0A35',
  },
});

export default CustomButton;
