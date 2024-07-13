import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import { router } from 'expo-router';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import axios from 'axios';
import { category_child, masterAdd_category } from '@/helpers/api';
import { useRoute } from '@react-navigation/native';
import Textarea from '@/components/select/textarea';
import { getConfig } from '@/app/(tabs)/main';

const Expertise: React.FC = () => {
    const route = useRoute();
    const { childCategoryData, categoryFatherId, setChildCategoryData, selectedCategory } = servicesStore();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const [validate, setValidate] = useState(false);
    const [selectedServices, setSelectedServices] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [noData, setNoData] = useState<boolean>(false);
    const { id } = route.params as { id: string };

    useEffect(() => {
        if (selectedCategory) {
            postCategory(selectedCategory, '');
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (value.trim() === "") {
            setValidate(false);
        } else {
            setValidate(true);
        }
    }, [value]);

    const getChildCategory = async (selectedCategory: string) => {
        try {
            const config = await getConfig();
            const response = await axios.get(`${category_child}${selectedCategory}`, config);
            if (response.data.success) {
                const child =
                    response.data.body &&
                    response.data.body.map((item: any) => ({
                        key: item.id,
                        name: item.name,
                    }));
                if (child.length > 0) {
                    setChildCategoryData(child);
                } else {
                    setChildCategoryData([]);
                }
            } else {
                setChildCategoryData([]);
            }
        } catch (error) {
            console.error("Error fetching child categories:", error);
        }
    };

    useEffect(() => {
        if (selectedCategory) {
            getChildCategory(selectedCategory);
        }
    }, [selectedCategory]);

    const postCategory = async (selectedCategoryId: string, name: string) => {
        try {
            const config = await getConfig();
            const response = await axios.post(`${masterAdd_category}/${selectedCategory}?name=${name}`, "", config);
            if (response.data.success) {
                getChildCategory(selectedCategory);
            } else {
                setChildCategoryData([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const openModal = () => setModalVisible(true);
    const closeModal = () => {
        setModalVisible(false);
        setValue('');
    };
    const handleAdd = () => {
        if (value.trim() !== "") {
            postCategory(selectedCategory, value);
            closeModal();
            setValue("");
        }
    };

    const handleCategorySelect = (item: any) => {
        setSelectedServices((prevSelected) => {
            const isSelected = prevSelected.find((service) => service.id === item.id);
            if (isSelected) {
                return prevSelected.filter((service) => service.id !== item.id);
            } else {
                return [...prevSelected, item];
            }
        });
    };

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = selectedServices.find((service: any) => service.id === item.id);
        return (
            <TouchableOpacity onPress={() => handleCategorySelect(item)}>
                <ServicesCategory
                    title={item.name}
                    // style={[backgroundColor: isSelected ? 'gray' : 'transparent']}
                />
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
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                    <View style={tw`w-full`}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#9C0A35" />
                        ) : noData ? (
                            <Text style={tw`text-gray-600 text-3xl text-center mt-4`}>Маълумот мавжуд эмас</Text>
                        ) : (
                            <FlatList
                                data={childCategoryData}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()} />
                        )}
                    </View>
                    <View style={tw`content-end mb-3`}>
                        <Buttons title="Другое" backgroundColor="white" textColor="red" onPress={openModal} />
                        <View style={tw`mt-2 content-end`}>
                            <Buttons
                                title="Сохранить"
                                onPress={() => router.push('../(process)/process')}
                                isDisebled={selectedServices.length === 0}
                            />
                        </View>
                        <CenteredModal
                            isModal={modalVisible}
                            btnWhiteText='Добавить'
                            btnRedText='Закрыть '
                            isFullBtn={false}
                            toggleModal={closeModal}
                            onConfirm={handleAdd}
                        // disabled={!validate}
                        >
                            <View style={tw`p-4 text-center`}>
                                <Text style={tw`text-white text-xl mb-2 w-full`}>Добавьте свою специализацию</Text>
                                <Textarea
                                    placeholder=''
                                    onChangeText={(text) => setValue(text)}
                                    value={value} />
                            </View>
                        </CenteredModal>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Expertise;
