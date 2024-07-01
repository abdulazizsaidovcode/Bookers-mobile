import tw from "tailwind-react-native-classnames";
import {Text, TouchableOpacity, View} from "react-native";

const IconsButtons = (
    {
        icon,
        name,
        clicks,
        color,
        bg_color,
        width
    }: {
        name: string,
        clicks?: () => void,
        icon?: JSX.Element,
        bg_color?: string,
        color?: string,
        width?: string
    }) => {
    return (
        <TouchableOpacity
            onPress={clicks}
            activeOpacity={.8}
            style={[tw`rounded-lg py-3 px-5`, {backgroundColor: bg_color ? bg_color : '#9C0A35', width: width ? width : 'auto'}]}
        >
            <View style={[tw`flex-row items-center justify-center`]}>
                {icon}
                <Text style={[tw`text-base font-semibold ${icon ? 'ml-2' : ''}`, {color: color ? color : 'white'}]}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default IconsButtons;