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
        <Text style={tw`font-bold text-xl text-center mb-5`}>
            {title}
        </Text>
        <Text style={tw`font-sans mb-5`}>
            {content}
        </Text>
        <Text style={tw`text-center font-bold text-2xl`}>{contactTitle}</Text>
        <Text style={tw`text-center text-gray-600 mb-2`}>{contactInfo}</Text>
    </View>
);

export default Description;