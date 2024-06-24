import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import ServicesCategory from '@/components/services/servicesCatgegory';
import { router } from 'expo-router';

const ServesGender = () => {
    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Направление по полу`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={[tw`flex w-full`, { backgroundColor: '#21212E' }]}>
                        <ServicesCategory title="Мужское напрвление" id="male" />
                        <ServicesCategory title="Женское напрвление" id="female" />
                
                    </View>
                    <View style={[tw`grid content-end mb-5`, { backgroundColor: '#21212E' }]}>
                        <Buttons title="Сохранить" onPress={() => router.push('/category')} />
                    </View>
                </ScrollView>

            </View>

        </SafeAreaView>
    );
};

export default ServesGender;
