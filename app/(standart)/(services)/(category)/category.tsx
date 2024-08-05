import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import axios from 'axios';
import { category_Father, category_child, getCategory_masterAdd } from '@/helpers/api';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { ActivityIndicator } from 'react-native-paper';
import { router } from 'expo-router';
import { getConfig } from '@/app/(tabs)/(master)/main';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'category'>;

const Category = () => {
    const { setData, data, setChildCategoryData, childCategoryData, selectedCategory, setSelectedCategory, setCompleted } = servicesStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

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

    const getChildCategory = async (id: string) => {
        setLoading(true);
        try {
            const config = await getConfig();
            const response = await axios.get(`${category_child}${id}`, config ? config : {});
            if (response.data.success) {
                setChildCategoryData(response.data.body);
            } else {
                setChildCategoryData([]);
            }
        } catch (error) {
            console.error("Error fetching child categories:", error);
            setChildCategoryData([]);
        } finally {
            setLoading(false);
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
                console.log();
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    useEffect(() => {
        getCategory();
        setSelectedCategory(null)
    }, []);

    const openModal = (id: string) => {
        setModalVisible(true);
        getChildCategory(id);
    };

    const closeModal = () => {
        setModalVisible(false);
        setChildCategoryData([]);
    };

    const handleCategoryPress = (id: string) => {
        if (selectedCategory === id) {
            setSelectedCategory(null);
            closeModal();
        } else {
            setSelectedCategory(id);
            openModal(id);
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
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.key}
                            renderItem={({ item }) => (
                                <ServicesCategory
                                    title={item.value}
                                    items={item}
                                    onPress={() => handleCategoryPress(item.key)}
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
                        <CenteredModal
                            isModal={modalVisible}
                            btnWhiteText=""
                            oneBtn
                            btnRedText="Закрыть"
                            isFullBtn={false}
                            toggleModal={closeModal}
                            onConfirm={closeModal}
                        >
                            <View style={tw`p-4 text-center`}>
                                {loading ? (
                                    <ActivityIndicator size="large" color="#9C0A35" />
                                ) : (
                                    <>
                                        <Text style={tw`text-white text-xl w-full text-2xl`}>Здоровье и красота волос</Text>
                                        <Text style={tw`text-center text-white text-xl`}>В эту категорию входят услуги таких специализаций как:</Text>
                                        {childCategoryData.length > 0 ? (
                                            <ScrollView style={childCategoryData.length > 10 ? { maxHeight: 300 } : { maxHeight: 300 }}>
                                                {childCategoryData.map((item: any, idx: any) => (
                                                    <Text key={item.id} style={{ color: 'white', fontSize: 20 }}>
                                                        {idx + 1}. {item.name}
                                                    </Text>
                                                ))}
                                            </ScrollView>
                                        ) : (
                                            <Text style={tw`text-center text-gray-600 text-xl mb-2`}>Информация недоступна</Text>
                                        )}
                                    </>
                                )}
                            </View>
                        </CenteredModal>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Category;
