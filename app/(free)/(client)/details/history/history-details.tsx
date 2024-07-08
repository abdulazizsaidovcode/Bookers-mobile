import React, {useEffect, useState} from "react";
import {View, ScrollView, StatusBar, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import {AntDesign, Entypo, Feather, FontAwesome5, Fontisto} from "@expo/vector-icons";
import HistoryCard from "@/components/(cards)/history-card";
import {orderGetOne} from "@/helpers/api-function/oreder/oreder";
import {getFile} from "@/helpers/api";
import moment from "moment";
import CenteredModal from "@/components/(modals)/modal-centered";
import {addFeedbackMaster, sliceTextFullName} from "@/helpers/api-function/client/client";

type CreatingClientScreenRouteProp = RouteProp<RootStackParamList, '(free)/(client)/details/history/history-details'>;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/history/history-details'>;

const HistoryDetailsInformation = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<CreatingClientScreenRouteProp>();
    const {historyData} = route.params;
    const [serviceName, setServiceName] = useState([]);

    useEffect(() => {
        let list;
        if (historyData) list = historyData.serviceName.split(', ')
        setServiceName(list ? list : null)
    }, [historyData]);

    // const handleRating = (value: any) => setRating(value)

    const statusName = (statusN: string) => {
        if (statusN === 'CLIENT_CONFIRMED' || statusN === 'MASTER_CONFIRMED') return 'Одобрено'
        else if (statusN === 'COMPLETED') return 'Выполнен'
        else if (statusN === 'CLIENT_REJECTED' || statusN === 'MASTER_REJECTED') return 'Отменён'
        else if (statusN === 'WAIT') return 'Ждать'
    }

    console.log('history data: ', historyData)

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
                        <View style={tw`mt-3`}>
                            {historyData.orderStatus === 'WAIT' ? (
                                <View style={styles.statusCard}>
                                    <Text style={tw`font-bold text-lg`}>Статус:</Text>
                                    <View style={tw`flex-row items-center`}>
                                        <TouchableOpacity style={[styles.btn, {borderColor: '#9C0A35', marginRight: 8}]}>
                                            <Text style={[{fontSize: 13, color: '#9C0A35'}]}>
                                                Отклонить
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.btn, {backgroundColor: '#9C0A35', borderColor: '#9C0A35'}]}>
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
                        {/*<CenteredModal*/}
                        {/*    oneBtn*/}
                        {/*    isFullBtn*/}
                        {/*    isModal={isModal}*/}
                        {/*    btnWhiteText={``}*/}
                        {/*    btnRedText={`Закрыть`}*/}
                        {/*    onConfirm={() => {*/}
                        {/*        addFeedbackMaster(rating, setToast)*/}
                        {/*        toggleModal()*/}
                        {/*    }}*/}
                        {/*    toggleModal={() => console.log('toggle')}*/}
                        {/*>*/}
                        {/*    <View style={styles.modalContainer}>*/}
                        {/*        <Feather name="check-circle" size={70} color="#9C0A35"/>*/}
                        {/*        <Text style={styles.message}>Клиент записан на процедуру</Text>*/}
                        {/*        <View style={styles.stars}>*/}
                        {/*            {Array(5).fill(0).map((_, index) => (*/}
                        {/*                <TouchableOpacity activeOpacity={.7} key={index} onPress={() => handleRating(index + 1)}>*/}
                        {/*                    <AntDesign name={index < rating ? "star" : "staro"} size={30} color="#B00000"*/}
                        {/*                               style={styles.star}/>*/}
                        {/*                </TouchableOpacity>*/}
                        {/*            ))}*/}
                        {/*        </View>*/}
                        {/*    </View>*/}
                        {/*</CenteredModal>*/}
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

export default HistoryDetailsInformation;
