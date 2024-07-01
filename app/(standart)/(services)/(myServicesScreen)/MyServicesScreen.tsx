import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import HomeCards from '@/components/(cards)/homeCard';
import Buttons from '@/components/(buttons)/button';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { getCategory_master, getGender_status, getSpecialization } from '@/helpers/api';
import { config } from '@/helpers/token';
import { router } from 'expo-router';

const MyServicesScreen = () => {
    const route = useRoute();
    const { childCategoryData, categoryFatherId, setChildCategoryData } = servicesStore();
    const [gender, setGender] = useState([]);
    const [specialization, setSpecialization] = useState([{ name: "dfdss" }]); // Initial state with a placeholder
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { id } = route.params as { id: string };
    const [categories, setCategories] = useState([
        'Красота и здоровье волос',
        'Маникюр и педикюр',
        'Уход за лицом',
        'Массаж и СПА',
        'Фитнес и йога',
    ]);

    // Function to fetch gender data
    const getGender = async () => {
        try {
            const response = await axios.get(getGender_status, config);
            setGender(response.data.body);
        } catch (error) {
            console.error("Error fetching gender services:", error);
        }
    };

    // Function to fetch category data
    const getCategory = async () => {
        try {
            const response = await axios.get(getCategory_master, config);
            setCategory(response.data.body);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Function to fetch specialization data based on categoryFatherId
    const getSpecializationData = async (categoryId: string) => {
        try {
            const response = await axios.get(`http://45.67.35.86:8080/master-service/specialization?categoryId=${categoryId}`, config);
            setSpecialization(response.data.body); // Assuming response.data.body is an array of specialization objects
        } catch (error) {
            console.error("Error fetching specializations:", error);
        }
    };

    // Effect to fetch gender and category data on component mount
    useEffect(() => {
        getGender();
        getCategory();
    }, []);

    // Function to handle category selection and fetch specialization data
    const handleCategorySelect = (categoryId: string, index: number) => {
        setSelectedCategory(index);
        getSpecializationData(categoryId);
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Мои услуги`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    {/* Gender Section */}
                    <View style={tw`flex flex-row justify-between p-4 mb-4`}>
                        <Text style={tw`text-white mb-2 text-xl`}>Направление услуг по полу</Text>
                        <TouchableOpacity activeOpacity={0.6}>
                            <MaterialIcons name="mode-edit" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`flex flex-row w-50 p-2 gap-5`}>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ gap: 10, marginBottom: 5 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {gender.map((card) => (
                                <HomeCards
                                    key={card.gender}
                                    title={card.gender === 'MALE' ? 'Мужское' : 'Женское'}
                                    icon={() => <Ionicons name={card.gender === 'MALE' ? 'man-outline' : 'woman-outline'} size={30} color="white" />}
                                    description={card.description || 'Взрослое, Детский'}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {/* Category Section */}
                    <View style={tw`flex flex-row justify-between p-4 mb-2`}>
                        <Text style={tw`text-white mb-2 text-xl`}>Категория услуг</Text>
                        <TouchableOpacity activeOpacity={0.6}>
                            <MaterialIcons name="mode-edit" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ gap: 16, marginBottom: 10 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {category.map((categoryItem, index) => (
                            <View key={categoryItem.id}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => handleCategorySelect(categoryItem.id, index)}
                                >
                                    <Text style={[
                                        tw`rounded-lg border border-gray-600 px-4 py-3 text-gray-600`,
                                        selectedCategory === index ? tw`bg-white text-black` : tw`bg-transparent text-gray-600`
                                    ]}>
                                        {categoryItem.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Specialization Section */}
                    <View style={tw`flex flex-row justify-between mb-2 p-4`}>
                        <Text style={tw`text-white mb-2 text-xl`}>Специализация услуг</Text>
                        <TouchableOpacity activeOpacity={0.6}>
                            <MaterialIcons name="mode-edit" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ gap: 16, marginBottom: 5 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {specialization.map((item, index) => (
                            <View key={item.id}>
                                <TouchableOpacity>
                                    <Text style={tw`rounded-lg border border-gray-600 p-2 text-gray-600 text-[#828282]`}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Procedures Section */}
                    <View style={tw`flex flex-row justify-between p-4 mb-2`}>
                        <Text style={tw`text-white mb-2 text-xl`}>Процедуры услуг</Text>
                        <TouchableOpacity activeOpacity={0.6}>
                            <MaterialIcons name="mode-edit" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`bg-white rounded-lg rounded-xl mb-4 p-4`}>
                        <Text style={tw`font-bold text-xl`}>Мужская для взрослых</Text>
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ gap: 16, marginTop: 10, marginBottom: 5 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {categories.map((category, index) => (
                                <View key={index}>
                                    <TouchableOpacity>
                                        <Text style={tw`rounded-lg border border-gray-600 p-2 text-gray-600 text-[#828282] mb-2`}>{category}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                        <Text style={[tw`font-bold text-xl mb-3`, { color: '#9C0A35' }]}>350 000 сум</Text>
                        <Text style={tw`text-black mb-2`}>В услугу входит мытьё головы, массаж головы и Разнообразный и богатый опыт постоянный</Text>
                    </View>

                    {/* Navigation Button */}
                    <View style={tw`mb-10`}>
                        <Buttons onPress={() => router.push('(welcome)/Welcome')} title='На главную' />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MyServicesScreen;
