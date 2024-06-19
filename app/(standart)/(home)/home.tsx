import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Image, Alert, ActionSheetIOS, Platform, StyleSheet } from 'react-native';
import { Text, View } from "@/components/Themed";
import tw from "tailwind-react-native-classnames";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; // MaterialIcons import qilish


const Home = () => {
    const defaultImageUri = 'https://example.com/default-image.jpg'; // Default rasm URL o'zgartiring

    const [image, setImage] = useState<string | null>(null);

    // Rasmni kameradan yoki galeriyadan yuklash funksiyasi
    const pickImage = async () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Kamera', 'Galeriya', 'Bekor qilish'],
                    cancelButtonIndex: 2,
                },
                async buttonIndex => {
                    let result: ImagePicker.ImagePickerResult | undefined;

                    if (buttonIndex === 0) {
                        const { status } = await ImagePicker.requestCameraPermissionsAsync();
                        if (status !== 'granted') {
                            Alert.alert('Kamera ruxsati kerak!', 'Iltimos, kamera ruhsatini berib, qaytadan urinib ko\'ring.');
                            return;
                        }
                        result = await ImagePicker.launchCameraAsync({
                            allowsEditing: true,
                            aspect: [4, 4],
                            quality: 1,
                        });
                    } else if (buttonIndex === 1) {
                        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if (status !== 'granted') {
                            Alert.alert('Kamera rulxati kerak!', 'Iltimos, kamera rulxatini berib, qaytadan urinib ko\'ring.');
                            return;
                        }
                        result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 4],
                            quality: 1,
                        });
                    }

                    if (!result.canceled) setImage(result.assets[0].uri)
                }
            );
        } else {
            // Android uchun oddiy rasm yuklash
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Kamera rulxati kerak!', 'Iltimos, kamera rulxatini berib, qaytadan urinib ko\'ring.');
                return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });

            if (!result.canceled) setImage(result.assets[0].uri)
        }
    };

    // Rasmni tahrirlash
    const editImage = async () => {
        if (!image) {
            return;
        }
        // Rasmni tahrirlash uchun logika
        // Masalan, rasmni serverga yuklash, tahrirlash interfeysi ochish, yoki boshqa amallar
        Alert.alert('Rasmni tahrirlash', 'Bu funksiya hali amalga oshirilmagan.');
    };

    // Rasmni ko'rsatish
    const showImage = () => {
        return (
            <TouchableOpacity onPress={editImage}>
                <Image source={{ uri: image }} style={{ width: 230, height: 230, marginTop: 20, borderRadius: 150 }} />
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={tw`flex p-4`}>
            <View style={tw`p-4 items-center`}>
                <Text style={tw`text-2xl font-bold text-white mb-2 mt-5 text-center p-4`}>Добро пожаловать!</Text>

                {/* Rasm yuklash tugmasi */}
                <TouchableOpacity onPress={pickImage} >
                    <MaterialIcons name="add-a-photo" size={24} color="white" />
                </TouchableOpacity>

                {/* Rasmni ko'rsatish yoki default rasm */}
                {image ? showImage() : (
                    <Image source={{ uri: defaultImageUri }} style={{ width: 200, height: 200, marginTop: 20, borderRadius: 100 }} />
                )}
                <Text style={tw`text-2xl font-bold text-white mt-5 mb-4`}>Гузаль Шерматова</Text>
                <View style={tw`bg-white rounded-2xl w-full p-6 `}>
                    <Text style={tw`text-center text-gray-500`}>А теперь мы поможем Вам настроить  приложение что бы клиенты могли начать бронировать Ваши услуги.</Text>
                </View>
            </View>
            
        </ScrollView>
    );
};

export default Home;


