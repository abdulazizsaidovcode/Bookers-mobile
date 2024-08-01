import { View, ScrollView, StatusBar, TouchableOpacity, Text, StyleSheet, Image, RefreshControl, Pressable, Dimensions, Linking } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import HistoryCard from "@/components/(cards)/history-card";
import { AntDesign, Feather, Fontisto } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { orderClientGetOne, orderGetOne } from "@/helpers/api-function/oreder/oreder";
import { getFile } from "@/helpers/api";
import moment from "moment";
import CenteredModal from "@/components/(modals)/modal-centered";
import { addFeedbackMaster, sliceTextFullName, updateOrderStatus } from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { handleRefresh } from "@/constants/refresh";
import ContactInformation from "@/components/contact-information/contact-information";
import { getMee } from "@/helpers/token";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { useFocusEffect } from 'expo-router';
import ContactInformationClient from '@/components/contact-information/contact-informationClient';
import { useMapStore } from '@/helpers/state_managment/map/map';
import BottomModal from '@/components/(modals)/modal-bottom';
import Buttons from '@/components/(buttons)/button';

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/records-information'>;

export interface OrderOne {
    masterId: string
    orderId: string,
    serviceIds: string[],
    serviceName: string,
    orderDate: string,
    firstName: string,
    lastName: string,
    specializations: string[],
    salonName: string,
    userAttachmentId: null,
    feedbackCount: 0,
    orderPrice: string,
    address: string,
    phoneNumber: string,
    orderStatus: string
    lng: string,
    lat: string,
    orderCount: number,
    clientCount: number,
    instagram: string,
    telegram: string
    startTime: string,
    finishTime: string,
    notifyForHour: string
    notifyForMinute: string
    status: "WAITING" | "ACCEPTED" | "REJECTED" | "COMPLETED",
    time: string
}
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ClientOrderDetail = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { id } = route.params;
    const { isLoading, setIsLoading, refreshing, setRefreshing } = clientStore()
    const { setGetMee } = useGetMeeStore()
    const [orderOneData, setOrderOneData] = useState<OrderOne | null>(null)
    const [isModal, setIsModal] = useState<boolean>(true)
    const [toast, setToast] = useState<boolean>(false)
    const [rating, setRating] = useState(0);
    const [isConfirm, setIsConfirm] = useState(false);
    const [successStatus, setSuccessStatus] = useState('');
    const [visible, setVisible] = useState(false);
    const { userLocation, setUserLocation } = useGetMeeStore();
    const { orderData } = useMapStore();

    useFocusEffect(useCallback(() => {
        if (id) orderClientGetOne(id, setOrderOneData)
        getMee(setGetMee)
    }, []))



    const toggleVisible = () => setVisible(!visible);

    useFocusEffect(useCallback(() => {
        if (successStatus === 'ACCEPTED') {
            orderClientGetOne(id, setOrderOneData)
            toggleConfirm()
            setSuccessStatus('')
        }
    }, [successStatus]))

    setTimeout(() => {
        console.log(orderOneData);
    }, 1000)


    useFocusEffect(useCallback(() => {
        if (toast) setRating(0)
    }, [toast]))

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    const toggleModal = () => setIsModal(!isModal)
    const handleRating = (value: any) => setRating(value)
    const toggleConfirm = () => setIsConfirm(!isConfirm)

    const statusName = (statusN: string) => {
        if (statusN === 'CLIENT_CONFIRMED' || statusN === 'MASTER_CONFIRMED') return 'Одобрено'
        else if (statusN === 'COMPLETED') return 'Выполнен'
        else if (statusN === 'CLIENT_REJECTED' || statusN === 'MASTER_REJECTED') return 'Отменён'
        else if (statusN === 'WAIT') return 'Ждать'
    }
    const statusRegex = (statusR: string) => {
        if (statusR === 'CLIENT_CONFIRMED' || statusR === 'MASTER_CONFIRMED') return '#217355'
        else if (statusR === 'COMPLETED') return '#6FCF97'
        else if (statusR === 'CLIENT_REJECTED' || statusR === 'MASTER_REJECTED') return '#EB5757'
        else if (statusR === 'WAIT') return '#F2C94C'
    }
    const generateStars = (count: number) => {
        const roundedCount = Math.round(count); // Yaqinlashtirilgan baho
        const starsCount = Math.min(roundedCount, 5); // 5 tadan oshmaydigan yulduzlar soni
        let stars = '';
        for (let i = 0; i < starsCount; i++) {
            stars += '★';
        }
        for (let i = starsCount; i < 5; i++) {
            stars += '☆';
        }
        return stars;
    };

    const openGoogleMaps = () => {
        const userLat = userLocation.coords.latitude;
        const userLng = userLocation.coords.longitude;
        const destinationLat = orderData.lat ? orderData.lat : 0;
        const destinationLng = orderData.lng ? orderData.lng : 0;

        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;

        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={orderOneData ? orderOneData.firstName : ''} navigate={() => navigation.navigate('(tabs)/(client)')} />
            <View style={tw`flex-1`}>
                <View style={[styles.head, { backgroundColor: orderOneData && orderOneData.orderStatus ? statusRegex(orderOneData.orderStatus) : '#9C0A35' }]}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>{orderOneData ? statusName(orderOneData.orderStatus) : ''}</Text>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: 16,
                        flexGrow: 1,
                        justifyContent: 'space-between'
                    }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View style={tw`mt-3`}>
                        <TouchableOpacity
                            style={[
                                tw`items-start justify-start px-4 py-5 mb-3 rounded-2xl`,
                                { backgroundColor: "#B9B9C9" },
                            ]}
                            activeOpacity={0.8}
                        >
                            <View
                                style={[
                                    tw`flex-row items-start justify-start rounded-2xl`,
                                    { backgroundColor: "#B9B9C9" },
                                ]}
                            >
                                <Image
                                    source={(orderOneData && orderOneData.userAttachmentId !== null)
                                        ? { uri: `${getFile}${orderOneData.userAttachmentId}` }
                                        : require('../../../assets/avatar.png')
                                    }
                                    style={tw`w-12 h-12 rounded-full`}
                                />
                                <View style={[tw`flex-row`, { justifyContent: 'space-between', width: '86%' }]} >
                                    <View style={tw`ml-4 flex-col`}>
                                        <View style={tw` flex-row justify-center items-center`}>
                                            <Text style={[tw`text-black text-lg font-bold mr-2`, { lineHeight: 22 }]}>
                                                {orderOneData ? orderOneData.firstName : ''}
                                            </Text>
                                            <Text style={[tw` text-sm border rounded-md px-1 `, { lineHeight: 22, borderColor: '#4F4F4F', color: '#4F4F4F' }]}>
                                                {orderOneData ? orderOneData.salonName : ''}
                                            </Text>
                                        </View>
                                        <Text style={[tw`text-black text-lg font-bold`, { lineHeight: 22 }]}>
                                            {orderOneData ? orderOneData.specializations[0] : ''}
                                        </Text>
                                    </View>

                                    <View style={tw` flex-col`}>
                                        <Text style={[tw`text-black text-lg font-bold`, { lineHeight: 22, color: '#9C0A35' }]}>
                                            {orderOneData ? generateStars(orderOneData.feedbackCount) : ''}
                                        </Text>
                                        <View style={[tw`flex-row`, {}]}>
                                            <Text style={[tw`text-sm mr-1`, { lineHeight: 22, color: '#4F4F4F' }]}>
                                                {orderOneData ? `${orderOneData.orderCount} заказа` : ''}
                                            </Text>
                                            <Text style={[tw`text-sm`, { lineHeight: 22, color: '#4F4F4F' }]}>
                                                {orderOneData ? `${orderOneData.clientCount} клинетов` : ''}
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                            <Text style={[tw` text-sm  mt-5`, { lineHeight: 22, color: '#4F4F4F' }]}>
                                {orderOneData ? orderOneData.address : ''}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.9} style={styles.button}>
                            <Text style={styles.text}>
                                {orderOneData && orderOneData.serviceName}
                            </Text>
                        </TouchableOpacity>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={orderOneData ? `${moment(orderOneData.orderDate).format('dddd, D MMMM')}` : ''}
                                btnOrText
                                statusName={orderOneData ? `${orderOneData.time}` : ''}
                                description={`Длительность - ${orderOneData ? `${orderOneData.time}` : 0} час`}
                            />
                        </View>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={`Стоимость:`}
                                btnOrText
                                statusName={orderOneData ? `${orderOneData.orderPrice} сум` : ''}
                            />
                        </View>
                        <View style={tw`mt-3 mb-4`}>
                            <HistoryCard
                                name={`Уведомить за:`}
                                btnOrText={false}
                                statusName={orderOneData ? `${orderOneData.notifyForHour}.${orderOneData.notifyForMinute} часа` : ''}
                            />
                        </View>

                        <ContactInformationClient data={orderOneData} />

                        {(orderOneData && (orderOneData.orderStatus === 'CLIENT_CONFIRMED' || orderOneData.orderStatus === 'MASTER_CONFIRMED')) && (
                            <>
                                <Text style={styles.contactTitle}>Как добраться</Text>
                                <TouchableOpacity
                                    onPress={toggleVisible}
                                    activeOpacity={.9}
                                    style={[styles.button, tw`mb-4 items-center flex-row`]}
                                >
                                    <Fontisto name="navigate" size={30} color="#9C0A35" />
                                    <Text style={[tw`font-bold text-lg ml-4`]}>
                                        Передвинуть
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.contactTitle}>Дополнительно</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('(client)/(oreder)/order', {
                                        id: {
                                            requerment: 'EDIT',
                                            orderId: orderOneData.orderId,
                                            masterId: orderOneData.masterId,
                                        }
                                    })}
                                    activeOpacity={.9}
                                    style={[styles.button, tw`mb-4 items-center flex-row`]}
                                >
                                    <Fontisto name="arrow-move" size={30} color="#9C0A35" />
                                    <Text style={[tw`font-bold text-lg ml-4`]}>
                                        Передвинуть
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={toggleConfirm}
                                    activeOpacity={.9}
                                    style={[styles.button, tw`mb-4 items-center flex-row`]}
                                >
                                    <AntDesign name="closecircleo" size={30} color="#9C0A35" />
                                    <Text style={[tw`font-bold text-lg ml-4`]}>
                                        Отменить
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {
                            orderOneData && orderOneData.orderStatus === 'COMPLETED' &&

                            <View style={{marginTop: 20}}>
                                <Buttons title='Оставить отзыв' backgroundColor='#fff' textColor='#9C0A35' onPress={() => navigation.navigate('(client)/(oreder)/order')}/>
                                <View style={{marginTop: 20}}></View>
                                <Buttons title='Написать сообщение' backgroundColor='#9C0A35' textColor='#fff' onPress={() => navigation.navigate('(client)/(oreder)/order')}/>
                            </View>
                        }
                        <BottomModal toggleBottomModal={toggleModal} isBottomModal={visible}>
                            <View style={{ width: '100%' }}>
                                <Text style={[styles.infoText]}>Построить маршрут через</Text>
                                <View style={styles.optionContainer}>
                                    <Text style={styles.address}>2GIS</Text>
                                    <TouchableOpacity activeOpacity={0.8} onPress={openGoogleMaps}>
                                        <Text style={styles.address}>Google Maps</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8}>
                                        <Text style={styles.address}>Yandex Maps</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.separator} />
                                <Pressable onPress={toggleVisible} style={styles.cancelButton}>
                                    <Text style={styles.routeText}>Отмена</Text>
                                </Pressable>
                            </View>
                        </BottomModal>

                        {/*canceled order status*/}
                        <CenteredModal
                            isFullBtn
                            isModal={isConfirm}
                            btnWhiteText={`Закрыть`}
                            btnRedText={isLoading ? 'loading...' : `Отправить`}
                            onConfirm={() => updateOrderStatus(id, 'REJECTED', setIsLoading, setSuccessStatus)}
                            toggleModal={toggleConfirm}
                        >
                            <Text style={[styles.message, { marginTop: 5 }]}>
                                Reject the order?
                            </Text>
                        </CenteredModal>
                    </View>
                </ScrollView>
            </View >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    head: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 20,
        justifyContent: 'center',
    },
    modalContainer: {
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    message: {
        fontSize: 18,
        color: '#FFFFFF',
        marginVertical: 20,
        textAlign: 'center',
        opacity: .7
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 20
    },
    star: {
        marginHorizontal: 5
    },
    button: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16
    },
    text: {
        color: '#696868',
        borderWidth: 2,
        borderColor: '#868686',
        alignSelf: 'flex-start',
        fontSize: 16,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 6
    },
    contactTitle: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 26,
        marginBottom: 16,
        fontWeight: '700'
    },
    infoText: {
        color: 'white',
    },
    metroIcon: {
        color: '#9C0A35',
        fontSize: 24,
    },
    metroText: {
        color: 'white',
        fontFamily: 'bold',
        fontSize: 15,
    },
    metroDistance: {
        color: '#828282',
    },
    separator: {
        borderWidth: 0.5,
        borderColor: 'white',
        marginVertical: 5,
    },
    taxiText: {
        color: '#9C0A35',
        fontFamily: 'bold',
        fontSize: 17,
        paddingVertical: 3,
    },
    routeButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    routeText: {
        color: '#9C0A35',
        fontFamily: 'bold',
        fontSize: 17,
    },
    optionContainer: {
        gap: 10,
        marginTop: 10,
    },
    cancelButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    infoWrapper: {
        position: 'absolute',
        bottom: 0,
        padding: 20,
    },
    infoContainer: {
        padding: 15,
        backgroundColor: '#21212E',
        width: screenWidth / 1.13,
        height: screenHeight / 3.7,
        borderRadius: 20,
    },
    address: {
        fontFamily: 'bold',
        fontSize: 18,
        color: 'white',
    },
    infoDetails: {
        marginTop: 10,
        gap: 5,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
});

export default ClientOrderDetail;
