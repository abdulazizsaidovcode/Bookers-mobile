import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Share, StyleSheet, Text, View } from "react-native";

const MasterHeader: React.FC = () => {
    const navigation = useNavigation<any>();
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: "https://t.me/senior_BX",
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            alert(error.message);
        }
    };
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Главная</Text>
            <View style={styles.headerIcons}>
                <Ionicons
                    name="notifications"
                    size={24}
                    color={'#ffffff'}
                    style={{ marginRight: 16 }}
                    onPress={() => navigation.navigate("(profile)/(notification)/index")}
                />
                <Ionicons
                    name="share-social-outline"
                    size={24}
                    color={'#ffffff'}
                    onPress={onShare}
                />
            </View>
        </View>
    );
};

export default MasterHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: '#ffffff',
    },
    headerIcons: {
        flexDirection: "row",
    },
})