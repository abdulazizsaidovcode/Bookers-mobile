import React, { useState } from 'react';
import { ScrollView, View, StatusBar, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ClintCardUslugi from '@/components/(cliendCard)/clientCardUslugi';
import ClientCardDetail from '@/components/(cliendCard)/clientCardDetail';
import CenteredModal from '@/components/(modals)/modal-centered';
import Textarea from '@/components/select/textarea';

const MasterInformation = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [value, setValue] = useState('');

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

    const handleCategorySelect = (categoryId: string, index: any) => {
        setSelectedCategory(index);
        console.log("Selected category ID:", categoryId);
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

    const servicec = [
        { id: '1', name: 'nimadir' }
    ];

    const clintCardUslugiData = [
        {
            salon: 'Test',
            imageUrl: '',
            name: 'Xoji',
            zaps: 'sas',
            masterType: 'Hammasi',
            orders: 20,
            clients: 10,
            address: 'Мирабадский р-н, ул. Нурафшон, 32',
            feedbackCount: 4,
            btnTitle: 'Написать сообщение',
            spicalist:'Имеется скидка',
            services: ['укладка', 'укладка', 'укладка', 'укладка', 'укладка', 'укладка12']
        },
        // Add more data objects as needed
    ];

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name={`Услуги`} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                <View style={tw`mb-5`}>
                    {clintCardUslugiData.map((uslugi, index) => (
                        <View key={index} style={tw`mb-4`}>
                            <ClintCardUslugi
                                salon={uslugi.salon}
                                imageUrl={uslugi.imageUrl}
                                name={uslugi.name}
                                zaps={uslugi.zaps}
                                masterType={uslugi.masterType}
                                orders={uslugi.orders}
                                clients={uslugi.clients}
                                address={uslugi.address}
                                spicalist={uslugi.spicalist}
                                feedbackCount={uslugi.feedbackCount}
                                btnTitle={uslugi.btnTitle}
                                services={uslugi.services}
                                onPress={openModal}
                            />
                        </View>
                    ))}
                </View>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-2xl text-white font-bold`}>Услуги Натали</Text>
                </View>
                <ScrollView
                    horizontal
                    contentContainerStyle={{ gap: 16, marginBottom: 10 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {servicec.map((service, index) => (
                        <View key={service.id}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => handleCategorySelect(service.id, index)}
                            >
                                <Text style={[
                                    tw`rounded-lg border border-gray-600 px-4 py-3 text-gray-600 mb-3`,
                                    selectedCategory === index ? tw`bg-white text-black` : tw`bg-transparent text-gray-600`
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
                            btnRedText='Закрыть '
                            isFullBtn={false}
                            toggleModal={closeModal}
                            onConfirm={handleAdd}
                        // disabled={!validate}
                        >
                            <View style={tw`p-4 text-center`}>
                                <Text style={tw`text-white text-xl mb-2 w-full`}>Добавьте свою специализацию</Text>
                                <Textarea
                                    placeholder=''
                                    onChangeText={(text) => setValue(text)}
                                    value={value} />
                            </View>
                        </CenteredModal>
        </SafeAreaView>
    );
};

export default MasterInformation;
