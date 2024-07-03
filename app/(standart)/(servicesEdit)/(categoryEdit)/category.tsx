import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import { router } from 'expo-router';
import axios from 'axios';
import { category_Father, category_child, getCategory_master, getCategory_masterAdd } from '@/helpers/api';
import { config } from '@/helpers/token';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { ActivityIndicator } from 'react-native-paper';
import Toast from "react-native-simple-toast";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'category'>;

const CategoryEdit = () => {
    const { setData, data, categoryFatherId, setChildCategoryData, childCategoryData } = servicesStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    const getCategory = async () => {
        try {
            const response = await axios.get(`${category_Father}`, config);
            const listData =
                response.data.body &&
                response.data.body.map((item: any) => ({
                    key: item.id,
                    value: item.name,
                }));
            setData(listData);
            return listData;
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const getCategoryMaster = async () => {
        try {
            const response = await axios.get(`${getCategory_master}`, config);
            const listData =
                response.data.body &&
                response.data.body.map((item: any) => ({
                    key: item.id,
                    value: item.name,
                }));
            return listData;
        } catch (error) {
            console.error("Error fetching master services:", error);
        }
    };

const addCategory = async () => {
    try {
        console.log("Sending data:", selectedCategories);
        const queryParams = selectedCategories.map(item => `categoryIds=${item}`).join('&');
        const response = await axios.post(`${getCategory_masterAdd}?${queryParams}`, '', config);
        console.log("Received response:", response.data);

        // Check if the response indicates success
        if (response.data.success) {
            Toast.show('✅ Вы изменили категории', Toast.LONG)
            router.push("/MyServicesScreen");
        } else {
            Toast.show('⚠️ Вы не меняли категории', Toast.LONG) 
        }
    } catch (error) {
        console.log("Error", error);
    }
};


    const handleCategorySelect = (category: string) => {
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter(item => item !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const initializeCategories = async () => {
        const [categories, masterCategories] = await Promise.all([getCategory(), getCategoryMaster()]);

        const initialSelectedCategories = masterCategories
            .filter((masterCategory: any) => categories.some((category: any) => category.key === masterCategory.key))
            .map((category: any) => category.key);

        setSelectedCategories(initialSelectedCategories);
        setData(categories); // set the categories to be displayed
    };

    useEffect(() => {
        initializeCategories();
    }, []);

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Категория услуг`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={tw`w-full`}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <ServicesCategory
                                    title={item.value}
                                    items={item}
                                    onPress={() => handleCategorySelect(item.key)}
                                    isSelected={selectedCategories.includes(item.key)}
                                />
                            )}
                        />
                    </View>
                    <View style={tw`content-end mb-5`}>
                        <View style={tw`mt-2 content-end`}>
                            <Buttons
                                title="Сохранить"
                                onPress={addCategory}
                                isDisebled={selectedCategories.length !== 0}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default CategoryEdit;
