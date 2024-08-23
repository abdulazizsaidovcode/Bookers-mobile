import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import axios from 'axios';
import { category_Father, category_child, getCategory_masterAdd } from '@/helpers/api';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { router } from 'expo-router';
import { getConfig } from '@/app/(tabs)/(master)/main';
import Explanations from '@/components/(explanations)/explanations';

const Category = () => {
    const { setData, data, selectedCategory, setSelectedCategory, setCompleted } = servicesStore();


    const getCategory = async () => {
        try {
            const config = await getConfig();
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



    const addCategory = async () => {
        try {
            const config = await getConfig();
            const response = await axios.post(`${getCategory_masterAdd}categoryIds=${selectedCategory}`, {}, config ? config : {});
            if (response.data.success) {
                router.push('(standart)/(services)/(expertise)/expertise');
                setCompleted([true, true, true, false]);
            } else {
                console.log('Failed to add category');
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    // const openModal = (id: string) => {
    //     setModalVisible(true);
    //     getChildCategory(id);
    // };

    // const closeModal = () => {
    //     setModalVisible(false);
    //     setChildCategoryData([]);
    // };

    const handleCategoryPress = (id: string) => {
        if (selectedCategory === id) {
            setSelectedCategory(null);
            // closeModal();
        } else {
            setSelectedCategory(id);
            // openModal(id);
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
                            <Buttons
                                title="Сохранить"
                                onPress={addCategory}
                                isDisebled={selectedCategory !== null}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Category;
