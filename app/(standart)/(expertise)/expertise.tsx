import { Text, View } from "@/components/Themed"
import NavigationMenu from "@/components/navigation/navigation-menu"
import ServicesCategory from "@/components/services/servicesCatgegory"
import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "tailwind-react-native-classnames"

const Expertise = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style = {tw`w-full p-3`}>
                 <NavigationMenu name="Специализация" />
                 <ServicesCategory title="Парикмахер"/>
                 <ServicesCategory title="Стилист"/>
                 <ServicesCategory title="Hаращиванию волосяных прядей"/>
                 <ServicesCategory title="Барбер"/>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};
export default Expertise;