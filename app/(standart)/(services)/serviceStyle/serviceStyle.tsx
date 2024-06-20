import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import ServicesCategory from '@/components/services/servicesCatgegory';
import { router } from 'expo-router';

const ServiceStyle = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={tw`flex w-full p-3`}>
                    <NavigationMenu name="Направление по полу" />
                    <ServicesCategory title="Мужское напрвление" id="male"  />
                    <ServicesCategory title="Женское напрвление" id="female"  />
                </View>
            </ScrollView>
            <View style={tw`grid content-end p-4`}>
                <Buttons title="Сохранить" onPress = { () => router.push('/category')} />
            </View>
        </SafeAreaView>
    );
};

export default ServiceStyle;

