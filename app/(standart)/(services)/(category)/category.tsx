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

const Category = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [childCategories, setChildCategories] = useState([]);
    const [fatherId, setFatherId] = useState('');

    const getCategory = async () => {
        try {
            const response = await axios.get(`${base_url}category`, config);
            const listData =
                response.data.body &&
                response.data.body.map((item) => ({
                    key: item.id,
                    value: item.name,
                }));
            setData(listData);
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };

    const getChildCategory = async (id) => {
        try {
            const response = await axios.get(`${base_url}category/byCategory/${id}`, config);
            const childData =
                response.data.body &&
                response.data.body.map((item) => ({
                    key: item.id,
                    value: item.name,
                }));
            setChildCategories(childData);
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
        setChildCategories([]);
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
                                <ServicesCategory title={item.value} id={item.key} setId={setFatherId} />
                            )}
                            keyExtractor={(item) => item.key.toString()}
                        />
                    </View>
                    <View style={tw`content-end mb-5`}>
                        <View style={tw`mt-2 content-end`}>
                            <Buttons
                                title="Сохранить"
                                onPress={openModal}
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
                            <View style={tw`p-4 text-center`}>
                                <Text style={tw`text-white text-xl w-full text-2xl`}>Здоровье и красота волос</Text>
                                <Text style={tw`text-center text-white text-xl`}>В эту категорию входят услуги таких специализаций как:</Text>
                                {childCategories.map((service, index) => (
                                    <Text key={service.key} style={{ color: 'white', fontSize: 20 }}>
                                        {index + 1}. {service.value}
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
