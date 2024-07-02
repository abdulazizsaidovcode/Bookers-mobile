import {View, ScrollView, StatusBar, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import HistoryCard from "@/components/(cards)/history-card";
import {AntDesign, Entypo, Feather, FontAwesome5, Fontisto} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {orderGetOne} from "@/helpers/api-function/oreder/oreder";
import {getFile} from "@/helpers/api";
import moment from "moment";
import CenteredModal from "@/components/(modals)/modal-centered";
import {addFeedbackMaster} from "@/helpers/api-function/client/client";

type CreatingClientScreenRouteProp = RouteProp<RootStackParamList, '(free)/(client)/details/records-information'>;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/records-information'>;

export interface OrderOne {
    id: string
    fullName: string
    clientStatus: string[]
    phone: string
    serviceName: string
    servicePrice: number
    serviceHour: number
    serviceMinute: number
    orderDate: string
    prePayment: number
    paid: number
    toPay: number
    startTime: string
    finishTime: string
    notifyForHour: number
    notifyForMinute: number
    orderStatus: string
    hallStatus: string
    attachmentId: null | string
}

const RecordsInformation = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<CreatingClientScreenRouteProp>();
    const {orderID} = route.params;
    const [orderOneData, setOrderOneData] = useState<OrderOne | null>(null)
    const [isModal, setIsModal] = useState<boolean>(true)
    const [toast, setToast] = useState<boolean>(false)
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (orderID) orderGetOne(orderID, setOrderOneData)
    }, []);

    useEffect(() => {
        if (toast) {
            alert(`Siz ilovaga ${rating} baho berdingiz ✔`)
            setRating(0)
            setToast(false)
        }
    }, [toast]);

    const toggleModal = () => setIsModal(!isModal)
    const handleRating = (value: any) => setRating(value)

    const sliceText = (fullName: string) => {
        if (fullName) {
            let text: string = `${fullName}`
            if (text.length > 22) {
                return `${text.slice(0, 22)}...`
            } else return text
        } else return fullName
    }

    const statusName = (statusN: string) => {
        if (statusN === 'CLIENT_CONFIRMED' || statusN === 'MASTER_CONFIRMED' || statusN === 'COMPLETED') return 'Одобрено'
        else if (statusN === 'CLIENT_REJECTED' || statusN === 'MASTER_REJECTED') return 'Не подтверждено'
        else if (statusN === 'WAIT') return 'Ждать'
    }

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={``}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: 16,
                        flexGrow: 1,
                        justifyContent: 'space-between'
                    }}
                >
                    <View style={tw`mt-3`}>
                        <TouchableOpacity
                            style={[
                                tw`flex-row items-start justify-start px-4 py-5 mb-3 rounded-2xl`,
                                {backgroundColor: "#B9B9C9"},
                            ]}
                            activeOpacity={0.8}
                        >
                            <Image
                                source={(orderOneData && orderOneData.attachmentId !== null)
                                    ? {uri: `${getFile}${orderOneData.attachmentId}`}
                                    : require('../../../../assets/avatar.png')
                                }
                                style={tw`w-12 h-12 rounded-full`}
                            />
                            <View style={tw`ml-4 flex-col`}>
                                <Text style={[tw`text-black text-lg font-bold`, {lineHeight: 22}]}>
                                    {sliceText(orderOneData ? orderOneData.fullName : '')}
                                </Text>
                                <Text style={[tw`text-gray-500 text-base`, {lineHeight: 22}]}>
                                    {orderOneData && orderOneData.phone}
                                </Text>
                            </View>
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
                                statusName={orderOneData ? `${orderOneData.startTime.slice(0, 5)} - ${orderOneData.finishTime.slice(0, 5)}` : ''}
                                description={`Длительность - ${orderOneData ? `${orderOneData.serviceHour}.${orderOneData.serviceMinute}` : 0} час`}
                            />
                        </View>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={`Стоимость:`}
                                btnOrText
                                statusName={orderOneData ? `${orderOneData.servicePrice} сум` : ''}
                            />
                        </View>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={`Уведомить за:`}
                                btnOrText={false}
                                statusName={orderOneData ? `${orderOneData.notifyForHour}.${orderOneData.notifyForMinute} часа` : ''}
                            />
                        </View>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={`Статус:`}
                                btnOrText={false}
                                orderStatus={orderOneData ? orderOneData.orderStatus : ''}
                                statusName={orderOneData ? statusName(orderOneData.orderStatus) : ''}
                            />
                        </View>

                        <Text style={styles.contactTitle}>Контактная информация</Text>
                        <View style={styles.contactInfo}>
                            <TouchableOpacity
                                activeOpacity={.6}
                                style={[styles.contactItem]}
                            >
                                <Feather name="phone" size={24} color="#9C0A35"/>
                                <Text style={styles.contactText}>
                                    91 212 02 57
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.6}
                                style={[styles.contactItem, {marginTop: 10}]}
                            >
                                <Entypo name="instagram" size={24} color="#9C0A35"/>
                                <Text style={styles.contactText}>
                                    @Al1sher_o9o3
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={.6}
                                style={[styles.contactItem, {marginTop: 10}]}
                            >
                                <FontAwesome5 name="telegram-plane" size={24} color="#9C0A35"/>
                                <Text style={styles.contactText}>
                                    @Alisher_Sodiqov
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.contactTitle}>Дополнительно</Text>
                        <TouchableOpacity activeOpacity={.9} style={[styles.button, tw`mb-4 items-center flex-row`]}>
                            <Fontisto name="arrow-move" size={30} color="#9C0A35"/>
                            <Text style={[tw`font-bold text-lg ml-4`]}>
                                Передвинуть
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.9} style={[styles.button, tw`mb-4 items-center flex-row`]}>
                            <AntDesign name="closecircleo" size={30} color="#9C0A35"/>
                            <Text style={[tw`font-bold text-lg ml-4`]}>
                                Отменить
                            </Text>
                        </TouchableOpacity>

                        {/*fade back modal*/}
                        <CenteredModal
                            oneBtn
                            isFullBtn
                            isModal={isModal}
                            btnWhiteText={``}
                            btnRedText={`Закрыть`}
                            onConfirm={() => {
                                addFeedbackMaster(rating, setToast)
                                toggleModal()
                            }}
                            toggleModal={() => console.log('toggle')}
                        >
                            <View style={styles.modalContainer}>
                                <Feather name="check-circle" size={70} color="#9C0A35"/>
                                <Text style={styles.message}>Клиент записан на процедуру</Text>
                                <View style={styles.stars}>
                                    {Array(5).fill(0).map((_, index) => (
                                        <TouchableOpacity activeOpacity={.7} key={index} onPress={() => handleRating(index + 1)}>
                                            <AntDesign name={index < rating ? "star" : "staro"} size={30} color="#B00000"
                                                       style={styles.star}/>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </CenteredModal>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    icon: {
        marginBottom: 20
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
    contactInfo: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    contactTitle: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 26,
        marginBottom: 16,
        fontWeight: '700'
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactText: {
        color: '#4F4F4F',
        marginLeft: 12,
        fontSize: 16
    },
});

export default RecordsInformation;
