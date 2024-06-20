import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import tw from 'tailwind-react-native-classnames';

const salons = [
  { label: 'Arhideya', value: 'Arhideya' },
  { label: 'Azaliya Garden', value: 'Azaliya Garden' },
  { label: 'Eligance', value: 'Eligance' },
  { label: 'Beauty Wave', value: 'Beauty Wave' },
  { label: 'Izumrud', value: 'Izumrud' },
  { label: 'Green Land', value: 'Green Land' },
  { label: 'Tamo style', value: 'Tamo style' },
];

const DropdownMenu: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);

  return (
    <View style={tw`m-4 p-4`}>
      <Text style={tw`mb-2 text-gray-600`}>Название салона</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={salons}
        placeholder={{
          label: 'Выберите салон',
          value: null,
          color: '#9EA0A4',
        }}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
           
            right: 12,
          },
          placeholder: {
            color: '#9EA0A4',
            
          },
          inputIOSContainer: {
            backgroundColor: '#4B4B64',
            borderRadius: 4,
          },
          inputAndroidContainer: {
            backgroundColor: '#4B4B64',
            borderRadius: 4,
          },
        }}
        value={selectedValue}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Ionicons name="chevron-down" size={24} color="gray" style={tw`ml-2 mt-2 p-2`} />;
        }}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#4B4B64',
    borderRadius: 4,
    color: 'white',
    paddingRight: 30,
    backgroundColor: '#4B4B64',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: '#4B4B64',
    borderRadius: 6,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#4B4B64',
  },
  inputIOSContainer: {
    backgroundColor: '#4B4B64',
    borderRadius: 4,
  },
  inputAndroidContainer: {
    backgroundColor: '#4B4B64',
    borderRadius: 6,
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
  placeholder: {
    color: '#9EA0A4',
    fontSize: 16,
  },
  done: {
    color: '#9C0A35',
  },
  selectedItem: {
    color: '#9C0A35',
  },
});

export default DropdownMenu;
