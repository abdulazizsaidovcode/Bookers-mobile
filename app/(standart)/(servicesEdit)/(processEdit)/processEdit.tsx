import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { masterAdd_service } from '@/helpers/api';
import { config } from '@/helpers/token';
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/app/locationInput';
import Buttons from '@/components/(buttons)/button';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import CenteredModal from '@/components/(modals)/modal-centered';
import { AntDesign } from '@expo/vector-icons';

type GenderOption = {
    title: string;
    id: number;
};

const defaultState = {
    service: '',
    price: '',
    time: '',
    description: '',
};

const Process: React.FC = () => {
    const { selectedServices, serviceId } = useLocalSearchParams();
    const [service, setService] = useState<string>(defaultState.service);
    const [price, setPrice] = useState<string>(defaultState.price);
    const [time, setTime] = useState<string>(defaultState.time);
    const [description, setDescription] = useState<string>(defaultState.description);
    const [validate, setValidate] = useState<boolean>(false);
    const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null);
    const { childCategoryData, categoryFatherId } = servicesStore();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const Gender: GenderOption[] = [
        { title: "Мужская для взрослых", id: 1 },
        { title: "Женское для взрослых", id: 2 },
        { title: "Мужская для детей", id: 3 },
        { title: "Женское для детей", id: 4 }
    ];

    const uslugi = [
        { label: "Услуга", value: service, onPress: setService },
        { label: "Цена", value: price, onPress: setPrice },
        { label: "Длительность (без учёта перерыва после процедуры)", value: time, onPress: setTime }
    ];

    const postService = async () => {
        try {
            console.log('Category Father ID:', categoryFatherId.key);
            const data = {
                id: serviceId, 
                categoryId: categoryFatherId.key, 
                genderId: selectedGender ? selectedGender.id : null, 
                name: service,
                price: parseFloat(price),
                description: description,
                attachmentId: null,
                active: true
            };
    
            console.log('Editing service with ID:', serviceId); // Logging service ID
    
            const response = await axios.put(`${masterAdd_service}/${serviceId}`, data, config); // Assuming you use PUT for editing
            if (response.data.success) {
                console.log('Successfully edited service:', response.data);
                router.push('(standart)/(services)/(myServicesScreen)/MyServicesScreen');
            } else {
                console.error('Failed to edit service:', response.data.message);
            }
        } catch (error) {
            console.error('Error editing service:', error);
        }
    };

    useEffect(() => {
        if (service.length === 0 || price.length === 0 || time.length === 0 || description.length === 0) {
            setValidate(true);
        } else {
            setValidate(false);
        }
    }, [service, price, time, description]);

    const handleGenderPress = (gender: GenderOption) => {
        setSelectedGender(selectedGender?.id === gender.id ? null : gender);
    };

    const renderChildCategories = ({ item, index }: { item: any; index: number }) => {
        const isLast = index === childCategoryData.length - 1;
        return (
            <Text style={tw`flex flex-row flex-wrap text-black font-bold text-lg`}>
                {item.name}
                {!isLast && ", "}
            </Text>
        );
    };

    const toggleModal = () => setModalVisible(!modalVisible);

    const handleAdd = () => {
        toggleModal();
    };

    const resetDefaults = () => {
        setService(defaultState.service);
        setPrice(defaultState.price);
        setTime(defaultState.time);
        setDescription(defaultState.description);
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Процедура услуг`} deleteIcon toggleModal={toggleModal} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                        <View style={[tw`w-full p-4 rounded-3xl mb-4`, { backgroundColor: '#B9B9C9' }]}>
                            <Text style={tw`text-gray-600`}>Ваша специализация</Text>
                            <View style={tw`flex flex-row flex-wrap`}>
                                <FlatList
                                    data={childCategoryData}
                                    renderItem={renderChildCategories}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                        {Gender.map((gender, index) => (
                            <ServicesCategory
                                key={index}
                                title={gender.title}
                                isRadioButton
                                isChecked={selectedGender?.id === gender.id}
                                onPress={() => handleGenderPress(gender)}
                            />
                        ))}
                        <View style={[tw`mt-5 p-2`, { backgroundColor: '#21212E' }]}>
                            {uslugi.map((usluga, index) => (
                                <LocationInput
                                    key={index}
                                    label={usluga.label}
                                    value={usluga.value}
                                    onChangeText={usluga.onPress}
                                />
                            ))}
                        </View>
                        <View style={[tw`p-3`, { backgroundColor: '#21212E' }]}>
                            <Text style={tw`text-gray-500 mb-2`}>Описание</Text>
                            <TextInput
                                style={tw`bg-gray-500 p-2 rounded-xl text-lg text-white`}
                                multiline
                                numberOfLines={4}
                                value={description}
                                onChangeText={(text) => setDescription(text)}
                                scrollEnabled={true}
                            />
                        </View>
                    </View>
                    <View style={[tw`mb-3 p-3`, { backgroundColor: '#21212E' }]}>
                        <Buttons 
                            title='Сохранить' 
                            isDisebled={!validate} 
                            onPress={() => {
                                postService();
                                resetDefaults(); // Reset defaults after saving
                            }} 
                        />
                    </View>
                    <CenteredModal
                        isModal={modalVisible}
                        btnWhiteText='Закрыть'
                        btnRedText=' Да '
                        isFullBtn={true}
                        toggleModal={toggleModal}
                        onConfirm={handleAdd}
                    >
                        <>
                            <AntDesign name="delete" size={120} color="#9C0A35" style={tw`mb-3`} />
                            <Text style={tw`text-white mb-4`}>Вы хотите удалить процедуру?</Text>
                        </>
                    </CenteredModal>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Process;
