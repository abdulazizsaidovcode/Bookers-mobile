import tw from "tailwind-react-native-classnames";
import { Text, View } from "../Themed";

interface DescriptionProps {
    title: string;
    content?: string;
    contactTitle?: string;
    contactInfo?: string;
}

const Description: React.FC<DescriptionProps> = ({ title, content, contactTitle, contactInfo }) => (
    <View style={tw`bg-gray-200 rounded-xl p-3`}>
        <Text style={tw`font-bold text-lg text-gray-800 text-center px-1 mb-5`}>
            {title}
        </Text>
        <Text style={tw`font-sans mb-5 text-gray-900`}>
            {content}
        </Text>
        <Text style={tw`text-center text-gray-800 font-bold text-2xl`}>{contactTitle}</Text>
        <Text style={tw`text-center text-gray-600 mb-2`}>{contactInfo}</Text>
    </View>
);

export default Description;