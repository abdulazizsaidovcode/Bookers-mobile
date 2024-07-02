import React from 'react';
import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import MyServicess from "@/components/services/myServices";
import { router } from "expo-router"; // router ni import qiling
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import MyServicesCard from '@/components/services/myServicesCard';
import { getHelpOne } from '@/helpers/api-function/help/help';
import heplStore from '@/helpers/state_managment/help/helpStore';


const Help = () => {
    const { setNavigatName, setHelpDate} = heplStore()

    const services = [
        {
            title: "О сервисе",
            onPress: () => {
                getHelpOne(setHelpDate, "ABOUT_SERVICE", "/aboutUs")
                setNavigatName("О сервисе")
            }
        },
        {
            title: "Оферта",
            onPress: () => 
                {
                getHelpOne(setHelpDate, "OFFER", "/aboutUs")
                setNavigatName("Оферта")
            }
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Политика конфиденциальности",
            onPress: () => {
                getHelpOne(setHelpDate, "PRIVACY_POLICY", "/aboutUs")
                setNavigatName("Политика конфиденциальности")
            }
            // onPress: () => { router.push('/offer') }
        },
        {
            title: "Лицензионное соглашение",
            onPress: () => {
                getHelpOne(setHelpDate, "LICENSE_AGREEMENT", "/aboutUs")
                setNavigatName("Лицензионное соглашение")
            }
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Лицензии",
            onPress: () => {
                getHelpOne(setHelpDate, "LICENSES", "/aboutUs")
                setNavigatName("Лицензии")
            }
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Сертификаты",
            onPress: () => {
                getHelpOne(setHelpDate, "CERTIFICATES", "/aboutUs")
                setNavigatName("Сертификаты")
            }
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Использование приложения",
            onPress: () => {
                getHelpOne(setHelpDate, "USING_APPLICATION", "/aboutUs")
                setNavigatName("Использование приложения")
            }
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Спецификация услуги",
            onPress: () => {
                getHelpOne(setHelpDate, "SERVICE_SPECIFICATION", "/aboutUs")
                setNavigatName("Спецификация услуги")
            }
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Условия эксплуатации",
            onPress: () => {
                getHelpOne(setHelpDate, "TERMS_OF_USE", "/aboutUs")
                setNavigatName("Условия эксплуатации")
            }
            // onPress: () => { router.push('/certificate') }
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
export default Help;
