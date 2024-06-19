import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';

const Expertise = () => {
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
                    <NavigationMenu name="Специализация" />
                    <ServicesCategory title="Парикмахер" />
                    <ServicesCategory title="Стилист" />
                    <ServicesCategory title="Hаращиванию волосяных прядей" />
                    <ServicesCategory title="Барбер" />
                </View>
            </ScrollView>
            <View style={tw`content-end p-4`}>
                <Buttons title="Другое" backgroundColor="white" textColor="red" onPress={openModal} />
                <View style={tw`mt-2 content-end`}>
                    <Buttons title="Сохранить" isDisebled={false} onPress={handleSave} />
                </View>
                <CenteredModal
                    isModal={modalVisible}
                    btnWhiteText='Добавить'
                    btnRedText='Закрыть'
                    isFullBtn={true}
                    toggleModal={closeModal}
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
                            scrollEnabled = {true}
                        />
                    </View>
                </CenteredModal>
            </View>
        </SafeAreaView>
    );
};

export default Expertise;
