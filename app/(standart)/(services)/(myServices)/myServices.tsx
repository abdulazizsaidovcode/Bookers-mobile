import React from 'react';
import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import MyServicess from "@/components/services/myServices";
import { router } from "expo-router"; // router ni import qiling
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from 'expo-router';

const MyServices = () => {

    const services = [
        {
            title: "Направление услуг по полу",
            subTitle: "Не выбрано",
            onPress: () => { router.push('/servesGender') }
        },
        {
            title: "Категория услуг",
            subTitle: "Не выбрано",
            onPress: () => { router.push('/category') }
        },
        {
            title: "Специализация",
            subTitle: "Не выбрано",
            onPress: () => { router.push('/expertise') }
        },
        {
            title: "Процедура услуг",
            subTitle: "Не выбрано",
            onPress: () => { router.push('/process') }
        },
    ];
    
    return (
        <SafeAreaView>
            <ScrollView>

                <View style={tw`flex w-full`}>
                    <NavigationMenu name="Мои услуги" />
                    <View style={tw`p-3`}>
                    {services.map((service, index) => (
                        <MyServicess
                            key={index}
                            title={service.title}
                            subTitle={service.subTitle}
                            onPress={service.onPress}
                        />
                    ))}
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default MyServices;
