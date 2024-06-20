import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import { router } from 'expo-router';

const Category = () => {
    const services = [
        { title: "Здоровье и красота волос", },
        { title: "Ногтевой сервис" },
        { title: "Ресницы и брови" },
        { title: "Уход за телом" },
        { title: "Уход за лицом" }
    ];
    const data = ['Парикмахер', 'Парикмахер', 'Парикмахер', 'Парикмахер', 'Парикмахер'];

    const [modalVisible, setModalVisible] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState('');

    const openModal = () => setModalVisible(true);
    const closeModal = () => {
        setModalVisible(false);
        setTextAreaValue('');
    };

    const handleSave = () => {
        closeModal();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={tw`w-full p-3`}>
                    <NavigationMenu name="Категория услуг" />
                    {services.map((service, index) => (
                        <ServicesCategory key={index} title={service.title} />
                    ))}
                </View>
            </ScrollView>
            <View style={tw`content-end p-4`}>
                <View style={tw`mt-2 content-end`}>
                    <Buttons title="Сохранить" onPress={openModal} />
                </View>
                <CenteredModal
                    isModal={modalVisible}
                    btnWhiteText='Добавить'
                    btnRedText='Закрыть'
                    isFullBtn={true}
                    toggleModal={closeModal}
                    onConfirm={() => router.push('/expertise')}

                >
                    <View style={tw`p-4 text-center`}>
                        <Text style={tw`text-white text-xl w-full text-2xl`}>Здоровье и красота волос</Text>
                        <Text style={tw`text-center text-white  text-xl`}>В эту категорию входят услуги таких специализаций как:</Text>
                        {data.map((item, index) => (
                            <Text key={index} style={{ color: 'white', fontSize: 20 }}>
                                {index + 1}. {item}
                            </Text>
                        ))}
                    </View>
                </CenteredModal>
            </View>
        </SafeAreaView>
    );
};

export default Category;
