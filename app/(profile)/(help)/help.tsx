import React from 'react';
import { View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import MyServicesCard from '@/components/services/myServicesCard';
import { getHelpOne } from '@/helpers/api-function/help/help';
import heplStore from '@/helpers/state_managment/help/helpStore';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { useNavigation } from 'expo-router';
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(profile)/(help)/help'>;



const HelpPage = () => {
    const { setNavigatName, setHelpDate, isLoading, setIsLoading} = heplStore()
    const navigation = useNavigation<SettingsScreenNavigationProp>()


    const services = [
        {
            title: "О сервисе",
            onPress: () => {
                getHelpOne(setHelpDate, "ABOUT_SERVICE", "(standart)/(help)/(aboutUs)/aboutUs", navigation)
                setNavigatName("О сервисе")
            }
        },
        {
            title: "Оферта",
            onPress: () => 
                {
                getHelpOne(setHelpDate, "OFFER", "(standart)/(help)/(aboutUs)/aboutUs", navigation)
                setNavigatName("Оферта")
            }
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Политика конфиденциальности",
            onPress: () => {
                getHelpOne(setHelpDate, "PRIVACY_POLICY", "(standart)/(help)/(aboutUs)/aboutUs", navigation)
                setNavigatName("Политика конфиденциальности")
            }
            // onPress: () => { router.push('/offer') }
        },
        {
            title: "Лицензионное соглашение",
            onPress: () => {
                getHelpOne(setHelpDate, "LICENSE_AGREEMENT", "(standart)/(help)/(aboutUs)/aboutUs", navigation)
                setNavigatName("Лицензионное соглашение")
            }
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Лицензии",
            onPress: () => {
                getHelpOne(setHelpDate, "LICENSES", "(standart)/(help)/(aboutUs)/aboutUs", navigation)
                setNavigatName("Лицензии")
            }
            // onPress: () => { router.push('/certificate') }
        },
        {
            title: "Сертификаты",
            onPress: () => {
                getHelpOne(setHelpDate, "CERTIFICATES", "(standart)/(help)/(aboutUs)/aboutUs", navigation)
                setNavigatName("Сертификаты")
            }
            // onPress: () => { router.push('/certificate') }
        },
        // {
        //     title: "Использование приложения",
        //     onPress: () => {
        //         getHelpOne(setHelpDate, "USING_APPLICATION", "(standart)/(help)/(aboutUs)/aboutUs")
        //         setNavigatName("Использование приложения")
        //     }
        //     // onPress: () => { router.push('/certificate') }
        // },
        // {
        //     title: "Спецификация услуги",
        //     onPress: () => {
        //         getHelpOne(setHelpDate, "SERVICE_SPECIFICATION", "(standart)/(help)/(aboutUs)/aboutUs")
        //         setNavigatName("Спецификация услуги")
        //     }
        //     // onPress: () => { router.push('/certificate') }
        // },
        // {
        //     title: "Условия эксплуатации",
        //     onPress: () => {
        //         getHelpOne(setHelpDate, "TERMS_OF_USE", "/aboutUs")
        //         setNavigatName("Условия эксплуатации")
        //     }
        //     // onPress: () => { router.push('/certificate') }
        // },
    ];

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <View style={{ paddingLeft: 10, backgroundColor: "#21212E" }}>
                <NavigationMenu name={`Помощь`} />
            </View>
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
export default HelpPage;
