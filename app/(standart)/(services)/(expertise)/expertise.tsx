import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import { router, useNavigation } from 'expo-router';
import axios from 'axios';
import { base_url } from '@/helpers/api';
import { config } from '@/helpers/token';
import servicesStore from '@/helpers/state_managment/services/servicesStore';

interface Service {
    title: string;
}

const Expertise: React.FC = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [textAreaValue, setTextAreaValue] = useState<string>('');
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const handleSave = () => {
        if (textAreaValue.trim() && textAreaValue !== '' && textAreaValue !== "''") {
            setTextAreaValue('');
            closeModal();
        }
    };
   

    const handleAdd = () => {
        handleSave();
    };
    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Специализация`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                    <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                        <View style={tw`w-full`}>
                            {childCategoryData.length !== 0 && childCategoryData.map((item, index) => (
                                <ServicesCategory key={index} title={childCategoryData.title} />
                            ))}
                        </View>
                        
                    </View>
                    <View style={tw`content-end mb-3 mt-5`}>
                            <Buttons title="Другое" backgroundColor="white" textColor="red" onPress={openModal} />
                            <View style={tw`mt-2 content-end`}>
                                <Buttons title="Сохранить" onPress={() => router.push('/process')} />
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
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Expertise;