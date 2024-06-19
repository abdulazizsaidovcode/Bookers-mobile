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
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={tw`flex w-full`}>
                    <NavigationMenu name="Мои услуги" />
                    <View style={tw` p-5`}>
                        <MyServicess
                            title="Направление услуг по полу"
                            subTitle="Не выбрано"
                            
                        />
                        <MyServicess
                            title="Hellor"
                            subTitle="Hello"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default MyServices;
