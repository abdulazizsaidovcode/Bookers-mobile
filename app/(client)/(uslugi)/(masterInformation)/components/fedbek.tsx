import React, {useCallback, useState} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import axios from "axios";
import {getConfig} from "@/app/(tabs)/(master)/main";
import {client_feedback, client_feedback_filter, getFile} from "@/helpers/api";
import {useFocusEffect} from "expo-router";
import clientStore from "@/helpers/state_managment/client/clientStore";
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";
import moment from "moment";
import BottomModal from "@/components/(modals)/modal-bottom";
import {Loading} from "@/components/loading/loading";

export interface FeedBack {
    overallRating: number
    reviewCount: number
    great: number
    fine: number
    average: number
    badly: number
    veryBadly: number
    feedback: FeedbackObject
}

export interface FeedbackObject {
    page: number
    size: number
    totalElements: number
    totalPage: number
    object: FeedbackList[]
}

export interface FeedbackList {
    id: string
    count: number
    masterId: string
    master: null | string
    clientId: string
    clientResDto: null | string
    orderId: null | string
    clientName: string
    clientPhoto: string
    text: string
    date: string
    feedbackStatusName: null | string
}

export const getFeedbackClientList = async (setData: (val: FeedBack | null) => void, masterID: string, page: number, setLoading: (val: boolean) => void) => {
    setLoading(true)
    try {
        if (masterID) {
            const config = await getConfig();
            const url: string = `${client_feedback}${masterID}?page=${page}&size=10`

            const {data} = await axios.get(url, config ? config : {});
            if (data.success) {
                setData(data.body)
                setLoading(false)
            } else {
                setLoading(false)
                setData(null)
            }
        } else {
            setLoading(false)
            setData(null)
        }
    } catch (err) {
        setLoading(false)
        setData(null)
        console.error(err)
    }
}

export const getFeedbackClientFilter = async (setData: (val: FeedBack | null) => void, masterID: string, count: number, page: number, setLoading: (val: boolean) => void) => {
    setLoading(true)
    try {
        if (masterID) {
            const config = await getConfig();
            const url: string = `${client_feedback_filter}${masterID}?page=${page}&size=10&count=${count}`

            const {data} = await axios.get(url, config ? config : {});
            if (data.success) {
                setData(data.body)
                setLoading(false)
            } else {
                setLoading(false)
                setData(null)
            }
        } else {
            setLoading(false)
            setData(null)
        }
    } catch (err) {
        setLoading(false)
        setData(null)
        console.error(err)
    }
}

const ClientFeedbackCard = ({onPress, data, oneStatus}: {
    onPress?: () => void,
    data: FeedbackList,
    oneStatus?: string
}) => {
    const generateStars = (count: number) => {
        let stars = '';
        for (let i = 1; i <= count; i++) stars += '★';
        for (let i = count; i < 5; i++) stars += '☆';
        return stars;
    };

    const sliceText = (text: string) => {
        if (text.trim().length > 23) return `${text.slice(0, 23)}...`;
        else return text;
    }

    const sliceTextDescription = (text: string) => {
        if (text.trim().length > 100) return `${text.slice(0, 100)}...`;
        else return text;
    }

    return <>
        <TouchableOpacity
            activeOpacity={.9}
            onPress={onPress}
            style={tw`w-full mb-3`}
        >
            <View style={[tw`rounded-2xl p-3 relative`, {backgroundColor: '#B9B9C9'}]}>
                <Text style={[{fontSize: 12}, tw`absolute top-2 right-2`]}>
                    {moment(data.date).format('DD/MM/YYYY')}
                </Text>
                <View style={tw`flex-row items-center mb-2 w-full`}>
                    {data.clientPhoto ? (
                        <Image
                            source={{uri: getFile + data.clientPhoto}}
                            alt={data.clientName}
                            style={tw`w-14 h-14 rounded-full`}
                        />
                    ) : (
                        <FontAwesome name="user-circle" size={40} color="white"/>
                    )}
                    <View style={tw`ml-4`}>
                        <Text style={[tw`text-lg font-bold`, {color: '#000000'}]}>{sliceText(data.clientName)}</Text>
                        <Text style={[tw`text-lg`, {color: '#9C0A35'}]}>{generateStars(data.count || 0)}</Text>
                    </View>
                </View>
                <Text style={tw`text-gray-600`}>
                    {oneStatus ? data.text : sliceTextDescription(data.text)}
                </Text>
            </View>
        </TouchableOpacity>
    </>
}

