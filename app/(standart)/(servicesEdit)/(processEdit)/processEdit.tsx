import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { masterAdd_service } from '@/helpers/api';
import { config } from '@/helpers/token';
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/app/locationInput';
import Buttons from '@/components/(buttons)/button';
import servicesStore from '@/helpers/state_managment/services/servicesStore';

type GenderOption = {
    title: string;
    id: number;
};

const ProcessEdit: React.FC = () => {
    const { prodseduraUslug } = servicesStore();

    const [service, setService] = useState<string>(prodseduraUslug.name || '');
    const [price, setPrice] = useState<string>(prodseduraUslug.price ? prodseduraUslug.price.toString() : '');
    const [time, setTime] = useState<string>(prodseduraUslug.duration || '');
    const [description, setDescription] = useState<string>(prodseduraUslug.description || '');
    const [validate, setValidate] = useState<boolean>(false);
    const [selectedGender, setSelectedGender] = useState<GenderOption | null>(prodseduraUslug.genderId ? { id: prodseduraUslug.genderId, title: '' } : null);
    const { childCategoryData, categoryFatherId, setChildCategoryData, setProdseduraUslug } = servicesStore();
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

    const editUslugi = async () => {
        try {
            const data = {
                serviceDto: {
                    categoryId: categoryFatherId.key,
                    name: service,
                    genderId: selectedGender ? [selectedGender.id] : [],
                    price: parseFloat(price),
                    serviceTime: parseFloat(time),
                    description: description,
                    attachmentId: null,
                    active: true
                },
                image: ""
            };
            console.log('Data to be sent to backend:', data); // Log data being sent to the backend
            const response = await axios.put(`${masterAdd_service}/${prodseduraUslug.id}`, data, config);
            console.log('Edit service response:', response);
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
    }, [service, price, time, description, selectedGender]);

    const handleGenderPress = (gender: GenderOption) => {
        setSelectedGender(selectedGender?.id === gender.id ? null : gender);
    };

    const renderChildCategories = ({ item }: { item: any }) => (
        <Text style={tw`flex flex-row flex-wrap text-black font-bold text-lg`}>
            {item.name}
        </Text>
    );

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name="Процедура услуг" deleteIcon />
            <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                <View style={[tw`w-full p-4 rounded-3xl mb-4`, { backgroundColor: '#B9B9C9' }]}>
                    <Text style={tw`text-gray-600`}>Ваша специализация</Text>
                    <FlatList
                        data={prodseduraUslug.childCategoryData}
                        renderItem={renderChildCategories}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {Gender.map((gender) => (
                    <ServicesCategory
                        key={gender.id}
                        title={gender.title}
                        isRadioButton
                        isChecked={selectedGender?.id === gender.id}
                        onPress={() => handleGenderPress(gender)}
                    />
                ))}
                <View style={[tw``, { backgroundColor: '#21212E' }]}>
                    {uslugi.map((usluga, index) => (
                        <LocationInput
                            key={index}
                            label={usluga.label}
                            value={usluga.value}
                            onChangeText={usluga.onPress}
                        />
                    ))}
                </View>
                <View style={[tw``, { backgroundColor: '#21212E' }]}>
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
                <View style={[tw`p-4`, { backgroundColor: '#21212E' }]}>
                    <Buttons
                        title="Сохранить"
                        disabled={!validate}
                        onPress={editUslugi}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProcessEdit;
