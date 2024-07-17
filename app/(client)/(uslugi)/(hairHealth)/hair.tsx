import Buttons from '@/components/(buttons)/button';
import AccordionFree from '@/components/accordions/accardionFree';
import CustomCheckbox from '@/components/checkbox/checkbox';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { handleRefresh } from '@/constants/refresh';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { RadioButton } from 'react-native-paper';
import tw from 'tailwind-react-native-classnames';


const Hair = () => {
    const router = useRouter(); // Initialize the useRouter hook
    const [isSelected, setSelection] = useState(false);
   
   

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name={`Здоровье и красота волос`} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                    <Text style={[tw`text-gray-400 text-lg`, { marginBottom: 16 }]}>Подберите критерии услуг</Text>
                    <AccordionFree
                     title='Пол мастера'
                    />
                </View>
                <View style={tw`content-end mb-5`}>
                    <View style={tw`mt-2 content-end`}>
                        <Buttons
                            title="Подобрать мастера"
                            onPress={() => router.push('(client)/(uslugi)/(specialist)/specialist')}
                            // isDisebled={selectedCategory.length !== 0}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Hair;