const BreakdownItem = (
    {
        label,
        percentage,
        isSelected,
        onPress,
        oneStatus
    }: {
        label: string,
        percentage: number,
        isSelected?: boolean,
        onPress?: () => void,
        oneStatus?: string
    }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={!oneStatus ? .9 : 1}
            style={[tw`flex-row items-center justify-start w-full my-2`]}
        >
            {!oneStatus && <CustomCheckbox checked={isSelected}/>}
            <Text style={[styles.breakdownLabel, {marginLeft: oneStatus ? 0 : 10}]}>{label}</Text>
            <View style={styles.bar}>
                <View style={[styles.filledBar, {width: `${percentage}%`}]}/>
            </View>
        </TouchableOpacity>
    );
};

const CustomCheckbox = ({checked}: { checked?: boolean }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.checkbox]}>
                {checked && <View style={styles.innerCircle}/>}
            </View>
        </View>
    );
};

const ClientFeedback = () => {
    const {isLoading, setIsLoading} = clientStore()
    const {selectedClient} = ClientStory()
    const [feedback, setFeedback] = useState<FeedBack | null>(null)
    const [page, setPage] = useState(0)
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [oneData, setOneData] = useState<FeedbackList | null>(null)
    const [isModal, setIsModal] = useState(false)
    const maxStars = 5;
    const fullStars = Math.floor(feedback ? feedback.overallRating : 0);
    const halfStar = feedback ? feedback.overallRating : 0 - fullStars >= 0.5;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    useFocusEffect(useCallback(() => {
        if (selectedClient) getFeedbackClientList(setFeedback, selectedClient?.id, page, setIsLoading)
    }, []))

    useFocusEffect(useCallback(() => {
        if (selectedClient) getFeedbackClientList(setFeedback, selectedClient?.id, page, setIsLoading)
    }, [page]))

    useFocusEffect(useCallback(() => {
        setPage(0)
        if (selectedItem === null && selectedClient) getFeedbackClientList(setFeedback, selectedClient?.id, page, setIsLoading)
    }, [selectedItem]))

    const toggleModal = () => setIsModal(!isModal)
    const handleButtonPress = (buttonIndex: any) => {
        if (buttonIndex === 1) setPage(prevPage => prevPage + 1)
        else if (buttonIndex === 0) return setPage(prevPage => prevPage - 1)
    };

    return (
        <View style={tw`flex-1`}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 20, alignItems: 'center'}}
            >
                <View style={[tw`flex-row items-center justify-center`, {gap: 8}]}>
                    <Text style={styles.title}>Общая оценка</Text>
                    <View style={[tw`w-10 h-10 bg-white rounded-full justify-center items-center`]}>
                        <AntDesign name="star" color="#9C0A35" size={24}/>
                    </View>
                </View>
                <Text style={styles.rating}>{feedback ? feedback.overallRating.toFixed(2) : 0}</Text>
                <View style={styles.stars}>
                    {[...Array(fullStars)].map((_, index) => (
                        <AntDesign name="star" color="white" size={36} key={index}/>
                    ))}
                    {halfStar && <AntDesign name="staro" color="white" size={36}/>}
                    {[...Array(emptyStars)].map((_, index) => (
                        <AntDesign name="staro" color="white" size={36} key={fullStars + index}/>
                    ))}
                </View>
                <Text style={styles.reviewCount}>На основе {feedback?.reviewCount} отзывов</Text>

                <View style={styles.reviewBreakdown}>
                    <BreakdownItem
                        label="Отлично"
                        percentage={feedback ? feedback.great : 0}
                        isSelected={selectedItem === 1}
                        onPress={() => {
                            setSelectedItem(1)
                            if (selectedItem === 1) setSelectedItem(null)
                            getFeedbackClientFilter(setFeedback, selectedClient?.id, 5, page, setIsLoading)
                        }}
                    />
                    <BreakdownItem
                        label="Хорошо"
                        percentage={feedback ? feedback.fine : 0}
                        isSelected={selectedItem === 2}
                        onPress={() => {
                            setSelectedItem(2)
                            if (selectedItem === 2) setSelectedItem(null)
                            getFeedbackClientFilter(setFeedback, selectedClient?.id, 4, page, setIsLoading)
                        }}
                    />
                    <BreakdownItem
                        label="Средне"
                        percentage={feedback ? feedback.average : 0}
                        isSelected={selectedItem === 3}
                        onPress={() => {
                            setSelectedItem(3)
                            if (selectedItem === 3) setSelectedItem(null)
                            getFeedbackClientFilter(setFeedback, selectedClient?.id, 3, page, setIsLoading)
                        }}
                    />
                    <BreakdownItem
                        label="Плохо"
                        percentage={feedback ? feedback.badly : 0}
                        isSelected={selectedItem === 4}
                        onPress={() => {
                            setSelectedItem(4)
                            if (selectedItem === 4) setSelectedItem(null)
                            getFeedbackClientFilter(setFeedback, selectedClient?.id, 2, page, setIsLoading)
                        }}
                    />
                    <BreakdownItem
                        label="Очень плохо"
                        percentage={feedback ? feedback.veryBadly : 0}
                        isSelected={selectedItem === 5}
                        onPress={() => {
                            setSelectedItem(5)
                            if (selectedItem === 5) setSelectedItem(null)
                            getFeedbackClientFilter(setFeedback, selectedClient?.id, 1, page, setIsLoading)
                        }}
                    />
                </View>

                <View style={tw`w-full mt-8`}>
                    {isLoading ? <Loading/> : feedback && (
                        <>
                            <FlatList
                                data={feedback.feedback.object}
                                renderItem={({item}) => (
                                    <ClientFeedbackCard
                                        onPress={() => {
                                            toggleModal()
                                            setOneData(item)
                                        }}
                                        data={item}
                                    />
                                )}
                            />
                            <View style={[tw`flex-row`]}>
                                <TouchableOpacity
                                    disabled={page * 10 === 0}
                                    activeOpacity={.8}
                                    style={[styles.button, {
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        opacity: page * 10 === 0 ? .7 : 1
                                    }]}
                                    onPress={() => handleButtonPress(0)}
                                >
                                    <Text style={tw`text-white font-bold text-base`}>
                                        Назад {page * 10 > 0 ? `${(page * 10) - 10} - ${page * 10}` : ''}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={feedback.feedback.totalElements < 10 || feedback.feedback.totalElements < (page * 10) + 10}
                                    activeOpacity={.8}
                                    style={[styles.button, {
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        opacity: (feedback.feedback.totalElements < 10 || feedback.feedback.totalElements < (page * 10) + 10) ? .7 : 1
                                    }]}
                                    onPress={() => handleButtonPress(1)}
                                >
                                    <Text style={tw`text-white font-bold text-base`}>
                                        Следующий {`${(page * 10) + 10} - ${(page * 10) + 20}`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>

                <BottomModal toggleBottomModal={toggleModal} isBottomModal={isModal}>
                    <>
                        {oneData && (
                            <>
                                <BreakdownItem
                                    label={
                                        oneData.count === 5 ? 'Отлично'
                                            : oneData.count === 4 ? 'Хорошо'
                                                : oneData.count === 3 ? 'Средне'
                                                    : oneData.count === 2 ? 'Плохо' : 'Очень плохо'
                                    }
                                    percentage={
                                        oneData.count === 5 ? 100
                                            : oneData.count === 4 ? 80
                                                : oneData.count === 3 ? 60
                                                    : oneData.count === 2 ? 40 : 20
                                    }
                                    oneStatus={`info`}
                                />
                                <View style={tw`mt-5 w-full`}>
                                    <ClientFeedbackCard data={oneData} oneStatus={`info`}/>
                                </View>
                            </>
                        )}
                    </>
                </BottomModal>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        padding: 10,
        paddingVertical: 16,
        marginVertical: 16,
        backgroundColor: '#9C0A35',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    rating: {
        color: '#fff',
        fontSize: 60,
        fontWeight: 'bold',
    },
    stars: {
        flexDirection: 'row',
        marginVertical: 10,
        gap: 10
    },
    reviewCount: {
        color: '#fff',
        fontSize: 14,
        marginTop: 8
    },
    reviewBreakdown: {
        marginTop: 20,
        width: '100%',
    },
    breakdownLabel: {
        color: '#fff',
        fontSize: 14,
        flex: 1,
    },
    bar: {
        flex: 3,
        height: 10,
        backgroundColor: '#F6D0DB',
        borderRadius: 5,
        overflow: 'hidden',
    },
    filledBar: {
        height: '100%',
        backgroundColor: '#9C0A35',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        padding: 4,
        borderColor: '#9C0A35',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#9C0A35',
    },
});

export default ClientFeedback;
