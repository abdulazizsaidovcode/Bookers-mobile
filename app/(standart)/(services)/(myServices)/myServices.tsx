import React, { useCallback, useState } from 'react';
import { View } from "@/components/Themed";
import NavigationMenu from "@/components/navigation/navigation-menu";
import MyServicess from "@/components/services/myServices";
import { router, useFocusEffect } from "expo-router"; // router ni import qiling
import { Pressable, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import servicesStore from '@/helpers/state_managment/services/servicesStore';

const MyServices = () => {
    const { completed, setCompleted } = servicesStore()
    const services = [
        {
            title: "Направление услуг по полу",
            subTitle: "Не выбрано",
            onPress: () => {
                router.push('/servesGender');
            },
            enabled: completed[0]
        },
        {
            title: "Категория услуг",
            subTitle: "Не выбрано",
            onPress: () => {
                router.push('/category');
            },
            enabled: completed[1]
        },
        {
            title: "Специализация",
            subTitle: "Не выбрано",
            onPress: () => {
                router.push('/expertise');
            },
            enabled: completed[2]
        },
        {
            title: "Процедура услуг",
            subTitle: "Не выбрано",
            onPress: () => {
                router.push('/process');
            },
            enabled: completed[3]
        },
    ];



    return (
        <SafeAreaView style={[tw`flex-1 p-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Мои услуги`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={[tw``, { backgroundColor: '#21212E' }]}>
                        <View style={[tw``, { backgroundColor: '#21212E' }]}>
                            {services.map((service, index) => (
                                <Pressable style={({ pressed }) => [
                                    {
                                        opacity: pressed ? 0.8 : !service.enabled ? 0.5 : 1,
                                    },
                                ]}
                                    disabled={service.enabled}
                                >

                                    <MyServicess
                                        key={index}
                                        title={service.title}
                                        subTitle={service.subTitle}
                                        onPress={service.enabled ? service.onPress : null}
                                        disabled={!service.enabled} // Pass the disabled prop
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


export default MyServices;
