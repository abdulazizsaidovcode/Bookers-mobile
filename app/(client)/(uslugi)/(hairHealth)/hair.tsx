import Buttons from '@/components/(buttons)/button';
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
    const [rangeValue, setRangeValue] = useState(0);

    // State to manage which accordion sections are open
    const [openSection, setOpenSection] = useState<number | null>(null);

    // Sample data for accordion sections
    const accordionData = [
        { id: 1, title: 'Пол мастера', content: '', checked: false },
        { id: 2, title: 'Section 2', content: 'Content of section 2', checked: false },
        { id: 3, title: 'Section 3', content: 'Content of section 3', checked: false }
    ];

    // Function to toggle accordion section
    const toggleAccordion = (id: number) => {
        if (openSection === id) {
            setOpenSection(null);
        } else {
            setOpenSection(id);
        }
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name={`Здоровье и красота волос`} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                    <Text style={[tw`text-gray-400 text-lg`, { marginBottom: 16 }]}>Подберите критерии услуг</Text>
                    {accordionData.map((section) => (
                        <View key={section.id}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[tw`rounded-lg mb-2 p-2`, { backgroundColor: '#B9B9C9' }]}
                                onPress={() => toggleAccordion(section.id)}
                            >
                                <View style={[tw`flex-row justify-between items-center px-4 py-2`]}>
                                    <Text style={[tw`text-black font-bold text-lg`]}>{section.title}</Text>
                                    <AntDesign name={openSection === section.id ? 'down' : 'right'} size={24} color="gray" />
                                </View>
                            </TouchableOpacity>
                            {openSection === section.id && (
                                <View style={[tw`px-2`, {backgroundColor:'#B9B9C9'}]}>
                                    <RadioButton
                                        value="radio"
                                        status={"unchecked"}
                                        // onPress={handlePress}
                                        color={"black"}
                                    />
                                    <Text>Hello</Text>
                                </View>
                            )}
                        </View>
                    ))}
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
