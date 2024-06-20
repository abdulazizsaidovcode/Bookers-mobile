import React, { useState } from 'react';
import { Text, View } from '../Themed';
import tw from 'tailwind-react-native-classnames';
import { Checkbox, RadioButton } from 'react-native-paper';
import { ServicesProps } from '@/type/services/servicesCategory';
import { StyleSheet } from 'react-native';

const ServicesCategory: React.FC<ServicesProps> = ({ title, onPress, isRadioButton = false, id }) => {
    const [checked, setChecked] = useState(false); // RadioButton uchun
    const [isSelected, setSelection] = useState(false); // Checkbox uchun

    const handlePress = () => {
        if (isRadioButton) {
            setChecked(true); // RadioButton uchun faqat bitta tanlangan bo'lsin
            if (onPress) {
                onPress(id); // id ni onPress orqali o'tkazish
            }
        } else {
            setSelection(!isSelected); // Checkbox uchun holat o'zgartirish
        }
    };

    return (
        <View style={tw`p-2 rounded-xl`}>
            <View style={tw`flex p-3 flex-row rounded-xl items-center bg-white`}>
                <View style={[tw`rounded-full`, { backgroundColor: isRadioButton ? (checked ? 'red' : 'white') : (isSelected ? 'red' : 'white') }]}>
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
