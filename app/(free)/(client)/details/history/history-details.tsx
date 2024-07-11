import React, {useCallback, useEffect, useState} from "react";
import {View, ScrollView, StatusBar, TouchableOpacity, Text, StyleSheet, Image, RefreshControl} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import {AntDesign, Fontisto} from "@expo/vector-icons";
import HistoryCard from "@/components/(cards)/history-card";
import {getFile} from "@/helpers/api";
import moment from "moment";
import CenteredModal from "@/components/(modals)/modal-centered";
import {
    addFeedbackMaster,
    getCanceledClient,
    getHistoryCount,
    getPastClient,
    getUpcomingClient,
    sliceTextFullName,
    updateOrderStatus
} from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";
import Buttons from "@/components/(buttons)/button";
import Textarea from "@/components/select/textarea";
import {handleRefresh} from "@/constants/refresh";
import {getClientIdStore} from "@/constants/storage";
import ContactInformation from "@/components/contact-information/contact-information";
import {getMee} from "@/helpers/token";
import useGetMeeStore from "@/helpers/state_managment/getMee";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/history/history-details'>;

const HistoryDetailsInformation = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<any>();
    const {historyData} = route.params;
    const {isLoading, setIsLoading, setUpcomingData, setPastData, setCanceledData, setHistoryCountData, refreshing, setRefreshing} = clientStore()
    const {setGetMee} = useGetMeeStore()
    const [serviceName, setServiceName] = useState([]);
    const [confirmStatus, setConfirmStatus] = useState('');
    const [successStatus, setSuccessStatus] = useState('');
    const [isConfirm, setIsConfirm] = useState(false);
    const [isFeedback, setIsFeedback] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [userID, setUserID] = useState<string>('');
    const [textVal, setTextVal] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        if (!isFeedback) {
            setTextVal('')
            setRating(0)
        }
    }, [isFeedback]);

    useEffect(() => {
        getClientIdStore(setUserID);
        getMee(setGetMee)
    }, []);

    useEffect(() => {
        let list;
        if (historyData) list = historyData.serviceName.split(', ')
        setServiceName(list ? list : null)
    }, [historyData]);

    useEffect(() => {
        if (successStatus === 'ACCEPTED') {
            setSuccessStatus('')
            navigation.goBack()
            getUpcomingClient(setUpcomingData, userID)
            getPastClient(setPastData, userID)
            getCanceledClient(setCanceledData, userID)
            getHistoryCount(setHistoryCountData, userID)
        }
    }, [successStatus]);

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    const handleRating = (value: number) => setRating(value)
    const toggleConfirm = () => setIsConfirm(!isConfirm)
    const toggleRejected = () => setIsRejected(!isRejected)
    const toggleFeedback = () => setIsFeedback(!isFeedback)

    const statusName = (statusN: string) => {
        if (statusN === 'CLIENT_CONFIRMED' || statusN === 'MASTER_CONFIRMED') return 'Одобрено'
        else if (statusN === 'COMPLETED') return 'Выполнен'
        else if (statusN === 'CLIENT_REJECTED' || statusN === 'MASTER_REJECTED') return 'Отменён'
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
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
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
                                source={(historyData && historyData.attachmentId !== null)
                                    ? {uri: `${getFile}${historyData.attachmentId}`}
                                    : require('../../../../../assets/avatar.png')
                                }
                                style={tw`w-12 h-12 rounded-full`}
                            />
                            <View style={tw`ml-4 flex-col`}>
                                <Text style={[tw`text-black text-lg font-bold`, {lineHeight: 22}]}>
                                    {sliceTextFullName(historyData.fullName)}
                                </Text>
                                <Text style={[tw`text-gray-500 text-base`, {lineHeight: 22}]}>
                                    {historyData.phone}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.button}>
                            {serviceName.length > 0 ? serviceName.map((item, idx) => (
                                <Text style={styles.text} key={idx}>
                                    {item}
                                </Text>
                            )) : ''}
                        </View>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={historyData ? `${moment(historyData.orderDate).format('dddd, D MMMM')}` : ''}
                                btnOrText
                                statusName={historyData ? `${historyData.startTime.slice(0, 5)} - ${historyData.finishTime.slice(0, 5)}` : ''}
                                description={`Длительность - ${historyData ? `${historyData.serviceHour}.${historyData.serviceMinute}` : 0} час`}
                            />
                        </View>
                        <View style={tw`mt-3`}>
                            <HistoryCard
                                name={`Стоимость:`}
                                btnOrText
                                statusName={historyData ? `${historyData.servicePrice} сум` : ''}
                            />
                        </View>
                        <View style={tw`mt-3`}>
                            {!(+historyData.notifyForHour === 0 && +historyData.notifyForMinute === 0) && (
                                <HistoryCard
                                    name={`Уведомить за:`}
                                    btnOrText={false}
                                    statusName={historyData ? `${historyData.notifyForHour}.${historyData.notifyForMinute} часа` : ''}
                                />
                            )}
                        </View>
                        <View style={tw`mt-3 mb-7`}>
                            {historyData.orderStatus === 'WAIT' ? (
                                <View style={styles.statusCard}>
                                    <Text style={tw`font-bold text-lg`}>Статус:</Text>
                                    <View style={tw`flex-row items-center`}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                toggleConfirm()
                                                setConfirmStatus('no')
                                            }}
                                            activeOpacity={.7}
                                            style={[styles.btn, {borderColor: '#9C0A35', marginRight: 8}]}
                                        >
                                            <Text style={[{fontSize: 13, color: '#9C0A35'}]}>
                                                Отклонить
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                toggleConfirm()
                                                setConfirmStatus('ok')
                                            }}
                                            activeOpacity={.7}
                                            style={[styles.btn, {backgroundColor: '#9C0A35', borderColor: '#9C0A35'}]}
                                        >
                                            <Text style={[{fontSize: 13, color: 'white'}]}>
                                                Принять
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : (
                                <HistoryCard
                                    name={`Статус:`}
                                    btnOrText={false}
                                    orderStatus={historyData ? historyData.orderStatus : ''}
                                    statusName={historyData ? statusName(historyData.orderStatus) : ''}
                                />
                            )}
                        </View>

                        <ContactInformation />
                        {historyData.orderStatus !== 'WAIT' && (
                            <Text style={styles.contactTitle}>Дополнительно</Text>
                        )}
                        {(historyData.orderStatus === 'CLIENT_CONFIRMED' || historyData.orderStatus === 'MASTER_CONFIRMED') && (
                            <>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('(free)/(client)/details/records', {record: {updateOrder: 'updateOrder', orderOneData: historyData}})}
                                    activeOpacity={.9}
                                    style={[styles.button, tw`mb-4 items-center flex-row`]}
                                >
                                    <Fontisto name="arrow-move" size={30} color="#9C0A35"/>
                                    <Text style={[tw`font-bold text-lg ml-4`]}>
                                        Передвинуть
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={toggleRejected}
                                    activeOpacity={.9}
                                    style={[styles.button, tw`mb-4 items-center flex-row`]}
                                >
                                    <AntDesign name="closecircleo" size={30} color="#9C0A35"/>
                                    <Text style={[tw`font-bold text-lg ml-4`]}>
                                        Отменить
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {(historyData.orderStatus === 'COMPLETED' || historyData.orderStatus === 'CLIENT_REJECTED' || historyData.orderStatus === 'MASTER_REJECTED') && (
                            <Buttons
                                title={`Оставить отзыв`}
                                backgroundColor={`white`}
                                textColor={`#9C0A35`}
                                onPress={toggleFeedback}
                            />
                        )}

                        {/*fade back modal*/}
                        <CenteredModal
                            isFullBtn={false}
                            isModal={isFeedback}
                            btnWhiteText={isLoading ? 'loading...' : `Отправить`}
                            btnRedText={`Закрыть`}
                            onConfirm={() => addFeedbackMaster(rating, setIsLoading, toggleFeedback, textVal)}
                            toggleModal={() => {
                                toggleFeedback()
                                setRating(0)
                            }}
                        >
                            <View style={styles.modalContainer}>
                                <Text style={styles.message}>Оцените клиента!</Text>
                                <View style={styles.stars}>
                                    {Array(5).fill(0).map((_, index) => (
                                        <TouchableOpacity activeOpacity={.7} key={index} onPress={() => handleRating(index + 1)}>
                                            <AntDesign
                                                name={index < rating ? "star" : "staro"}
                                                size={30}
                                                color="#B00000"
                                                style={styles.star}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <Textarea
                                    placeholder={`Оставить отзыв`}
                                    value={textVal}
                                    onChangeText={e => setTextVal(e)}
                                />
                            </View>
                        </CenteredModal>

                        {/*confirm modal*/}
                        <CenteredModal
                            isFullBtn
                            isModal={isConfirm}
                            btnWhiteText={`Закрыть`}
                            btnRedText={isLoading ? 'loading...' : `Отправить`}
                            onConfirm={() => {
                                if (confirmStatus === 'ok') updateOrderStatus(historyData.id, 'CONFIRMED', setIsLoading, setSuccessStatus, toggleConfirm)
                                else updateOrderStatus(historyData.id, 'REJECTED', setIsLoading, setSuccessStatus, toggleConfirm)
                            }}
                            toggleModal={toggleConfirm}
                        >
                            <Text style={[styles.message, {marginTop: 5}]}>
                                {confirmStatus === 'ok' ? 'Confirm the order?' : 'Reject the order?'}
                            </Text>
                        </CenteredModal>

                        {/*canceled order status*/}
                        <CenteredModal
                            isFullBtn
                            isModal={isRejected}
                            btnWhiteText={`Закрыть`}
                            btnRedText={isLoading ? 'loading...' : `Отправить`}
                            onConfirm={() => updateOrderStatus(historyData.id, 'REJECTED', setIsLoading, setSuccessStatus, toggleRejected)}
                            toggleModal={toggleRejected}
                        >
                            <Text style={[styles.message, {marginTop: 5}]}>
                                Reject the order?
                            </Text>
                        </CenteredModal>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    statusCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#B9B9C9',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
    },
    modalContainer: {
        borderRadius: 10,
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

export default HistoryDetailsInformation;
