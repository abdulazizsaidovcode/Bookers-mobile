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
import { getCategory_master, getGender_status, getSpecialization, master_get_Service } from '@/helpers/api';
import { config } from '@/helpers/token';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { putNumbers } from '@/helpers/api-function/numberSittings/numbersetting';

const MyServicesScreen = () => {
    const route = useRoute();
    const { childCategoryData, categoryFatherId, setChildCategoryData } = servicesStore();
    const [gender, setGender] = useState([]);
    const [specialization, setSpecialization] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoryMaster, setCategoryMaster] = useState([]);
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

    // Function to fetch specialization data based on categoryId
    const getSpecializationData = async (categoryId: string) => {
        try {
            const response = await axios.get(`${getSpecialization}?categoryId=${categoryId}`, config);
            setSpecialization(response.data.body);
        } catch (error) {
            console.error("Error fetching specializations:", error);
        }
    };

    // Function to fetch master data based on categoryId
    const getMasterData = async (categoryId: string) => {
        try {
            const response = await axios.get(`${master_get_Service}${categoryId}`, config);
            setCategoryMaster(response.data.body);
        } catch (error) {
            console.error("Error fetching master services:", error);
        }
    };

    // Function to translate gender names
    const translateGender = (genders: string[]) => {
        return genders.map((item) => {
            if (item === "MALE") return "Мужская для взрослых";
            else if (item === "FEMALE") return "Женское для взрослых";
            else if (item === "MALE_CHILD") return "Мужская для детей";
            else if (item === "FEMALE_CHILD") return "Женское для детей ";
            else return item; // Handle other cases as needed
        });
    };

    useEffect(() => {
        getGender();
        getCategory();
    }, []);

    // Handle category selection
    const handleCategorySelect = (categoryId: string, index: number) => {
        setSelectedCategory(index);
        getSpecializationData(categoryId);
        getMasterData(categoryId);
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
                        <TouchableOpacity 
                        activeOpacity={0.6}
                        onPress={() => router.push('(standart)/(servicesEdit)/(gender)/servesGender')}>
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
                                    title={card.gender === 'MALE' ? 'Мужское' : 'Женское'} // Translate gender name
                                    icon={() => <Ionicons name={card.gender === 'MALE' ? 'man-outline' : 'woman-outline'} size={30} color="white" />}
                                    description={card.description || 'Взрослое, Детский'}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {/* Category Section */}
                    <View style={tw`flex flex-row justify-between p-4 mb-2`}>
                        <Text style={tw`text-white mb-2 text-xl`}>Категория услуг</Text>
                        <TouchableOpacity 
                        onPress={() => router.push('(standart)/(servicesEdit)/(categoryEdit)/category')}
                        activeOpacity={0.6}>
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
                        <TouchableOpacity
                        onPress={() => router.push('(standart)/(servicesEdit)/(expertiseEdit)/expertiseEdit')}
                        activeOpacity={0.6}>
                            <MaterialIcons name="mode-edit" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ gap: 16, marginBottom: 5 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {specialization.map((item) => (
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
                            <AntDesign name="pluscircleo" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    {categoryMaster.map((item) => (
                        <TouchableOpacity
                        onPress={()=>router.push('')}
                         activeOpacity={.8}>
                             <View key={item.id} style={tw`bg-white rounded-lg rounded-xl mb-4 p-4`}>
                            <Text style = {tw`font-bold text-xl mb-3`}>{translateGender(item.genderNames).join(", ")}</Text>
                            <ScrollView
                                horizontal
                                contentContainerStyle={{ gap: 16, marginBottom: 5 }}
                                showsHorizontalScrollIndicator={false}
                            >
                                <TouchableOpacity>
                                    <Text style={tw`rounded-lg border border-gray-600 p-2 text-gray-600 text-[#828282]`}>{item.name}</Text>
                                </TouchableOpacity>
                            </ScrollView>
                            <Text style={[tw`font-bold text-xl mb-3`, { color: '#9C0A35' }]}>
                                {item.price !== 0 ? `${item.price} сум` : 0}
                            </Text>

                            <Text style={tw`text-black mb-2`}>{item.description || 'Описание не предоставлено'}</Text>
                        </View>
                        </TouchableOpacity>
                       
                    ))}

                    {/* Navigation Button */}
                    <View style={tw`mb-10`}>
                        <Buttons onPress={() => {
                            putNumbers(2)
                            router.push('(welcome)/Welcome')
                        }} title='На главную' />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MyServicesScreen;
