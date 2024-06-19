import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface TimesCardProps {
  title: string;
  onSelect: () => void;
  isSelected: boolean;
  isInRange: boolean;
  disabled: boolean;
}

const TimesCard: React.FC<TimesCardProps> = ({ title, onSelect, isSelected, isInRange, disabled }) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onSelect : undefined}
      style={[
        styles.container,
        isSelected && styles.selected,
        isInRange && !isSelected && styles.inRange,
        disabled && styles.disabled
      ]}
      disabled={disabled}
    >
      <Text style={[styles.title, { color: isSelected ? 'white' : 'black' }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TimesCard;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 35,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  title: {
    fontSize: 17,
  },
  selected: {
    backgroundColor: '#9c0a35',
  },
  inRange: {
    backgroundColor: '#aaaaaa',
  },
  disabled: {
    backgroundColor: '#cccccc',
  }
});