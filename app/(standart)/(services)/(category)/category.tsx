import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StatusBar } from 'react-native';
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
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={`Категория услуг`} />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
                >
                <View style={tw`w-full`}>
                    {services.map((service, index) => (
                        <ServicesCategory key={index} title={service.title} />
                    ))}
                </View>
                <View style={tw`content-end mb-5 `}>
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
            </ScrollView>
            
             </View>  
        </SafeAreaView>
    );
};

export default Category;
