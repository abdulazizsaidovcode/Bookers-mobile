import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, StatusBar, Text, TouchableOpacity, FlatList, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ClientCardDetail from '@/components/(cliendCard)/clientCardDetail';
import CenteredModal from '@/components/(modals)/modal-centered';
import Textarea from '@/components/select/textarea';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { FontAwesome6, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { postComment, ServicesClient } from '@/helpers/api-function/uslugi/uslugi';
import { useMapStore } from '@/helpers/state_managment/map/map';
import { useFocusEffect, useNavigation } from 'expo-router';
import ClientCardUslugi from '@/components/(cliendCard)/clientCardUslugi';

const MasterInformation = () => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const { selectedClient, setClientId, allCategory, selectedServiceId, services, setServices } = ClientStory();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [selectedId, setSelectedId] = useState<string | null>('services')
    const { setMapData } = useMapStore();
    const navigate = useNavigation<any>();
    const handlePress = (id: string) => {
        setSelectedId(id);
      };

    useEffect(() => {
        // Example response data
        const responseData = [
            {
                active: services,
                attachmentId: null,
                category: { /* category data */ },
                categoryId: "b06ef8f4-05ee-4b11-b2b8-cca43137a590",
                description: "Dbbddk",
                genderId: [1],
                genderNames: ["MALE"],
                id: "a44ce922-e542-4afd-8ec4-1c0b64aaaeec",
                message: null,
                name: "Kdkd",
                paymentPercent: 0,
                paymentPrice: 0,
                price: 467697,
                serviceStatus: "APPROVED",
                serviceTime: 90
            }
        ];
        setServices(responseData);
    }, []);

    console.log(services);


    const openModal = () => setModalVisible(true);
    const closeModal = () => {
        setModalVisible(false);
        setValue('');
    };
    const handleAdd = () => {
        if (value.trim() !== "") {
            postComment(commentData);
            closeModal();
            setValue("");
        }
    };

    const handleCategorySelect = (categoryId: string, index: number) => {
        setSelectedCategory(index);
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

    useFocusEffect(
        useCallback(() => {
            const masterId = selectedClient.id;
            const categoryId = selectedServiceId;
            ServicesClient(masterId, categoryId);
            return () => null;
        }, [])
    );

    console.log(services);


    const commentData = {
        clientId: null,
        masterId: selectedClient.id,
        adminId: null,
        message: value,
        messageStatus: 'CLIENT_MASTER_MESSAGE'
    };

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
            <NavigationMenu name={'Подробнее о Натали'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                <View style={tw`mb-5`}>
                <View style={tw`flex flex-row justify-between mb-5`}>
      <TouchableOpacity
        style={[
          tw`px-5 py-2 border border-gray-600 rounded-lg`,
          { backgroundColor: selectedId === 'services' ? '#FFFFFF' : 'transparent' }
        ]}
        onPress={() => handlePress('services')}
      >
        <Text style={[
          tw`text-xl`,
          { color: selectedId === 'services' ? '#9C0A35' : 'gray-600' }
        ]}>Услуги</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          tw`px-5 py-2 border border-gray-600 rounded-lg`,
          { backgroundColor: selectedId === 'gallery' ? '#FFFFFF' : 'transparent' }
        ]}
        onPress={() => handlePress('gallery')}
      >
        <Text style={[
          tw`text-xl font-bold`,
          { color: selectedId === 'gallery' ? '#9C0A35' : 'gray-600' }
        ]}>Галерея</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          tw`px-5 py-2 border border-gray-600 rounded-lg`,
          { backgroundColor: selectedId === 'reviews' ? '#FFFFFF' : 'transparent' }
        ]}
        onPress={() => handlePress('reviews')}
      >
        <Text style={[
          tw`text-xl`,
          { color: selectedId === 'reviews' ? '#9C0A35' : 'gray-600' }
        ]}>Отзывы</Text>
      </TouchableOpacity>
    </View>
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
                                        <SimpleLineIcons name="location-pin" size={24} color="white"
                                            onPress={() => {
                                                setMapData(selectedClient)
                                                navigate.navigate('(client)/(map)/(master-locations)/master-locations');
                                            }}
                                        />
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
                                    tw`rounded-lg border border-gray-600 px-4 py-3 mb-3`,
                                    selectedCategory === servicec.findIndex(item => item.id === service.id) ? tw`bg-white text-black` : tw`bg-transparent text-gray-600`
                                ]}>
                                    {services.name ? services.name : 'Services mavjud emas'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <FlatList
                    data={services}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={tw`mb-5`}>
                            <ClientCardDetail
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                serviceStatus={item.serviceStatus}
                                genderId={item.genderId}
                            />
                        </View>
                    )}
                />
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
