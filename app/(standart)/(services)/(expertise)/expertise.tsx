import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import axios from 'axios';
import { category_child, masterAdd_category } from '@/helpers/api';
import { useRoute } from '@react-navigation/native';
import { getConfig } from '@/app/(tabs)/(master)/main';
import Explanations from '@/components/(explanations)/explanations';
import Textarea from '@/components/select/textarea';
import Feather from '@expo/vector-icons/Feather';

const Expertise: React.FC = () => {
    const route = useRoute();
    const { childCategoryData, setChildCategoryData, selectedCategory, setCompleted, selectedCategoryId } = servicesStore();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const [validate, setValidate] = useState(false);
    const [selectedServices, setSelectedServices] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [noData, setNoData] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');
    const navigation = useNavigation<any>();
    // const { id } = route.params as { id: string };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            if (selectedCategory) {
                getChildCategory(selectedCategory).finally(() => setLoading(false));
            }
            return () => { };
        }, [selectedCategory])
    );

    useEffect(() => {
        setValidate(value.trim() !== '');
    }, [value]);

    const getChildCategory = async (selectedCategory: string | null) => {
        try {
            const config = await getConfig();
            const response = await axios.get(`${category_child}${selectedCategory}`, config || {});
            if (response.data.success) {
                const child = response.data.body.map((item: any) => ({
                    key: item.id,
                    name: item.name,
                }));
                setChildCategoryData(child.length > 0 ? child : []);
                setNoData(child.length === 0);
            } else {
                setChildCategoryData([]);
                setNoData(true);
            }
        } catch (error) {
            console.error("Error fetching child categories:", error);
            setChildCategoryData([]);
            setNoData(true);
        }
    };

    const postCategory = async (selectedCategory: string | null, value: string) => {
        try {
            const config = await getConfig();
            const response = await axios.post(`${masterAdd_category}${selectedCategory}?name=${value}`, {}, config || {});
            console.log(response.data);
            if (response.data.success) {
                getChildCategory(selectedCategory);
                setStatus(response.data.status);
                if (response.data.status === 'CREATED' || response.data.status === 'NEW' || response.data.status === 'APPROVED') {
                    setModalStatus(true);
                }
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const openModal = () => setModalVisible(true);
    const openModalStatus = () => setModalStatus(true);

    const closeModal = () => {
        setModalVisible(false);
        setModalStatus(false)
        setValue('');
    };
    const closeModalStatus = () => {
        setModalStatus(false)  
    };
   

    const handleAdd = () => {
        if (value.trim()) {
            postCategory(selectedCategory, value);
            closeModal();
            openModalStatus()
            setValue('');
        }
    };

    const handleCategorySelect = (item: any) => {
        setSelectedServices((prevSelected) => {
            const isSelected = prevSelected.find((service) => service.id === item.id);
            const updatedSelectedServices = isSelected
                ? prevSelected.filter((service) => service.id !== item.id)
                : [...prevSelected, item];
            return updatedSelectedServices;
        });
    };

    const renderItem = ({ item }: { item: any }) => {
        const isSelected = selectedServices.find((service: any) => service.id === item.id);
        return (
            <TouchableOpacity onPress={() => handleCategorySelect(item)}>
                <ServicesCategory
                    title={item.name}
                    isChecked={isSelected}
                />
            </TouchableOpacity>
        );
    };

    const handleSave = () => {
        loading
        navigation.navigate('(standart)/(services)/(process)/process');
        setCompleted([true, true, true, true]);
    };

    console.log(selectedServices);

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor='#21212E' barStyle='light-content' />
            <NavigationMenu name="Специализация" />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                    <View style={tw`w-full`}>
                        <View style={[tw`p-4 mb-2`, { backgroundColor: '#21212E' }]}>
                            <Explanations
                                text='Выберите свою специализацию? Вы можете выбрать несколько вариантов или добавить свою'
                            />
                        </View>
                        {loading ? (
                            <View style={tw`mt-5`}>
                                <ActivityIndicator size="large" color="#9C0A35" />
                            </View>
                        ) : noData ? (
                            <Text style={tw`text-gray-600 text-3xl text-center mt-4`}>Маълумот мавжуд эмас</Text>
                        ) : (
                            <FlatList
                                data={childCategoryData}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.key.toString()}
                            />
                        )}
                    </View>
                    <View style={tw`content-end mb-3`}>
                        <Buttons title="Другое" backgroundColor="white" textColor="red" onPress={openModal} />
                        <View style={tw`mt-2 content-end`}>
                            <Buttons
                                title="Сохранить"
                                onPress={handleSave}
                                // isDisebled={selectedServices.length == 0}
                            />
                        </View>
                        <CenteredModal
                            isModal={modalVisible}
                            btnWhiteText='Добавить'
                            btnRedText='Закрыть'
                            isFullBtn={false}
                            toggleModal={closeModal}
                            onConfirm={handleAdd}
                        >
                            <View style={tw`p-4 text-center`}>
                                <Text style={tw`text-white text-lg mb-2 w-full`}>Добавьте свою специализацию</Text>
                                <View>
                                    <Textarea
                                        placeholder=''
                                        onChangeText={(text) => setValue(text)}
                                        value={value}
                                    />
                                </View>
                            </View>
                        </CenteredModal>
                        <CenteredModal
                            isModal={modalStatus}
                            btnWhiteText=''
                            btnRedText='Продолжить'
                            isFullBtn={true}
                            oneBtn
                            toggleModal={closeModalStatus}
                            onConfirm={closeModalStatus}
                        >
                            <View style={tw`p-4 text-center flex justify-center items-center`}>
                                <Feather name="check-circle" size={68} color="#9C0A35" />
                                <Text style={tw`text-white text-md mb-2 mt-4`}>Сообщение отправлено!</Text>
                                <Text style={tw`text-white mb-4`}>Добавленная Вами специализация будет доступна в приложении после одобрения администратором.</Text>
                                <Text style={tw`text-white text-lg mb-3`}>Ожидайте Уведомления</Text>
                            </View>
                        </CenteredModal>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Expertise;
