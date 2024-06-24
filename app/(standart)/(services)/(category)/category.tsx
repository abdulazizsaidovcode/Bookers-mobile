import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import { router } from 'expo-router';
import axios from 'axios';
import { base_url } from '@/helpers/api';
import { config } from '@/helpers/token';
import servicesStore from '@/helpers/state_managment/services/servicesStore';

const Category = () => {
    const { setData, data, categoryFatherId } = servicesStore();
    const { childCategoryData, setChildCategoryData } = servicesStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [fatherId, setFatherId] = useState('');

    const getCategory = async () => {
        try {
            const response = await axios.get(`${base_url}category`, config);
            const listData =
                response.data.body &&
                response.data.body.map((item: any) => ({
                    key: item.id,
                    value: item.name,
                }));
            setData(listData);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const getChildCategory = async (fatherId) => {
        try {
            const response = await axios.get(`${base_url}category/byCategory/b417270e-10e8-4745-85b4-5e17ef936269`, config);
            const childData =
                response.data.body &&
                response.data.body.map((item:any) => ({
                    key: item.id,
                    value: item.name,
                }));
                console.log(response.data);
                

            setChildCategoryData(childData);
        } catch (error) {
            console.error("Error fetching child categories:", error);
        }
    };


    useEffect(() => {
        getCategory();
    }, []);

    const openModal = () => {
        setModalVisible(true);
        if (fatherId) {
            getChildCategory(fatherId);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setChildCategoryData([]);
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
                        <FlatList
                            data={data}
                            renderItem={({ item }) => (
                                <ServicesCategory title={item && item.value} items={item} />
                            )}
                        />
                    </View>
                    <View style={tw`content-end mb-5`}>
                        <View style={tw`mt-2 content-end`}>
                            <Buttons
                                title="Сохранить"
                                onPress={() => openModal()}
                            />
                        </View>
                        <CenteredModal
                            isModal={modalVisible}
                            btnWhiteText='Добавить'
                            btnRedText='Закрыть'
                            isFullBtn={true}
                            toggleModal={closeModal}
                            onConfirm={() => router.push('/expertise')}
                        >
                            <View style={tw`p-4`}>
                                <Text style={tw`text-white text-xl w-full text-2xl`}>Здоровье и красота волос</Text>
                                <Text style={tw`text-center text-white text-xl`}>В эту категорию входят услуги таких специализаций как:</Text>
                                {childCategoryData ?
                                    <FlatList
                                        data={childCategoryData}
                                        renderItem={({ item }) =>
                                            <Text key={item.id} style={{ color: 'white', fontSize: 20 }}>
                                                { }. {item.name}
                                            </Text>
                                        }
                                    />
                                    :
                                    <Text>salom</Text>}
                            </View>

                        </CenteredModal>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Category;
