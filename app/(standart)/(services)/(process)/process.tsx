import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import * as ImagePicker from 'expo-image-picker';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/components/(location)/locationInput';
import Buttons from '@/components/(buttons)/button';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import servicesStore from '@/helpers/state_managment/services/servicesStore';

const Process = () => {
    const { selectedServices } = useLocalSearchParams();
    const [image, setImage] = useState<boolean | null>(null);
    const [service, setService] = useState('');
    const [price, setPrice] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [validate, setValidate] = useState(false);
    const { setData, data, categoryFatherId, setChildCategoryData, childCategoryData, childCategoryOneData, setChildCategoryOneData } = servicesStore();
  

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
        if (service.length === 0 || price.length === 0 || time.length === 0 || description.length === 0) {
            setValidate(false);
        } else {
            setValidate(true);
        }
    }, [service, price, time, description]);

    const checkFormValidity = () => {
        if (textAreaValue.trim() !== '') {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Kamera ruxsati kerak!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) setImage(result.assets[0].uri);
        setImage(true);
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Kamera ruxsati kerak!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) setImage(result.assets[0].uri);
    };

    const nimadir = ({ item }: { item: setChildCategoryData}) => (
        <Text style={tw`text-black font-bold text-lg`}>{item.title}</Text>
    );

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
                            <FlatList
                                data={childCategoryData}
                                renderItem={nimadir}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        {Gender.map((gender, index) => (
                            <ServicesCategory
                                key={index}
                                title={gender.title}
                                isRadioButton />
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
                        <View style={[tw`p-3 `, { backgroundColor: '#21212E' }]}>
                            <Text style={tw`text-gray-500 mb-2`}>Фото услуги</Text>
                            <TouchableOpacity onPress={pickImage} style={[tw`bg-gray-500 p-10  rounded-xl items-center justify-center`]}>
                                {image ? (
                                    <View style={tw`flex flex-row`}>
                                        <AntDesign name="pluscircleo" size={22} color="gray" />
                                        <Text style={tw`text-gray-600`}>Добавить фото</Text>
                                    </View>
                                ) : (
                                    <Image source={{ uri: image }} style={[tw`w-full min-h-screen  rounded-xl`]} />
                                )}
                            </TouchableOpacity>
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
