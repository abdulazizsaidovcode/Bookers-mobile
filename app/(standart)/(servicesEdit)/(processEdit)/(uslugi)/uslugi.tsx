import React from 'react';
import { Text, View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import MyServicess from "@/components/services/myServices";
import { router } from "expo-router"; // router ni import qiling
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";


const MyServicesEdit = () => {
    const services = [
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
      
                    <View style = {[tw`mt-5`, {backgroundColor:'#21212E'}]}>
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
    );
};
export default MyServicesEdit;
