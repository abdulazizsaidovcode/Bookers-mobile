import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

interface CheckboxProps {
    value: boolean;
    onValueChange: (newValue: boolean) => void;
    title:string;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ value, onValueChange, title }) => {
    return (
        <View style = {tw`flex-1 flex-row`}>
            <TouchableOpacity
            style={[styles.checkboxBase, value && styles.checked]}
            onPress={() => onValueChange(!value)}
        >
            {value && <AntDesign name="check" size={20} color="white" />}
        </TouchableOpacity>
        <Text style = {tw`ml-3`}>{title}</Text>
        </View>
        
    );
};

const styles = StyleSheet.create({
    checkboxBase: {
        width: 22,
        height: 22,
        borderRadius: 4,
        backgroundColor: '#B9B9C9',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    checked: {
        backgroundColor: '#9C035A',
        borderColor: '#9C035A',
    },
    label: {
        marginLeft: 8, // Adjust as needed for spacing
    },
});

export default CustomCheckbox;
