import React, { useState } from 'react';
import { Text, View } from '../Themed';
import tw from 'tailwind-react-native-classnames';
import { Checkbox, RadioButton } from 'react-native-paper';
import { ServicesProps } from '@/type/services/servicesCategory';
import { StyleSheet } from 'react-native';

const ServicesCategory: React.FC<ServicesProps> = ({ title, onPress, isRadioButton = false, id }) => {
    const [checked, setChecked] = useState(false); 
    const [isSelected, setSelection] = useState(false); 

    const handlePress = () => {
        if (isRadioButton) {
            setChecked(true); 
            if (onPress) {
                onPress(); 
            }
        } else {
            setSelection(!isSelected); 
        }
    };

    return (
        <View style={[tw`rounded-2xl`, {backgroundColor:'#21212E'}]}>
            <View style={[tw`flex p-3 mb-3 flex-row rounded-2xl items-center`, {backgroundColor: '#B9B9C9'}]}>
                <View style={[tw`rounded-full`, { backgroundColor: isRadioButton ? (checked ? 'red' : '#B9B9C9') : (isSelected ? 'red' : '#B9B9C9') }]}>
                    {isRadioButton ? (
                        <RadioButton
                            value="radio"
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={handlePress}
                            color={checked ? 'white' : 'black'} // RadioButton rangini o'zgartirish
                        />
                    ) : (
                        <Checkbox
                            status={isSelected ? 'checked' : 'unchecked'}
                            onPress={handlePress}
                            color={isSelected ? 'white' : 'black'} // Checkbox rangini o'zgartirish
                        />
                    )}
                </View>
                <Text style={tw`text-black text-lg font-bold ml-2`}>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        alignSelf: 'center',
    },
});

export default ServicesCategory;
