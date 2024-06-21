import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import { router, useNavigation } from 'expo-router';

interface Service {
title: string;
}

const Expertise: React.FC = () => {
    const navigation = useNavigation();
const [modalVisible, setModalVisible] = useState<boolean>(false);
const [textAreaValue, setTextAreaValue] = useState<string>('');
const [services, setServices] = useState<Service[]>([
{ title: "Здоровье и красота волос" },
{ title: "Ногтевой сервис" },
{ title: "Ресницы и брови" },
{ title: "Уход за телом" },
{ title: "Уход за лицом" }
]);
const openModal = () => setModalVisible(true);
const closeModal = () => setModalVisible(false);

const handleSave = () => {
    if (textAreaValue.trim() && textAreaValue !== '' && textAreaValue !== "''") {
        setServices([...services, { title: textAreaValue }]);
        setTextAreaValue('');  
        closeModal();  
    }
};

const handleAdd = () => {
    handleSave();
};
return (
    <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
            <View style={tw`w-full p-3`}>
                <NavigationMenu name="Специализация" />
                {services.length !== 0 && services.map((service, index) => (
                    <ServicesCategory key={index} title={service.title} />
                ))}
            </View>
        </ScrollView>
        <View style={tw`content-end p-4`}>
            <Buttons title="Другое" backgroundColor="white" textColor="red" onPress={openModal} />
            <View style={tw`mt-2 content-end`}>
            <Buttons title="Сохранить" onPress={() =>  router.push('/process')} /> 
            </View>
            <CenteredModal
                isModal={modalVisible}
                btnWhiteText='Закрыть'
                btnRedText='Добавить '
                isFullBtn={true}
                toggleModal={closeModal}
                onConfirm={handleAdd}
               
            >
                <View style={tw`p-4 text-center`}>
                    <Text style={tw`text-white text-xl mb-2 w-full`}>Добавьте свою специализацию</Text>
                    <TextInput
                        style={tw`bg-white p-3 rounded-xl text-lg text-black`}
                        multiline
                        numberOfLines={4}
                        placeholder="Введите текст"
                        value={textAreaValue}
                        onChangeText={setTextAreaValue}
                        scrollEnabled={true}
                    />
                </View>
            </CenteredModal>
        </View>
    </SafeAreaView>
);
};

export default Expertise;