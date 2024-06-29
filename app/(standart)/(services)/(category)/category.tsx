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
import { category_Father, category_child } from '@/helpers/api';
import { config } from '@/helpers/token';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';
import { ActivityIndicator } from 'react-native-paper';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'category'>;

const Category = () => {
    const { setData, data, categoryFatherId, setChildCategoryData, childCategoryData } = servicesStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const navigation = useNavigation<SettingsScreenNavigationProp>();

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
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const getChildCategory = async (id: string) => {
        try {
            const response = await axios.get(`${category_child}${id}`, config);
            if (response.data.success) {
                setChildCategoryData(response.data.body);
                console.log("Child Category IDs:", response.data.body.map((item: any) => item.id));
            } else {
                setChildCategoryData([]);
            }
        } catch (error) {
            console.error("Error fetching child categories:", error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    const openModal = () => {
        setModalVisible(true);
        if (categoryFatherId && categoryFatherId.key) {
            getChildCategory(categoryFatherId.key);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setChildCategoryData([]);
    };

    const handlerPress = (id: string) => {
        setSelectedCategory(id);  // Set selected category
        navigation.navigate('(standart)/(services)/(expertise)/expertise', { id });
    };

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
                                <ServicesCategory title={item.value} items={item} />
                            )}
                        />
                    </View>
                    <View style={tw`content-end mb-5`}>
                        <View style={tw`mt-2 content-end`}>
                            <Buttons
                                title="Сохранить"
                                onPress={openModal}
                            />
                        </View>
                        <CenteredModal
                            isModal={modalVisible}
                            btnWhiteText='Добавить'
                            btnRedText='Закрыть'
                            isFullBtn={false}
                            toggleModal={closeModal}
                            onConfirm={() => {
                                handlerPress(categoryFatherId.key)
                                closeModal();
                            }}
                        >
                            <View style={tw`p-4 text-center`}>
                                <Text style={tw`text-white text-xl w-full text-2xl`}>Здоровье и красота волос</Text>
                                <Text style={tw`text-center text-white text-xl`}>В эту категорию входят услуги таких специализаций как:</Text>
                                {childCategoryData && childCategoryData.map((item: any, idx: number) => (
                                    <Text key={item.id} style={{ color: 'white', fontSize: 20 }}>
                                        {idx + 1}. {item.name}
                                    </Text>
                                ))}
                            </View>
                        </CenteredModal>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Category;
