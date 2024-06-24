import {Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import CountNumber from "@/components/clients/count-number";
import {MaterialIcons} from '@expo/vector-icons';

const ClientCountCard = ({icon, title, clicks, counts}: { icon: JSX.Element, title: string, clicks?: () => void, counts?: number }) => {
    return (
        <TouchableOpacity
            onPress={clicks}
            activeOpacity={0.8}
            style={[tw`flex-row items-center justify-between py-3 px-4 rounded-2xl`, {backgroundColor: '#B9B9C9'}]}
        >
            <View style={[tw`flex-row items-center justify-start`, {gap: 5}]}>
                {icon}
                <Text style={[tw`text-lg font-bold`]}>{title}</Text>
            </View>
            <View style={[tw`flex-row items-center justify-end`, {gap: 5}]}>
                <CountNumber bg_color={`#9C0A35`} color={`white`} count={counts && counts}/>
                <MaterialIcons name="navigate-next" size={36} color='gray'/>
            </View>
        </TouchableOpacity>
    );
};

export default ClientCountCard;