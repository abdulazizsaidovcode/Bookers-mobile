import React from 'react';
import { View, Text, Switch } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface SwitchWithLabelProps {
    label: string;
    value: boolean;
    onToggle: () => void;
}

const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({ label, value, onToggle }) => {
    return (
        <View style={tw`flex flex-row items-center justify-between mt-4`}>
            <Text style={tw`text-lg text-white mr-4`}>
                {label}
            </Text>
            <View style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}>
                <Switch
                    trackColor={{ false: "#767577", true: "#9C0A35" }}
                    thumbColor={value ? "#FFFFFF" : "#FFFFFF"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onToggle}
                    value={value}
                />
            </View>
        </View>
    );
};

export default SwitchWithLabel;
