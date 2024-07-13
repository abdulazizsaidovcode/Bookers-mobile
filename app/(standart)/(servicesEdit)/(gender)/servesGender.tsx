import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import ServicesCategory from '@/components/services/servicesCatgegory';
import axios from 'axios';
import { gender_status, getGender_status } from '@/helpers/api';
import { router } from 'expo-router';
import { getConfig } from '@/app/(tabs)/main';

interface Category {
    title: string;
    id: number;
}

interface Gender {
    id: number;
    gender: string; 
}

const ServesGenderEdit: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [genders, setGenders] = useState<Gender[]>([]);

    const categories: Category[] = [
        { title: 'Мужское направление', id: 1 },
        { title: 'Женское направление', id: 2 },
    ];

    useEffect(() => {
        fetchGenders(); 
    }, []);

    const fetchGenders = async () => {
        try {
            const config = await getConfig()
            const response = await axios.get<Gender[]>(getGender_status, config);
            setGenders(response.data.body);
            preselectCategories(response.data.body);
        } catch (error) {
            console.error("Error fetching genders:", error);
        }
    };

    const preselectCategories = (fetchedGenders: Gender[]) => {
        const selectedIds = fetchedGenders.map(gender => gender.id);
        setSelectedCategories(selectedIds);
    };

    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(categoryId)) {
                return prevSelected.filter((id) => id !== categoryId);
            } else {
                return [...prevSelected, categoryId];
            }
        });
    };

    const isChecked = (categoryId: number) => {
        return selectedCategories.includes(categoryId);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const config = await getConfig()
            const queryParams = selectedCategories.map(item => `genders=${item}`).join('&');
            await axios.post(`${gender_status}?${queryParams}`, '', config);
            router.push("(standart)/(servicesEdit)/test");
            fetchGenders();
            console.log("Selected category IDs:",selectedCategories); 
        } catch (error) {
            console.error("Error saving gender data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("Initial genders:", genders);
    }, []);

    useEffect(() => {
        const selectedGenderIds = genders.filter(gender => selectedCategories.includes(gender.id));
    }, [selectedCategories, genders]);

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Направление по полу`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={[tw`flex w-full`, { backgroundColor: '#21212E' }]}>
                        {categories.map((category) => (
                            <ServicesCategory
                                key={category.id}
                                title={category.title}
                                id={category.id}
                                isChecked={isChecked(category.id)}
                                onPress={() => handleCategorySelect(category.id)}
                            />
                        ))}
                    </View>
                    <View style={[tw`content-end mb-5`, { backgroundColor: '#21212E' }]}>
                        <Buttons
                            title="Сохранить"
                            onPress={handleSave}
                            // isDisebled={selectedCategories.length === 0 || isLoading}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ServesGenderEdit;
