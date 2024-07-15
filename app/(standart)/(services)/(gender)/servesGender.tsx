import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import ServicesCategory from '@/components/services/servicesCatgegory';
import { router } from 'expo-router';
import axios from 'axios';
import { gender_status } from '@/helpers/api';
import { ActivityIndicator } from 'react-native-paper';
import { getConfig } from '@/app/(tabs)/main';

const ServesGender = () => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const categories = [
        { title: 'Мужское направление', id: 1 },
        { title: 'Женское направление', id: 2 },
    ];
    const post = async () => {
        setIsLoading(true)
        try {
            const config = await getConfig()
            console.log(config);
            const response = await axios.post(`${gender_status}genders=${selectedCategories}`,{},config);
            if(response.data.success === true){
              router.push("/category")  
            }
            } catch (error) {
            console.error("Error fetching services: ", error);    
        }finally {
            setIsLoading(false)
        }
    }; 
    const handleCategorySelect = (id: number) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((categoryId) => categoryId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

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
                        {categories.map((category:any) => (
                            <ServicesCategory
                                key={category.id}
                                title={category.title}
                                id={category.id}
                                onPress={() => handleCategorySelect(category.id)}
                            />
                        ))}
                    </View>
                    <View style={[tw`content-end mb-5`, { backgroundColor: '#21212E' }]}>
                    
                        <Buttons
                            title="Сохранить"
                            onPress={post}
                            isDisebled={selectedCategories.length !== 0}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ServesGender;
