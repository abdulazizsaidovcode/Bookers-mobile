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

type GenderOption = {
    title: string;
    id: number;
};

const Process: React.FC = () => {
    const { selectedServices } = useLocalSearchParams();
    const [service, setService] = useState<string>('');  
    const [price, setPrice] = useState<string>('');  
    const [time, setTime] = useState<string>('');  
    const [description, setDescription] = useState<string>('');  
    const [validate, setValidate] = useState<boolean>(false);  
    const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null);  
    const { childCategoryData, categoryFatherId } = servicesStore();  

    useEffect(() => {
        console.log("categoryFatherId:", categoryFatherId); // Log the categoryFatherId
    }, [categoryFatherId]);

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
            const data = {
                categoryId: categoryFatherId.key, // Send the key from categoryFatherId to the backend
                genderId: selectedGender ? [selectedGender.id] : [],  
                name: service, 
                price: parseFloat(price),
                description: description,
                attachmentId: null,  
                active: true
            };

            console.log(data.categoryId);
            
            // const response = await axios.post(masterAdd_service, data, config);
            // if (response.data.success) {
            //     router.push('(standart)/(services)/(myServicesScreen)/MyServicesScreen');
            // } else {
            //     console.error('Failed to add service:', response.data.message);
            // }
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    useEffect(() => {
        if (service.length === 0 || price.length === 0 || time.length === 0 || description.length === 0 || !selectedGender) {
            setValidate(true);
        } else {
            setValidate(false);
        }
    }, [service, price, time, description, selectedGender]);

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

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Процедура услуг`} deleteIcon />
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
                        <Buttons title='Сохранить' isDisebled={!validate} onPress={postService} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Process;
