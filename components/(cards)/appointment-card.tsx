import {StyleSheet, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import tw from "tailwind-react-native-classnames";
import IconsButtons from "@/components/(buttons)/icon-btn";
import {HistorySessions} from "@/type/client/client";
import moment from "moment";
import CenteredModal from "@/components/(modals)/modal-centered";
import {AntDesign} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {
    addFeedbackMaster,
    getCanceledClient, getHistoryCount,
    getPastClient,
    getUpcomingClient,
    updateOrderStatus
} from "@/helpers/api-function/client/client";
import Toast from "react-native-simple-toast";
import clientStore from "@/helpers/state_managment/client/clientStore";

const AppointmentCard = ({clicks, serviceName, isBtn, data, userID}: {
    clicks?: () => void,
    serviceName: string[],
    isBtn?: boolean,
    data: HistorySessions,
    userID?: string
}) => {
    const {isLoading, setIsLoading, setUpcomingData, setPastData, setCanceledData, setHistoryCountData} = clientStore()
    const [rating, setRating] = useState(0);
    const [isModal, setIsModal] = useState(false);
    const [successStatus, setSuccessStatus] = useState('');

    useEffect(() => {
        setRating(0)
    }, [isModal]);

    useEffect(() => {
        if (successStatus === 'ACCEPTED') {
            setSuccessStatus('')
            if (userID) {
                getUpcomingClient(setUpcomingData, userID)
                getPastClient(setPastData, userID)
                getCanceledClient(setCanceledData, userID)
                getHistoryCount(setHistoryCountData, userID)
            }
        }
    }, [successStatus]);

    const handleRating = (value: any) => setRating(value)
    const toggleModal = () => setIsModal(!isModal)
    return (
        <>
            <View style={[styles.container]}>
                <TouchableOpacity activeOpacity={1} onPress={clicks}>
                    <Text style={styles.date}>
                        {moment(data.orderDate).format('dddd, DD MMMM')} {isBtn && `- ${data.startTime.slice(0, 5)}`}
                    </Text>
                </TouchableOpacity>
                <View style={styles.options}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {serviceName.length > 0 && serviceName.map((item, idx) =>
                            <TouchableOpacity
                                key={idx}
                                activeOpacity={1}
                                style={[styles.option, {borderWidth: 1}]}
                                onPress={clicks}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </View>
                <TouchableOpacity activeOpacity={1} onPress={clicks}>
                    <Text style={styles.price}>{data.servicePrice} сум</Text>
                </TouchableOpacity>
                {isBtn && (
                    <View style={[tw`flex-row items-center justify-between`]}>
                        <IconsButtons
                            name={`Принять`}
                            width={`47%`}
                            clicks={clicks}
                        />
                        <IconsButtons
                            name={`Отклонить`}
                            color={`#9C0A35`}
                            bg_color={`white`}
                            width={`47%`}
                            clicks={() => toggleModal()}
                        />
                    </View>
                )}
            </View>

            {/*fade back modal*/}
            <CenteredModal
                isFullBtn={false}
                isModal={isModal}
                btnWhiteText={isLoading ? 'loading...' : `Оценить`}
                btnRedText={`Закрыть`}
                onConfirm={() => {
                    updateOrderStatus(data.id, 'REJECTED', () => console.log('loading...'), setSuccessStatus)
                    if (rating > 0) addFeedbackMaster(rating, setIsLoading, toggleModal)
                    else Toast.show('Вы еще не оставили отзыв!', Toast.LONG)
                }}
                toggleModal={() => toggleModal()}
            >
                <View style={styles.modalContainer}>
                    <AntDesign name="closecircleo" size={70} color="#9C0A35"/>
                    <Text style={[styles.message, {marginTop: 14, opacity: .7}, tw`text-sm`]}>Запись Отклонена</Text>
                    <Text style={[styles.message, {marginVertical: 20}, tw`text-center text-lg leading-6`]}>
                        Спасибо что воспользовались нашим сервисом!
                    </Text>
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
                </View>
            </CenteredModal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B9B9C9',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16
    },
    date: {
        fontSize: 18,
        marginBottom: 14,
        fontWeight: 'bold',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 14
    },
    option: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 16,
        borderColor: '#4B4B64',
        color: '#4B4B64'
    },
    price: {
        fontSize: 20,
        color: '#9C0A35',
        marginBottom: 10,
        fontWeight: 'bold'
    },
    modalContainer: {
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    message: {
        color: '#FFFFFF',
        opacity: .9
    },
    stars: {
        flexDirection: 'row',
    },
    star: {
        marginHorizontal: 5
    },
});

export default AppointmentCard;
