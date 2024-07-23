import React, { useState, useEffect } from 'react';
import { ScrollView, View, StatusBar, Text, TouchableOpacity, FlatList, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ClintCardUslugi from '@/components/(cliendCard)/clientCardUslugi';
import ClientCardDetail from '@/components/(cliendCard)/clientCardDetail';
import CenteredModal from '@/components/(modals)/modal-centered';
import Textarea from '@/components/select/textarea';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import axios from 'axios';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import { FontAwesome6, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import ClientCardUslugi from '@/components/(cliendCard)/clientCardUslugi';

const MasterInformation = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const { selectedClient, setClientId } = ClientStory();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    useEffect(() => {
        // Fetch the phone number from the backend
        const fetchPhoneNumber = async () => {
            try {
                const response = await axios.get('YOUR_BACKEND_API_ENDPOINT'); // Replace with your actual API endpoint
                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                console.error('Error fetching phone number:', error);
            }
        };
        fetchPhoneNumber();
    }, []);

    const openModal = () => setModalVisible(true);
    const closeModal = () => {
        setModalVisible(false);
        setValue('');
    };
    const handleAdd = () => {
        if (value.trim() !== "") {
            closeModal();
            setValue("");
        }
    };

    const handleCategorySelect = (categoryId: string, index: number) => {
        setSelectedCategory(index);
        console.log("Selected category ID:", categoryId);
    };

    const makePhoneCall = (number: string) => {
        const url = `tel:${number}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Your device does not support this feature');
                }
            })
            .catch((err) => console.error('Error making phone call:', err));
    };

    const clientDetails = [
        {
            type: 'Женская для взрослых',
            price: 350000,
            img: '',
            description: 'Стрижка и укладка – это одно из важнейших вещей при создании красивого образа. Если укладка неаккуратная она сразу бросается в глаза и все остальные старания сводятся к нулю.',
            subDescription: 'Парикмахеры салона Beauty Wave в Ташкенте могут выполнить стрижку любой сложности. Также они смогут помочь вам подобрать безупречную укладку, которая подчеркнет все ваши достоинства.'
        },
        {
            type: 'Женская для взрослых',
            price: 350000,
            services: ['укладка', 'укладка', 'укладка', 'укладка', 'укладка', 'укладка12'],
            img: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig/IMG%20Worlds%20of%20Adventure%20Admission%20Ticket%20in%20Dubai%20-%20Klook.jpg',
            description: 'Стрижка и укладка – это одно из важнейших вещей при создании красивого образа. Если укладка неаккуратная она сразу бросается в глаза и все остальные старания сводятся к нулю.',
            subDescription: 'Парикмахеры салона Beauty Wave в Ташкенте могут выполнить стрижку любой сложности. Также они смогут помочь вам подобрать безупречную укладку, которая подчеркнет все ваши достоинства.'
        }
    ];

    const clintCardUslugiData = [
        {
            salon: selectedClient?.salon,
            imageUrl: '',
            name: selectedClient?.name,
            zaps: selectedClient?.zaps,
            masterType: selectedClient?.masterType,
            orders: selectedClient?.orders,
            clients: selectedClient?.clients,
            address: selectedClient?.address,
            feedbackCount: selectedClient?.feedbackCount,
            spicalist: selectedClient?.masterSpecialization,
            btntext: 'Написать сообщение'
        },
    ];

    const servicec = [
        { id: '1', name: 'nimadir' }
    ];

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name={`Услуги`} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                <View style={tw`mb-5`}>
                    <FlatList
                        data={clintCardUslugiData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={tw`mb-4`}>
                                <ClientCardUslugi
                                    salon={item.salon}
                                    imageUrl={item.imageUrl}
                                    name={item.name}
                                    zaps={item.zaps}
                                    masterType={item.masterType}
                                    orders={item.orders}
                                    clients={item.clients}
                                    address={item.address}
                                    spicalist={item.spicalist}
                                    feedbackCount={item.feedbackCount}
                                    btntext={item.btntext}
                                    services={item.services}
                                    onPress={openModal}
                                    onPhonePress={() => makePhoneCall(phoneNumber)}
                                    locationIcon={
                                        <SimpleLineIcons name="location-pin" size={24} color="white" />
                                    }
                                    anotherIcon={
                                        <FontAwesome6 name="phone" size={24} color="white" />
                                    }
                                    phoneIcon={
                                        <Octicons name="bookmark" size={26} color="white" />
                                    }
                                />
                            </View>
                        )}
                    />
                </View>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-2xl text-white font-bold`}>Услуги {selectedClient?.name}</Text>
                </View>

                <ScrollView
                    horizontal
                    contentContainerStyle={{ gap: 16, marginBottom: 10 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {servicec.map((service) => (
                        <View key={service.id}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => handleCategorySelect(service.id, servicec.findIndex(item => item.id === service.id))}
                            >
                                <Text style={[
                                    tw`rounded-lg border border-gray-600 px-4 py-3 text-gray-600 mb-3`,
                                    selectedCategory === servicec.findIndex(item => item.id === service.id) ? tw`bg-white text-black` : tw`bg-transparent text-gray-600`
                                ]}>
                                    {service.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <View style={tw`mb-3`}>
                    {clientDetails.map((detail, index) => (
                        <View key={index} style={tw`mb-5`}>
                            <ClientCardDetail
                                type={detail.type}
                                price={detail.price}
                                img={detail.img}
                                description={detail.description}
                                subDescription={detail.subDescription}
                                services={detail.services}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>

            <CenteredModal
                isModal={modalVisible}
                btnWhiteText='Отправить'
                btnRedText='Закрыть'
                isFullBtn={false}
                toggleModal={closeModal}
                onConfirm={handleAdd}
            >
                <View style={tw`p-4 items-center justify-center`}>
                    <Text style={tw`text-white text-xl mb-5 text-center w-full`}>Написать сообщение</Text>
                    <Textarea
                        placeholder='Введите специализацию'
                        onChangeText={(text) => setValue(text)}
                        value={value}
                    />
                </View>
            </CenteredModal>
        </SafeAreaView>
    );
};

export default MasterInformation;
