import React, { useState, useEffect } from 'react';
import { ScrollView, View, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import axios from 'axios';
    
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import { category_Father, getCategory_masterAdd } from '@/helpers/api';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { router } from 'expo-router';
import { getConfig } from '@/app/(tabs)/(master)/main';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'category'>;

const CategoryEdit = () => {
    const { setData, data } = servicesStore();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const getCategory = async () => {
        try {
            const config = await getConfig()
            const response = await axios.get(`${category_Father}`, config ? config : {});
            const listData = response.data.body.map((item: any) => ({
                key: item.id,
                value: item.name,
            }));
            setData(listData);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };
   useEffect(() => {
        getCategory();
    }, []);

    const addCategory = async () => {
        try {
            const config = await getConfig()
            const queryParams = selectedCategories.map(item => `categoryIds=${item}`).join('&');
            const response = await axios.post(`${getCategory_masterAdd}${queryParams}`, '', config ? config : {});
            if (response.data.success) {
                 alert('✅ Вы изменили категории',   );
               router.push('../test');
            } else {
                 alert('⚠️ Вы не меняли категории',   );
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategories(prev => {
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
        setData(categories);
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
                                    isChecked={selectedCategories.includes(item.key)}
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
