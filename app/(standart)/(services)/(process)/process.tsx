import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView, StatusBar, FlatList, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import { masterAdd_service, postFileId } from '@/helpers/api';
import ServicesCategory from '@/components/services/servicesCatgegory';
import LocationInput from '@/app/locationInput';
import Buttons from '@/components/(buttons)/button';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import { getConfig, getConfigImg } from '@/app/(tabs)/(master)/main';
   
import clientStore from '@/helpers/state_managment/client/clientStore';
import { getMasterTariff } from '@/constants/storage';
import BottomModal from '@/components/(modals)/modal-bottom';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import Textarea from '@/components/select/textarea';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const uploadImage = async (val: any, setImageId: (val: string | null) => void) => {
    if (!val) return;

    const formData = new FormData();
    let files: any = {
        uri: val.uri,
        name: val.fileName,
        type: val.mimeType,
    };
    formData.append("file", files);

    try {
        const config = await getConfigImg();
        const response = await axios.post(postFileId, formData, config ? config : {});
        if (response.data.success) {
             alert("Success",   );
            setImageId(response.data.body)
        } else {
             alert(response.data.message,   );
            setImageId(null)
        }
    } catch (err: any) {
         alert(err.response.data.message,   );
        setImageId(null)
    }
};

interface GenderOption {
    title: string;
    id: number;
}

