import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ExpenseCard = ({ item }: any) => {
    const navigation = useNavigation<any>();


    return (
        <TouchableOpacity onPress={() => navigation.navigate("(profile)/(Expenses)/(component)/(detail)/expenseDetail", { id: item.id })} style={tw`bg-gray-700 p-4 rounded-lg mb-4 flex-row items-center`}>
            <FontAwesome name={item.icon} size={24} color="#E74C3C" style={tw`mr-4`} />
            <View style={tw`flex-1`}>
                <Text style={tw`text-white font-bold`}>{item.title}</Text>
                <Text style={tw`text-gray-400 mt-1`}>{item.description}</Text>
            </View>
            <Text style={tw`text-red-500 font-bold`}>{item.amount}</Text>
            <FontAwesome name="chevron-right" size={20} color="#E74C3C" style={tw`ml-4`} />
        </TouchableOpacity>
    );
};

export default ExpenseCard;




