import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import axios from 'axios';
import { category_Father, getCategory_masterAdd } from '@/helpers/api';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { useNavigation } from '@react-navigation/native';
import { getConfig } from '@/app/(tabs)/(master)/main';
import Explanations from '@/components/(explanations)/explanations';

const Category = () => {
    const { setData, data, selectedCategory, setSelectedCategory, setCompleted } = servicesStore();
    const navigation = useNavigation<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);

    const getCategory = async () => {
        try {
            const config = await getConfig();
            setIsLoading(true);
            const response = await axios.get(`${category_Father}`, config ? config : {});
            const listData = response.data.body.map((item: any) => ({
                key: item.id.toString(), // Ensure key is a string
                value: item.name,
            }));
            setData(listData);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setIsLoading(false); // Ensure loading is turned off after fetching
        }
    };

    const addCategory = async () => {
        try {
            setIsLoadingButton(true); // Set submitting to true when starting the operation
            const config = await getConfig();
            const response = await axios.post(`${getCategory_masterAdd}categoryIds=${selectedCategory}`, {}, config ? config : {});
            if (response.data.success) {
                navigation.navigate('(standart)/(services)/(expertise)/expertise');
                setCompleted([true, true, true, false]);
            } else {
                console.log('Failed to add category');
            }
        } catch (error) {
            console.error("Error adding category:", error);
        } finally {
            setIsLoadingButton(false); // Ensure submitting is turned off after operation
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    const handleCategoryPress = (id: string) => {
        if (selectedCategory === id) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(id);
        }
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name="Категория услуг" />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        backgroundColor: '#21212E'
                    }}
                >
                    <View style={tw`w-full`}>
                        <View style={[tw`p-4 mb-2`, { backgroundColor: '#21212E' }]}>
                            <Explanations
                                text='В какой области Вы специалист?'
                            />
                        </View>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (
                                <ServicesCategory
                                    title={item.value}
                                    items={item}
                                    onPress={() => handleCategoryPress(item.key)}
                                    isChecked={selectedCategory === item.key}
                                />
                            )}
                        />
                    </View>
                    <View style={tw`content-end mb-5`}>
                        <View style={tw`mt-2 content-end`}>
                        {isLoadingButton ? (
                            <ActivityIndicator size="large" color="#fff" /> 
                        ) : (
                            <Buttons
                                title="Сохранить"
                                onPress={addCategory}
                                isDisebled={selectedCategory !== null}  
                            />
                        )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Category;
