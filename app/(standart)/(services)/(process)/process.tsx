import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/components/(location)/locationInput';
import Buttons from '@/components/(buttons)/button';
import { router, useLocalSearchParams } from 'expo-router';
import servicesStore from '@/helpers/state_managment/services/servicesStore';

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
    const {childCategoryData,} = servicesStore();
  
    const Gender = [
        {
            title: "Мужская для взрослых"
        },
        {
            title: "Мужская для детей"
        }
    ];

    const uslugi = [
        {
            label: "Услуга",
            value: service,
            onPress: setService
        },
        {
            label: "Цена",
            value: price,
            onPress: setPrice
        },
        {
            label: "Длительность (без учёта перерыва после процедуры)",
            value: time,
            onPress: setTime
        }
    ];

    useEffect(() => {
        if (service.length === 0 || price.length === 0 || time.length === 0 || description.length === 0 || !selectedGender) {
            setValidate(false);
        } else {
            setValidate(true);
        }
    }, [service, price, time, description, selectedGender]);

    const checkFormValidity = () => {
        if (textAreaValue.trim() !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleGenderPress = (title: string) => {
        if (selectedGender === title) {
            setSelectedGender(null);
        } else {
            setSelectedGender(title);
        }
    };

    const nimadir = ({ item, index }: { item: any; index: number }) => {
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
                                renderItem={nimadir}
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
                                onChangeText={(text) => {
                                    setDescription(text);
                                }}
                                scrollEnabled={true}
                            />
                        </View>
                    </View>
                    <View style={[tw`mb-3 p-3`, { backgroundColor: '#21212E' }]}>
                        <Buttons title='Сохранить' isDisebled={validate} onPress={() => router.push('(standart)/(services)/(myServicesScreen)/MyServicesScreen')} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Process;
