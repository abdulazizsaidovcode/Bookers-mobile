import React, { useState } from 'react';
import { Text, View } from "../Themed";
import tw from "tailwind-react-native-classnames";
import { Checkbox, RadioButton } from 'react-native-paper';
import { ServicesProps } from '@/type/services/servicesCategory';

const ServicesCategory: React.FC<ServicesProps> = ({ title, onPress, isRadioButton = false, id }) => {
    const [checked, setChecked] = useState(false);

    const handlePress = () => {
        setChecked(!checked);
        if (onPress) {
            onPress();
        }
    };

    return (
        <View style={tw`p-2 rounded-xl`}>
            <View style={tw`flex p-3 flex-row rounded-xl items-center bg-white`}>
                <View style={[tw`rounded-full`, { backgroundColor: checked ? 'red' : 'white' }]}>
                    {isRadioButton ? (
                        <RadioButton
                            
                            value="radio"
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={handlePress}
                            color={checked ? 'white' : 'black'} // Change icon color
                        />
                    ) : (
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={handlePress}
                            color={checked ? 'white' : 'black'} // Change icon color
                        />
                    )}
                </View>
                <Text style={tw`text-black text-lg font-bold ml-2`}>{title}</Text>
            </View>
        </View>
    );
}

export default ServicesCategory;
