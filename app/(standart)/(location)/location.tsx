import { View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { SafeAreaView, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import LocationCard from "@/components/(location)/locationCard";

const Location = () => {
    return (
        <SafeAreaView style = {tw`p-3 mt-3`}>
            <ScrollView>
                <View style={tw`flex w-full `}>
                    <NavigationMenu name="Мой адрес работы" />
                    <LocationCard icon="location-outline"
                        title="Адрес работы"
                        subtitle="Адрес работы не настроен!"
                        
                         />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}
export default Location;