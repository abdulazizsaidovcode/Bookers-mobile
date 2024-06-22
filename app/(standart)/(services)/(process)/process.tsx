import React, { useState } from 'react';
import { Text, View, TextInput, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import * as ImagePicker from 'expo-image-picker';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/components/(location)/locationInput';
import Buttons from '@/components/(buttons)/button';
import { AntDesign } from '@expo/vector-icons';

const Process = () => {
    const [image, setImage] = useState<string | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            label: "Услуга"
        },
        {
            label: "Цена"
        },
        {
            label: "Длительность (без учёта перерыва после процедуры)"
        }
    ];

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

        if (!result.canceled) setImage(result.assets[0].uri)
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

        if (!result.canceled) setImage(result.assets[0].uri)
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
                            <Text style={tw`text-black font-bold text-lg`}>Парикмахер, Стилист, Специалист по причёскам</Text>
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
                                />
                            ))}
                        </View>
                        <View style={[tw`p-3`, { backgroundColor: '#21212E' }]}>
                            <Text style={tw`text-gray-500 mb-2`}>Описание</Text>
                            <TextInput
                                style={tw`bg-gray-500 p-2 rounded-xl text-lg text-white`}
                                multiline
                                numberOfLines={4}
                                value={textAreaValue}
                                onChangeText={(text) => {
                                    setTextAreaValue(text);
                                    checkFormValidity();
                                }}
                                scrollEnabled={true}
                            />
                        </View>
                        <View style={[tw`p-3`, { backgroundColor: '#21212E' }]}>
                            <Text style={tw`text-gray-500 mb-2`}>Фото услуги</Text>
                            <TouchableOpacity onPress={pickImage} style={[tw`bg-gray-500 p-14 rounded-xl items-center justify-center`]}>
                            {image ? (
                                    <View style = {tw`flex flex-row`}>
                                        <AntDesign name="pluscircleo" size={22} color="gray" />
                                        <Text style = {tw`text-gray-600`}>Добавить фото</Text>
                                    </View>
                                    
                                ) : (
                                    <Image source={{ uri: image }} style={[tw`w-full h-full rounded-xl`]} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[tw`mb-3 p-3`, { backgroundColor: '#21212E' }]}>
                        <Buttons title='Сохранить' isDisebled={!isFormValid} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Process;