const Process: React.FC = () => {
    const [service, setService] = useState<string>('');
    const { width } = Dimensions.get('window');
    const [image, setImage] = useState<string | null>(null);
    const [images, setImages] = useState<string | null>(null)
    const [modalVisible, setModalVisible] = useState(false);
    const { setTariff, tariff } = clientStore();
    const [price, setPrice] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [validate, setValidate] = useState<boolean>(false);
    const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null);
    const { childCategoryData, selectedCategory } = servicesStore();
    const [isAppoinmentModal, setIsAppoinmentModal] = useState<boolean>(false);
    const [appoinmentData, setAppoinmentData] = useState<{ hour: number | null, minute: number | null }>({ hour: null, minute: null });

    const toggleModal = () => setIsAppoinmentModal(!isAppoinmentModal);

    const Gender: GenderOption[] = [
        { title: 'Мужская для взрослых', id: 1 },
        { title: 'Женское для взрослых', id: 2 },
        { title: 'Мужская для детей', id: 3 },
        { title: 'Женское для детей', id: 4 }
    ];

    const pickImageFromCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Kamera ruxsati kerak!');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0], setImages)
        }
        setModalVisible(false);
    };

    const pickImageFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Media kutubxonasiga ruxsat kerak!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0], setImages)
        }
        setModalVisible(false);
    };

    const uslugi = [{ label: 'Услуга', value: service, onPress: setService }];

    useFocusEffect(
        useCallback(() => {
            getMasterTariff(setTariff);
        }, [])
    );

    const postService = async () => {
        try {
            const config = await getConfig();
            const data = {
                categoryId: selectedCategory,
                genderId: selectedGender ? [selectedGender.id] : [],
                name: service,
                price: parseFloat(price),
                description: description,
                attachmentId: tariff && tariff === 'STANDARD' ? images : null,
                active: true,
                serviceTime: convertTimeToMinutes(time)
            };
            const response = await axios.post(masterAdd_service, data, config ? config : {});
            console.log(response);
            if (response.data.success) router.push('(standart)/(services)/(myServicesScreen)/MyServicesScreen');
            else  alert(response.data.message,   );
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    const hours = Array.from({ length: 13 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const renderPickerItems = (
        items: number[],
        selectedItem: number | null,
        onSelectItem: (val: number) => void
    ) => (
        <ScrollView style={styles.picker}>
            {items.map((item) => (
                <TouchableOpacity
                    key={item}
                    onPress={() => onSelectItem(item)}
                    style={[
                        styles.pickerItem,
                        selectedItem === item && styles.selectedPickerItem,
                    ]}
                >
                    <Text
                        style={[
                            styles.pickerItemText,
                            selectedItem === item && styles.selectedPickerItemText,
                        ]}
                    >
                        {item} {items === hours ? "ч." : "мин."}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const selectTime = () => {
        const selectedTime = `${appoinmentData.hour ?? 0}:${appoinmentData.minute ?? 0}`;
        setTime(selectedTime);
        toggleModal();
    };

    const convertTimeToMinutes = (time: string) => {
        if (typeof time === 'string' && time.includes(':')) {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + (minutes || 0);
        }
        return 0;
    };

    useEffect(() => {
        if (service.length === 0 || price.length === 0 || time.length === 0 || description.length === 0 || image?.length === 0) {
            setValidate(true);
        } else {
            setValidate(false);
        }
    }, [service, price, time, description, image]);

    const handleGenderPress = (gender: GenderOption) => {
        setSelectedGender(selectedGender?.id === gender.id ? null : gender);
    };

    const renderChildCategories = ({ item, index }: { item: any; index: number }) => {
        const isLast = index === childCategoryData.length - 1;
        return (
            <Text style={tw`flex flex-row flex-wrap text-black font-bold text-lg`}>
                {item.name}
                {!isLast && ', '}
            </Text>
        );
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Процедура услуг`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        backgroundColor: '#21212E'
                    }}
                >
                    <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                        <View style={[tw`w-full p-4 rounded-3xl mb-4`, { backgroundColor: '#B9B9C9' }]}>
                            <Text style={tw`text-gray-600`}>Ваша специализация</Text>
                            <View style={tw`flex flex-row flex-wrap`}>
                                <FlatList data={childCategoryData} renderItem={renderChildCategories} keyExtractor={(item, index) => index.toString()} />
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
                                <LocationInput key={index} label={usluga.label} value={usluga.value} onChangeText={usluga.onPress} />
                            ))}
                        </View>
                        <View style={tw`mb-2 p-2`}>
                            <Text style={tw`text-gray-500 mb-3 text-lg`}>Цена</Text>
                            <TextInput
                                keyboardType='numeric'
                                onChangeText={text => setPrice(`${text}`)}
                                value={price}
                                style={[tw` p-3 mb-2 rounded-xl text-lg text-white`, { backgroundColor: '#4B4B64' }]}
                            />
                        </View>
                        <View style={tw`mb-2 p-2`}>
                            <Text style={tw`text-gray-500 mb-3 text-lg`}>Длительность (без учёта перерыва после процедуры)</Text>
                            <TouchableOpacity onPress={toggleModal}>
                                <TextInput
                                    value={time}
                                    style={[tw`bg-gray-500 p-3 mb-2 rounded-xl text-lg text-white`, { backgroundColor: '#4B4B64' }]}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[tw`p-3 mb-2`, { backgroundColor: '#21212E' }]}>
                            <Text style={tw`text-gray-500 text-xl mb-2`}>Описание</Text>
                            <TextInput
                                style={[tw`bg-gray-500 p-2 rounded-xl text-lg text-white`, { height: 100, backgroundColor: '#4B4B64' }]}
                                multiline
                                numberOfLines={2}
                                value={description}
                                onChangeText={text => setDescription(text)}
                                scrollEnabled={true}
                            />
                        </View>
                        {tariff && tariff === 'STANDARD' &&
                            <View style={tw`p-3`}>
                                <Text style={tw`text-gray-500 text-xl mb-2`}>Фото услуги</Text>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <View style={[tw` bg-gray-500 rounded-xl`, { backgroundColor: '#4B4B64', width: 338, height: (width - 32) * 0.65 }]}>
                                        {image ? (
                                            <Image
                                                source={{ uri: image }}
                                                style={[tw`rounded-xl`, { width: '100%', height: '100%' }]}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <View style={tw`flex flex-row justify-center items-center h-full`}>
                                                <AntDesign name="pluscircleo" size={24} color="black" />
                                                <Text style={tw`ml-2`}>Добавить фото</Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>

                                <BottomModal
                                    isBottomModal={modalVisible}
                                    toggleBottomModal={() => setModalVisible(false)}
                                    children={
                                        <View style={[tw`w-full mt-3`, { maxHeight: 400 }]}>
                                            <View>
                                                <TouchableOpacity onPress={pickImageFromCamera}>
                                                    <Text style={tw`text-xl text-white mb-3`}>Сделать фото</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={pickImageFromGallery}>
                                                    <Text style={tw`text-xl text-white mb-3`}>Выбрать из галереи</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                                    <Text style={tw`text-xl text-white mb-3`}>Отмена</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                />
                            </View>
                        }
                        <View style={tw`flex flex-row justify-center mb-10`}>
                            <Buttons
                                title='Создать'
                                onPress={postService}
                                isDisebled={!validate}
                            />
                        </View>
                    </View>
                </ScrollView>
                <BottomModal
                    isBottomModal={isAppoinmentModal}
                    toggleBottomModal={toggleModal}
                >
                    <View style={{ width: screenWidth / 1.3 }}>
                        <View style={styles.modalContent}>
                            <View style={styles.customPickerContainer}>
                                <View>
                                    {renderPickerItems(
                                        hours,
                                        appoinmentData.hour,
                                        (hour: number) => setAppoinmentData({ ...appoinmentData, hour })
                                    )}
                                </View>
                                <View>
                                    {renderPickerItems(
                                        minutes,
                                        appoinmentData.minute,
                                        (minute: number) => setAppoinmentData({ ...appoinmentData, minute })
                                    )}
                                </View>
                            </View>
                        </View>
                        <Buttons title="Выбрать" onPress={selectTime} />
                    </View>
                </BottomModal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    picker: {
        width: screenWidth / 2.3,
        maxHeight: screenHeight / 2.3,
    },
    pickerItem: {
        padding: 15,
    },
    pickerItemText: {
        fontSize: 18,
        color: 'gray'
    },
    selectedPickerItem: {
        backgroundColor: '#9C0A35',
        borderRadius: 10
    },
    selectedPickerItemText: {
        color: '#FFFFFF',
    },
    modalContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    customPickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Process;
