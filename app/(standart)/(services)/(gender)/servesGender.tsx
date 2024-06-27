import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import Buttons from '@/components/(buttons)/button';
import ServicesCategory from '@/components/services/servicesCatgegory';
import { router } from 'expo-router';

const ServesGender = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { title: 'Мужское направление', id: 'male' },
        { title: 'Женское направление', id: 'female' },
    ];

    const handleCategorySelect = (id) => {
        setSelectedCategory(id);
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
                        {categories.map((category) => (
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
                            onPress={() => router.push('/category')}
                            isDisebled={!selectedCategory}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ServesGender;
