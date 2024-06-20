import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ServicesCategory from "@/components/services/servicesCatgegory";
import { View } from "@/components/Themed";
import tw from "tailwind-react-native-classnames";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";

const ServesGender = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={tw`flex w-full p-3`}>
                    <NavigationMenu name="Направление по полу" />
                    <ServicesCategory title="Мужское напрвление" />
                    <ServicesCategory title="Женское напрвление" />
                </View>
            </ScrollView>
            <View style={tw`grid content-end p-4`}>
                <Buttons title="Сохранить" isDisebled={false} />
            </View>
        </SafeAreaView>
    );
};

export default ServesGender;
