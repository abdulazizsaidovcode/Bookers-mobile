import Buttons from '@/components/(buttons)/button';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { handleRefresh } from '@/constants/refresh';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Hair = () => {
    const router = useRouter(); // Initialize the useRouter hook
    const [rangeValue, setRangeValue] = useState(0);


    // State to manage which accordion sections are open
    const [openSection, setOpenSection] = useState(null);

    // Sample data for accordion sections
    const accordionData = [
        { id: 1, title: 'Пол мастера', content:'', checked: false },
        { id: 2, title: 'Section 2', content: 'Content of section 2', checked: false },
        { id: 3, title: 'Section 3', content: 'Content of section 3', checked: false }
    ];

    // Function to toggle accordion section
    const toggleAccordion = (id) => {
        if (openSection === id) {
            setOpenSection(null); // Close the section if it's already open
        } else {
            setOpenSection(id); // Open the clicked section
        }
    };

    // Function to toggle checkbox state
    const toggleCheckbox = (id) => {
        const updatedAccordionData = accordionData.map(item => {
            if (item.id === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setAccordionData(updatedAccordionData);
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
                    {accordionData.map((item) => (
                        <TouchableOpacity
                           activeOpacity={.8}
                            key={item.id}
                            style={[tw`rounded-lg mb-2 p-2`, openSection === item.id && tw`mb-4`, { backgroundColor: '#B9B9C9' }]}
                            onPress={() => toggleAccordion(item.id)}>
                            <View style={[tw`flex-row justify-between items-center px-4 py-2`]}>
                                <Text style={[tw`text-black font-bold text-lg`]}>{item.title}</Text>
                                <AntDesign name={openSection === item.id ? 'down' : 'right'} size={24} color="gray" />
                            </View>
                            {openSection === item.id && (
                                <View style={[tw`px-4 py-2`]}>
                                    <Text style={[tw`text-white`]}>
                                        {item.content}
                                    </Text>
                                    <TouchableOpacity
                                        style={[tw`flex-row items-center mt-2`]}
                                        onPress={() => toggleCheckbox(item.id)}>
                                        <AntDesign
                                            name={item.checked ? 'checksquare' : 'checksquareo'}
                                            size={24}
                                            color={item.checked ? 'green' : '#9C0A35'}
                                        />
                                        <Text style={[tw`text-white ml-2`]}>
                                            не важно
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={tw`content-end mb-5`}>
                        <View style={tw`mt-2 content-end`}>
                            <Buttons
                                title="Подобрать мастера"
                                onPress={()=>router.push('(client)/(uslugi)/(specialist)/specialist')}
                                // isDisebled={selectedCategory.length !== 0}
                            />
                        </View>
                </View>        
            </ScrollView>
        </SafeAreaView>
    );
};
export default Hair;
