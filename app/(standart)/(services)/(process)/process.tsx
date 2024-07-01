import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/components/(location)/locationInput';
import Buttons from '@/components/(buttons)/button';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { masterAdd_service } from '@/helpers/api';
import { config } from '@/helpers/token';

const Process = () => {
    const { selectedServices } = useLocalSearchParams();
    const [service, setService] = useState('');
    const [price, setPrice] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState<string>('');
    const [validate, setValidate] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const { childCategoryData } = servicesStore();

    // Gender options
    const Gender = [
        { title: "Мужская для взрослых" },
        { title: "Мужская для детей" }
    ];

    // Form input fields
    const uslugi = [
        { label: "Услуга", value: service, onPress: setService },
        { label: "Цена", value: price, onPress: setPrice },
        { label: "Длительность (без учёта перерыва после процедуры)", value: time, onPress: setTime }
    ];

    // Function to post service data
    const postService = async () => {
        try {
            const data = {
                categoryId: "c8d966f7-dc2f-4a10-b4b1-2bd77db2da98",  // Replace with your categoryId
                name: service,
                genderId: selectedGender === "Мужская для взрослых" ? [1] : [2],  // Adjust based on your gender selection logic
                price: parseFloat(price),
                description: description,
                attachmentId: null,  // Assuming attachmentId is not yet determined
                active: true
            };

            const response = await axios.post(masterAdd_service, data, config);

            if (response.data.success) {
                // Handle success, e.g., reset form fields or navigate to another screen
                console.log('Service added successfully:', response.data);
                // Example navigation:
                // router.push('(standart)/(services)/(myServicesScreen)/MyServicesScreen');
            } else {
                // Handle failure or show error message
                console.error('Failed to add service:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding service:', error);
            // Handle error state or show user a message
        }
    };

    // Effect to validate form fields
    useEffect(() => {
        if (service.length === 0 || price.length === 0 || time.length === 0 || description.length === 0 || !selectedGender) {
            setValidate(false);
        } else {
            setValidate(true);
        }
    }, [service, price, time, description, selectedGender]);

    // Function to check validity of textarea
    const checkFormValidity = () => {
        setIsFormValid(textAreaValue.trim() !== '');
    };

    // Function to handle gender selection
    const handleGenderPress = (title: string) => {
        setSelectedGender(selectedGender === title ? null : title);
    };

    // Render function for child categories
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
                    <View style={[tw``, { backgroundColor: '#21212E' }]}>
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
                                isChecked={selectedGender === gender.title}
                                onPress={() => handleGenderPress(gender.title)}
                            />
                        ))}
                        <View style={[tw`mt-5 p-2 `, { backgroundColor: '#21212E' }]}>
                            {uslugi.map((uslugi, index) => (
                                <LocationInput
                                    key={index}
                                    label={uslugi.label}
                                    value={uslugi.value}
                                    onChangeText={uslugi.onPress}
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
                        <Buttons title='Сохранить' isDisebled={validate} onPress={postService} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Process;
