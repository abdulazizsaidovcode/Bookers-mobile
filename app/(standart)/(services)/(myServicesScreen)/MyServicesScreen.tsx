import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import NavigationMenu from '@/components/navigation/navigation-menu';
import HomeCards from '@/components/(cards)/homeCard';
import Buttons from '@/components/(buttons)/button';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { getCategory_master, getGender_status, getSpecialization, master_get_Service } from '@/helpers/api';
import { router } from 'expo-router';
import { putNumbers } from '@/helpers/api-function/numberSittings/numbersetting';
import { getConfig } from '@/app/(tabs)/main';

const MyServicesScreen = () => {
    const route = useRoute();
    const { setProdseduraUslug ,serviceSelectId} = servicesStore();
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

    const getGender = async () => {
        try {
            const config = await getConfig()
            const response = await axios.get(getGender_status, config);
            setGender(response.data.body);
        } catch (error) {
            console.error("Error fetching gender services:", error);
        }
    };

    const getCategory = async () => {
        try {
            const config = await getConfig()
            const response = await axios.get(getCategory_master, config);
            setCategory(response.data.body);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getSpecializationData = async (selectedCategoryId:any) => {
        try {
            const config = await getConfig()
            const { data } = await axios.get(`${getSpecialization}?categoryId=${selectedCategoryId}`, config);
            if (data.success) setSpecialization(data.body);
            else setSpecialization([]);
        } catch (error:any) {
            if (error.response?.status) setSpecialization([]);
            console.error("Error fetching specializations:", error);
        }
    };

    const getMasterData = async (categoryId:any) => {
        try {
            const config = await getConfig()
            const { data } = await axios.get(`${master_get_Service}${categoryId}`, config);
            if (data.success) setCategoryMaster(data.body);
            else setCategoryMaster([]);
        } catch (error:any) {
            if (error.response?.status === 404) setCategoryMaster([]);
            console.error("Error fetching master services:", error);
        }
    };
    const translateGender = (genders: string[]) => {
        return genders.map((item) => {
            if (item === "MALE") return "Мужская для взрослых";
            else if (item === "FEMALE") return "Женское для взрослых";
            else if (item === "MALE_CHILD") return "Мужская для детей";
            else if (item === "FEMALE_CHILD") return "Женское для детей ";
            else return item;
        });
    };

    useEffect(() => {
        getGender();
        getCategory();
    }, []);

    const handleCategorySelect = (categoryId: string, index: any) => {
        setSelectedCategory(index);
        getSpecializationData(categoryId);
        getMasterData(categoryId);
        console.log("Selected category ID:", categoryId);
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
                            {gender.map((card:any) => (
                                <HomeCards
                                    key={card.gender}
                                    title={card.gender === 'MALE' ? 'Мужское' : 'Женское'}
                                    icon={() => <Ionicons name={card.gender === 'MALE' ? 'man-outline' : 'woman-outline'} size={30} color="white" />}
                                    description={card.description || 'Взрослое, Детский'}
                                />
                            ))}
                        </ScrollView>
                    </View>

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
                        {category.map((categoryItem:any, index) => (
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

                    <View style={tw`flex flex-row justify-between mb-2 p-4`}>
                        <Text style={tw`text-white mb-2 text-xl`}>Специализация услуг</Text>
                        <TouchableOpacity
                             onPress={() => router.push(`(standart)/(servicesEdit)/(expertiseEdit)/expertiseEdit`)}
                            activeOpacity={0.6}
                            style={{ padding: 10 }}
                        >
                            <MaterialIcons name="mode-edit" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    {specialization.length > 0 ? (
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ gap: 16, marginBottom: 5 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            {specialization.map((item:any) => (
                                <View key={item.id}>
                                    <TouchableOpacity
                                    onPress={getCategory}>
                                        <Text style={tw`rounded-lg border border-gray-600 p-2 text-gray-600 text-[#828282]`}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={tw`flex flex-row justify-center mb-2 p-4`}>
                            <Text style={tw`text-gray-600 mb-2 text-lg`}>Нет доступных специализаций для выбранной категории</Text>
                        </View>
                    )}

                    <View style={tw`flex flex-row justify-between p-4 mb-2`}>
                        <Text style={tw`text-white mb-2 text-xl`}>Процедуры услуг</Text>
                        <TouchableOpacity activeOpacity={0.6}>
                            <AntDesign name="pluscircleo" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    {categoryMaster.length > 0 ? (
                        categoryMaster.map((item:any) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    setProdseduraUslug(item);
                                    router.push({
                                        pathname: '(standart)/(servicesEdit)/(processEdit)/processEdit',
                                        params: {
                                            item: JSON.stringify(item)
                                        }
                                    });
                                }}
                                activeOpacity={0.8}
                            >
                                <View style={tw`bg-white rounded-lg rounded-xl mb-4 p-4`}>
                                    <Text style={tw`font-bold text-xl mb-3`}>{translateGender(item.genderNames).join(", ")}</Text>
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
                                        {item.price !== 0 ? `${item.price} сум` : '0'}
                                    </Text>

                                    <Text style={tw`text-black mb-2`}>{item.description || 'Описание не предоставлено'}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={tw`flex flex-row justify-center mb-2 p-4`}>
                            <Text style={tw`text-white mb-2 text-lg`}>Нет доступных процедур для выбранной категории</Text>
                        </View>
                    )}

                    <View style={tw`mb-10`}>
                        <Buttons onPress={() => {
                            putNumbers(2)
                            router.push('(welcome)/Welcome')
                        }} title='На главную ' />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default MyServicesScreen;
