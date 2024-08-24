import React, { useState } from 'react';
import { ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import ServicesCategory from '@/components/services/servicesCatgegory';
import { useNavigation } from '@react-navigation/native';  // Corrected import
import axios from 'axios';
import { gender_status } from '@/helpers/api';
import { getConfig } from '@/app/(tabs)/(master)/main';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import Toast from "react-native-simple-toast";
import Explanations from '@/components/(explanations)/explanations';

const ServesGender: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const { setCompleted } = servicesStore();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<any>();  // Corrected type

    const categories = [
        { title: 'Мужское направление', id: 1 },
        { title: 'Женское направление', id: 2 },
    ];

    const post = async () => {
        setIsLoading(true);
        try {
            const config = await getConfig();
            const queryString = selectedCategories.map(id => `genders=${id}`).join('&');
            const url = `${gender_status}?${queryString}`;
            
            // Log the URL and query parameters
            console.log('Sending request to:', url);
            
            const response = await axios.post(url, {}, config || {});
            
            // Log the response data
            console.log('Response data:', response.data);
            
            if (response.data.success) {
                Toast.show('✅ Muvaffaqiyatli', Toast.LONG);
                navigation.navigate('(standart)/(services)/(category)/category');
                setCompleted([true, true, false, false]);
            }
        } catch (error) {
            // Log the error
            console.error('Error fetching services:', error);
            Toast.show('⚠️ Пол не был успешно введен', Toast.LONG);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCategorySelect = (id: number) => {
        setSelectedCategories(prevSelected => 
            prevSelected.includes(id)
                ? prevSelected.filter(categoryId => categoryId !== id)
                : [...prevSelected, id]
        );
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name="Направление по полу" />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={[tw`flex w-full`, { backgroundColor: '#21212E' }]}>
                        <View style={[tw`p-4 mb-2`, { backgroundColor: '#21212E' }]}>
                            <Explanations text='Для кого Вы оказываете услуги ?' />
                        </View>
                        {categories.map(category => (
                            <ServicesCategory
                                key={category.id}
                                title={category.title}
                                id={category.id}
                                onPress={() => handleCategorySelect(category.id)}
                            />
                        ))}
                    </View>
                    <View style={[tw`content-end mb-5`, { backgroundColor: '#21212E' }]}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <Buttons
                                title="Сохранить"
                                onPress={post}
                                isDisebled={selectedCategories.length !== 0}
                            />
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ServesGender;
