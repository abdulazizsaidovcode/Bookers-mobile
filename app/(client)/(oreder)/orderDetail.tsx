import { View, ScrollView, StatusBar, TouchableOpacity, Text, StyleSheet, Image, RefreshControl } from 'react-native';
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

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/records-information'>;

export interface OrderOne {
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

    useFocusEffect(useCallback(() => {
        if (id) orderClientGetOne(id, setOrderOneData)
        getMee(setGetMee)
    }, []))

    console.log(id, 'blee');


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

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name={orderOneData ? orderOneData.firstName : ''} navigate={() => navigation.navigate('(tabs)/(client)')} />
            <View style={tw`flex-1`}>
                <View style={[styles.head, { backgroundColor: orderOneData && orderOneData.orderStatus ? statusRegex(orderOneData.orderStatus) : '#9C0A35' }]}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>{orderOneData ? orderOneData.orderStatus : ''}</Text>
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
                                <Text style={styles.contactTitle}>Дополнительно</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('(client)/(oreder)/order', {
                                        id: {
                                            requerment: 'EDIT',
                                            orderId: orderOneData.orderId,
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
});

export default ClientOrderDetail;
