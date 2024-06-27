import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import axios from 'axios';
import { base_url, category_child, masterAdd_category } from '@/helpers/api';
import { config } from '@/helpers/token';
import { useRoute } from '@react-navigation/native';

const Expertise: React.FC = () => {
    const route = useRoute();
    const { childCategoryData, categoryFatherId, setChildCategoryData } = servicesStore();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const { id } = route.params as { id: string };

    useEffect(() => {
        if (categoryFatherId && categoryFatherId.key) {
            postCategory(categoryFatherId.key, '');
        }
    }, []);

    useEffect(() => {
        getChildCategory(id);
    }, [id]);

    const getChildCategory = async (id: string) => {
        try {
            const response = await axios.get(`${category_child}${id}`, config);
            if (response.data.success) {
                const child =
                    response.data.body &&
                    response.data.body.map((item: any) => ({
                        key: item.id,
                        name: item.name,
                    }));
                setChildCategoryData(child);
            } else {
                setChildCategoryData([]);
            }
        } catch (error) {
            console.error("Error fetching child categories:", error);
        }
    };

    const postCategory = async (id: string, name: string) => {
        try {
            const response = await axios.post(`${masterAdd_category}${id}?name=${name}`, {}, config);
            if (response.data.success) {
                console.log(response.data.success);
                setChildCategoryData(response.data.body);
                getChildCategory(id);
            } else {
                setChildCategoryData([]);
            }
        } catch (error) {
            console.error("Error fetching child categories:", error);
        }
    };

    const saveSelectedServices = async (selectedServices: any[]) => {
        try {
            await AsyncStorage.setItem('selectedServices', JSON.stringify(selectedServices));
        } catch (error) {
            console.error('Failed to save selected services:', error);
        }
    };

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const handleAdd = () => {
        postCategory(id, name);
        closeModal();
        console.log(id);
    };

    const handleSelect = (item: any) => {
        setSelectedServices((prevSelected) => {
            if (prevSelected.find((service: any) => service.name === item.name)) {
                return prevSelected.filter((service: any) => service.name !== item.name);
            } else {
                return [...prevSelected, item];
            }
        });
    };

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = selectedServices.find((service: any) => service.name === item.name);
        return (
            <TouchableOpacity onPress={() => handleSelect(item)}>
                <ServicesCategory title={item.name} style={{ backgroundColor: isSelected ? 'gray' : 'transparent' }} />
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name="Специализация" />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={tw`w-full`}>
                        <FlatList
                            data={childCategoryData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={tw`content-end mb-3`}>
                        <Buttons title="Другое" backgroundColor="white" textColor="red" onPress={openModal} />
                        <View style={tw`mt-2 content-end`}>
                            <Buttons
                                title="Сохранить"
                                onPress={() => {
                                    router.push({
                                        pathname: '/process',
                                        params: { selectedServices: JSON.stringify(selectedServices) },
                                    });
                                    saveSelectedServices(selectedServices);
                                }}
                            />
                        </View>
                        <CenteredModal
                            isModal={modalVisible}
                            btnWhiteText='Закрыть'
                            btnRedText='Добавить '
                            isFullBtn={true}
                            toggleModal={closeModal}
                            onConfirm={handleAdd}
                        >
                            <View style={tw`p-4 text-center`}>
                                <Text style={tw`text-white text-xl mb-2 w-full`}>Добавьте свою специализацию</Text>
                                <TextInput
                                    style={tw`bg-white p-3 rounded-xl text-lg text-black`}
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Введите текст"
                                    value={name}
                                    onChangeText={setName}
                                    scrollEnabled={true}
                                />
                            </View>
                        </CenteredModal>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Expertise;
