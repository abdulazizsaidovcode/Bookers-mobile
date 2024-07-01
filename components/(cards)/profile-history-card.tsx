import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import {MaterialIcons} from "@expo/vector-icons";

const ProfileHistoryCard = ({icon, name, count, clicks}: { icon: JSX.Element, name: string, count: any, clicks?: () => void }) => {
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            activeOpacity={.8}
            onPress={clicks}
        >
            <View style={[styles.itemContent]}>
                {icon}
                <Text style={[styles.itemText]}>{name}</Text>
            </View>
            <View style={styles.itemContent}>
                <Text style={[styles.itemCount, tw`rounded-full px-2.5 py-1 pt-0.5`]}>{count}</Text>
                <MaterialIcons name="navigate-next" size={40} color="#4F4F4F"/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        color: '#4F4F4F',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10
    },
    itemCount: {
        color: 'white',
        backgroundColor: '#9C0A35',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 6,
    },
})

export default ProfileHistoryCard;