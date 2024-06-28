import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeCards from '@/components/(cards)/homeCard';
import Buttons from '@/components/(buttons)/button';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { getCategory_master, getGender_status, getSpecialization } from '@/helpers/api';
import { config } from '@/helpers/token';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { useRoute } from '@react-navigation/native';
import servicesStore from '@/helpers/state_managment/services/servicesStore';

const MyServicesScreen = () => {
    const route = useRoute();
    const { childCategoryData, categoryFatherId, setChildCategoryData } = servicesStore();
    const [gender, setGender] = useState([]);
    const [category , setCategory] = useState([]);
    const { id } = route.params as { id: string };
    const [categories, setCategories] = useState([
        'Красота и здоровье волос',
        'Маникюр и педикюр',
        'Уход за лицом',
        'Массаж и СПА',
        'Фитнес и йога',
    ]);
    const cardData = [
        { title: 'Мужское', description: 'Взрослое, Детский', icon: 'man-outline' },
        { title: 'Женское', description: 'Взрослое, Детский', icon: 'woman-outline' },
        // Add more cards as needed
    ];

    const getGender = async () => {
        try {
            const response = await axios.get(`${getGender_status}`, config);
            setGender(response.data.body)  
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };
    const getCategory = async () => {
        try {
            const response = await axios.get(`${getCategory_master}`, config);
            setCategory(response.data.body)  
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const getSpecialization = async (categoryId: string) => {
        try {
            const response = await axios.get(`${getSpecialization}${categoryId}`, config);
            console.log(response);
            
            if (response.data.success) {
                const child =
                    response.data.body &&
                    response.data.body.map((item: any) => ({
                        key: item.id,
                        name: item.name,
                    }));
                    console.log(child);
                    
                setChildCategoryData(child);
            } else {
                setChildCategoryData([]);
            }
        } catch (error) {
            console.error("Error fetching child categories:", error);
        }
    };
   
    useEffect(() => {
        getGender();
        getCategory();
    }, []);

    useEffect(() => {
        getSpecialization(id);
    }, [id]);

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Мои услуги`}  />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
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
                            {gender && gender.map(card => (
                                <HomeCards
                                    title={card.gender === 'MALE' ? 'Мужское' : 'Женское'}
                                    icon={() => <Ionicons name={card.gender === 'MALE' ? 'man-outline' : 'woman-outline'} size={30} color="white" />}
                                   description={card.description === '' ? 'Взрослое, Детский': 'Взрослое, Детский'}/>
                            ))}
                        </ScrollView>
                    </View>

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
                        {category && category.map((category, index) => (
                            <View key={index}>
                                <TouchableOpacity activeOpacity={0.6}>
                                    <Text style={tw`rounded-lg border border-gray-600 p-2 text-gray-600 text-[#828282]`}>{category.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
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
                        {categories.map((category, index) => (
                            <View key={index}>
                                <TouchableOpacity>
                                    <Text style={tw`rounded-lg border border-gray-600 p-2 text-gray-600 text-[#828282]`}>{category}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
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
                    <View style={tw`mb-10`}>
                        <Buttons onPress={() => router.push('(welcome)/Welcome')} title='На главную' />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MyServicesScreen;
