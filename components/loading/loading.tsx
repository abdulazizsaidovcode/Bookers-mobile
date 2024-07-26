import { ActivityIndicator } from "react-native-paper"
import { View } from "../Themed"

export const Loading = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#21212E' }}>
            <ActivityIndicator size="large" color={"#9C0A35"} />
        </View>
    )
}