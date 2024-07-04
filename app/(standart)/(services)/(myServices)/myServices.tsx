import React from 'react';
import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import MyServicess from "@/components/services/myServices";
import { router } from "expo-router"; // router ni import qiling
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";


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
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Мои услуги`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style = {[tw``, {backgroundColor:'#21212E'}]}>
                        <View style={[tw``,{backgroundColor:'#21212E'}]}>
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
            </View>
        </SafeAreaView>
    );
};
export default MyServices;
