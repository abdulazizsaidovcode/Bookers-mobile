import React from 'react';
import { View } from "@/components/Themed";
import MyServicess from "@/components/services/myServices";
import { router } from "expo-router"; // router ni import qiling
import tw from "tailwind-react-native-classnames";


const MyServicesEdit = () => {
    const services = [
        {
            title: "Специализация",
            subTitle: "Не выбрано",
            onPress: () => { router.push('(standart)/(servicesEdit)/(expertiseEdit)/expertiseEdit') }
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
