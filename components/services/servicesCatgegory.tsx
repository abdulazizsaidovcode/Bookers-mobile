import React, { useState } from 'react';
import { Text, View } from "../Themed";
import tw from "tailwind-react-native-classnames";
import { Checkbox, RadioButton } from 'react-native-paper';
import { ServicesProps } from '@/type/services/servicesCategory';


const ServicesCategory: React.FC<ServicesProps> = ({ title, onPress, isRadioButton = false }) => {
    const [checked, setChecked] = useState(false);

    const handlePress = () => {
        setChecked(!checked);
        if (onPress) {
            onPress();
        }
    };

    return (
        <View style={tw`p-2 bg-gray-100 flex-1`}>
            <View style={[tw`flex p-3 flex-row items-center rounded-xl bg-white`]}>
                <View>
                    {isRadioButton ? (
                        <RadioButton
                            value="radio"
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={handlePress}
                            color={checked ? 'red' : undefined}
                        />
                    ) : (
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={handlePress}
                            color={checked ? 'red' : undefined}
                        />
                    )}
                </View>
                <Text style={tw`text-black text-lg font-bold`}>{title}</Text>
            </View>
        </View>
    );
}

export default ServicesCategory;
