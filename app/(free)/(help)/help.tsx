import React from 'react';
import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import MyServicess from "@/components/services/myServices";
import { router } from "expo-router"; // router ni import qiling
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import MyServicesCard from '@/components/services/myServicesCard';


const HelpFree = () => {

    const services = [
        {
            title: "О сервисе",
            onPress: () => { router.push('/aboutUs') }
        },
        {
            title: "Оферта",
            onPress: () => { router.push('/offer') }
        },
        {
            title: "Политика конфиденциальности",
            onPress: () => { router.push('/security') }
        },
        {
            title: "Лицензионное соглашение",
            onPress: () => { router.push('/certificate') }
        },
        {
            title: "Лицензии",
            onPress: () => { router.push('/certificate') }
        },
        {
            title: "Сертификаты",
            onPress: () => { router.push('/certificate') }
        },
        {
            title: "Сертификаты",
            onPress: () => { router.push('/certificate') }
        },
        {
            title: "Сертификаты",
            onPress: () => { router.push('/certificate') }
        },
        {
            title: "Сертификаты",
            onPress: () => { router.push('/certificate') }
        },
    ];

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Помощь`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style = {[tw``, {backgroundColor:'#21212E'}]}>
                        <View style={[tw`mb-5`,{backgroundColor:'#21212E'}]}>
                            {services.map((service, index) => (   
                                <MyServicesCard key={index}
                                    title={service.title}
                                    onPress={service.onPress}
                                />
                            ))}
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default HelpFree;
