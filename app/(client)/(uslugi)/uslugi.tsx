import HomeCards from '@/components/(cards)/homeCard';
import NavigationMenu from '@/components/navigation/navigation-menu';

import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity,StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';


const Uslugi = () => {
    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name="Категория услуг" />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}  >
                    <View style={tw`w-full`}>
                       <TouchableOpacity
                       />
                       <HomeCards/>
                    </View>

                </ScrollView>
            </View>

        </SafeAreaView>
    );
};

export default Uslugi;
