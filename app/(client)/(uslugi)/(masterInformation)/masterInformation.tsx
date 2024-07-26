import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, StatusBar, Text, TouchableOpacity, FlatList, Linking, Alert, Image, Dimensions, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ClientCardDetail from '@/components/(cliendCard)/clientCardDetail';
import CenteredModal from '@/components/(modals)/modal-centered';
import Textarea from '@/components/select/textarea';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { AntDesign, FontAwesome, FontAwesome6, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { getMasterGallery, getMasterOtzif, postComment, ServicesClient } from '@/helpers/api-function/uslugi/uslugi';
import { useMapStore } from '@/helpers/state_managment/map/map';
import { useFocusEffect, useNavigation } from 'expo-router';
import ClientCardUslugi from '@/components/(cliendCard)/clientCardUslugi';
import CustomButton from '@/components/(buttons)/custom';
import { getClientPastcomingInterface, getOrderClientPastcomingInterface, getOrderClientUpcomingInterface } from '@/type/client/editClient';
import CustomButton1 from './CustomButton';
import { getFile } from '@/helpers/api';
import ReviewCard from '@/components/(cliendCard)/riewCard';
import BottomModal from '@/components/(modals)/modal-bottom';


const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;


const MasterInformation = () => {

    const generateStars = (count: number) => {
        let stars = '';
        for (let i = 1; i < count; i++) {
            stars += '★';
        }
        for (let i = count; i < 5; i++) {
            stars += '☆';
        }
        return stars;
    };

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const { selectedClient, clientData, allCategory, selectedServiceId, services, setServices, activeTab, setActiveTab, masterGallery, feedbackForMaster } = ClientStory();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [selectedId, setSelectedId] = useState<string | null>('services')
    const { setMapData } = useMapStore();
    const navigate = useNavigation<any>();
    const handlePress = (id: string) => {
        setSelectedId(id);
    };
    const [bottomModal, setBottomModal] = useState(false);
    const [upcoming, setUpcoming] = useState<getOrderClientUpcomingInterface[]>([]);
    const [pastComing, setPastComing] = useState<getOrderClientPastcomingInterface[]>([]);
    const [pastStart, setPastStart] = useState<getClientPastcomingInterface[]>([]);
    const { width } = Dimensions.get('window');
    const itemSize = width / 3;
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const toggleBottomModal = () => setBottomModal(!bottomModal);


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
    const closeGaleryModal = () => {
        setSelectedImage(null);
    };

    const handleImagePress = (attachment: any) => {
        setSelectedImage(attachment);
    };



    const navigation = useNavigation<any>();

    const renderRows = (attachments: any[]) => {

        let filteredAttachments = attachments

        if (filteredAttachments.length === 0) {
            // If there are no main attachments, use the first 4 attachments instead
            filteredAttachments = attachments.slice(0, 4);
        }

        const rows: any[] = [];
        for (let i = 0; i < filteredAttachments.length; i += 4) {
            const rowItems = filteredAttachments
                .slice(i, i + 3)
                .map((attachment: any, index: number) => (
                    <TouchableOpacity key={index} onPress={() => handleImagePress(attachment)}>
                        <Image
                            key={index}
                            source={{ uri: getFile + attachment.attachmentId }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                ));
            rows.push(
                <View style={styles.imageRow} key={i}>
                    {rowItems}
                </View>
            );
        }
        return rows;
    };

    // hjvgcfhjkopl[kojihugyfyguhijokpjigyuf]

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

    const reviews = [
        {
            id: '1',
            name: 'Натали',
            reviewText: 'Отличное Впечатление, легко бронировать. Оплачивать процедуры так удобно — не нужны ни наличные, ни карты!',
        },
        {
            id: '2',
            name: 'Натали',
            reviewText: 'Отличное Впечатление, легко бронировать. Оплачивать процедуры так удобно — не нужны ни наличные, ни карты!',
        },
        {
            id: '3',
            name: 'Натали',
            reviewText: 'Отличное Впечатление, легко бронировать. Оплачивать процедуры так удобно — не нужны ни наличные, ни карты!',
        },
        {
            id: '4',
            name: 'Натали',
            reviewText: 'Отличное Впечатление, легко бронировать. Оплачивать процедуры так удобно — не нужны ни наличные, ни карты!',
        },
    ];


    useFocusEffect(
        useCallback(() => {
            const masterId = selectedClient.id;
            const categoryId = selectedServiceId;
            ServicesClient(masterId, categoryId);
            return () => null;
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            const id = selectedClient.id;
            getMasterOtzif(id);
            return () => null;
        }, [])
    );

    const handleClick = () => {
        const id = selectedClient.id;
        if (id) {
            getMasterOtzif(id);
        }
    };

    useEffect(() => {
        if (selectedClient?.id) {
            getMasterGallery(selectedClient.id);
        }
    }, [selectedClient])
    const commentData = {
        clientId: null,
        masterId: selectedClient.id,
        adminId: null,
        message: value,
        messageStatus: 'CLIENT_MASTER_MESSAGE'
    };

    console.log("feedback", feedbackForMaster);

    const clintCardUslugiData = [
        {
            salon: selectedClient?.salon,
            imageUrl: getFile + selectedClient?.attachmentId,
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

    const renderItem = ({ item }) => (
        <View style={tw`mb-4`}>
          <Text style={tw`text-white`}>{item.clientName}</Text>
          <Text style={tw`text-gray-400`}>{item.text}</Text>
        </View>
      );


    const servicec = [
        { id: '1', name: 'nimadir' }
    ];



    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name={'Подробнее о Натали'} />
            <View style={tw` flex flex-row mb-5 p-3`}>
                <CustomButton1
                    borderColor='#9E9E9E'
                    title="Услуги"
                    onPress={() => setActiveTab('upcoming')}
                    active={activeTab === 'upcoming'}
                    textColor='#9E9E9E'
                />
                <CustomButton1
                    title="Галерея"
                    borderColor='#9E9E9E'
                    onPress={() => {
                        setActiveTab('past');

                    }}
                    active={activeTab === 'past'}
                    textColor='#9E9E9E'
                />
                <CustomButton1
                    title="Отзывы"
                    borderColor='#9E9E9E'
                    onPress={() => {
                        setActiveTab('pastStart')
                        handleClick()
                    }}
                    active={activeTab === 'pastStart'}
                    textColor='#9E9E9E'
                />
            </View>
            {activeTab === 'upcoming' && (
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
            )}
            {activeTab === 'past' && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                    {masterGallery && masterGallery.length !== 0 ? (
                        masterGallery.map(
                            (item: any) =>
                                item.resGalleryAttachments &&
                                item.resGalleryAttachments.length > 0 && (
                                    <TouchableOpacity onPress={() => {
                                        //   setmasterGalleryDetail(item)
                                        //   navigation.navigate("(profile)/(WebPage)/components/galleryDetail")
                                    }} activeOpacity={0.7}>
                                        <View style={styles.galleryContainer} key={item.id}>
                                            <Text style={styles.caption}>{item.albumName}</Text>
                                            {renderRows(item.resGalleryAttachments)}
                                        </View>
                                    </TouchableOpacity>
                                )
                        )
                    ) : (
                        <Text style={styles.noDataText}>No gallery data available</Text>
                    )}
                </ScrollView>
            )}
            {activeTab === 'pastStart' && (
                 <ScrollView
                 showsVerticalScrollIndicator={false}
                 contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
               >
                 <View style={tw`items-center`}>
                   <View style={tw`flex-row justify-center items-center mb-2`}>
                     <Text style={tw`text-xl font-bold text-center text-white`}>Общая оценка</Text>
                     <View style={tw`ml-2 rounded-full bg-white p-1`}>
                       <AntDesign name="star" size={20} color="red" />
                     </View>
                   </View>
                   <FlatList
                     data={reviews.feedback.object}
                     renderItem={renderItem}
                     keyExtractor={(item) => item.id.toString()}
                   />
                   <Text style={tw`text-gray-400 mb-5`}>На основе {reviews.reviewCount} отзывов</Text>
                 </View>
           
                 {/* Individual Ratings */}
                 <View style={tw`mb-5`}>
                   {[
                     { label: 'Отлично', value: reviews.great },
                     { label: 'Хорошо', value: reviews.fine },
                     { label: 'Средне', value: reviews.average },
                     { label: 'Плохо', value: reviews.badly },
                   ].map((rating, index) => (
                     <View key={index} style={tw`flex-row items-center rounded-xl mb-2`}>
                       <Text style={tw`text-white w-20`}>{rating.label}</Text>
                       <View style={[tw`h-2 flex-1 mx-2 rounded-xl`, { backgroundColor: '#F6D0DB' }]}>
                         <View style={[tw`h-2 rounded-xl`, { width: `${rating.value}%`, backgroundColor: '#9C0A35' }]}></View>
                       </View>
                       <Text style={tw`text-white`}>{rating.value}%</Text>
                     </View>
                   ))}
                 </View>
               </ScrollView>
            )}

            {/* Modal to display full screen image */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={selectedImage !== null}
                onRequestClose={closeGaleryModal}
            >
                <TouchableWithoutFeedback onPress={closeGaleryModal}>
                    <View style={styles.modalContainer}>
                        <Image
                            source={{ uri: selectedImage ? getFile + selectedImage.attachmentId : '' }}
                            style={styles.modalImage}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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

            <BottomModal
                isBottomModal={bottomModal}
                toggleBottomModal={toggleBottomModal}
                children={
                    <View style={tw`w-full`}>
                        <View style={tw`mb-3`}>
                            <Text></Text>
                            <View style={tw`mb-3`}>
                                {['Отлично'].map((rating, index) => (
                                    <View key={index} style={tw`flex-row items-center rounded-xl mb-2`}>
                                        <Text style={tw`text-white w-20`}>{rating}</Text>
                                        <View style={[tw`h-2 flex-1 mx-2 rounded-xl`, { backgroundColor: '#F6D0DB' }]}>
                                            <View style={[tw` h-2 w-2/5`, { backgroundColor: '#9C0A35' }]}></View>
                                        </View>
                                        <Text style={tw`text-white`}></Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={tw`mb-7`}>
                            <ReviewCard
                                name='Natali'
                                reviewText=''

                            />
                        </View>
                    </View>

                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalImage: {
        width: "90%",
        height: "90%",
    },
    // contentContainer: {
    //     flex: 1,
    //     padding: 16,
    //     backgroundColor: "#21212E",
    // },
    galleryContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    imageRow: {
        flexDirection: "row",
        marginBottom: 10,
        width: "100%",
    },
    image: {
        width: isSmallDevice ? 100 : (width) / 3 - 20,
        height: isSmallDevice ? 100 : (width) / 3 - 10,
        borderRadius: 10,
        margin: 5,
    },
    caption: {
        marginTop: 10,
        marginBottom: 15,
        fontSize: 25,
        color: "white",
        fontWeight: "bold"
    },
    noDataText: {
        color: "white",
        textAlign: "center",
        marginTop: 20,
        fontSize: 18,
    },
});

export default MasterInformation;

