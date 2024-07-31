import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from "@expo/vector-icons";
import ReviewCard from "@/components/(cliendCard)/riewCard";
import axios from "axios";
import {getConfig} from "@/app/(tabs)/(master)/main";
import {client_feedback} from "@/helpers/api";
import {useFocusEffect} from "expo-router";
import clientStore from "@/helpers/state_managment/client/clientStore";

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

const BreakdownItem = ({ label, percentage }: { label: string, percentage: number }) => {
    return (
        <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>{label}</Text>
            <View style={styles.bar}>
                <View style={[styles.filledBar, { width: `${percentage}%` }]} />
            </View>
        </View>
    );
};

const ClientFeedback = () => {
    const {isLoading, setIsLoading} = clientStore()
    const [feedback, setFeedback] = useState<FeedBack | null>(null)
    const [page, setPage] = useState(0)
    const maxStars = 5;
    const fullStars = Math.floor(feedback ? feedback.overallRating : 0);
    const halfStar = feedback ? feedback.overallRating : 0 - fullStars >= 0.5;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    useFocusEffect(useCallback(() => {
        getFeedbackClientList(setFeedback, 'accec2c2-a471-4da8-ad26-812b83d2b103', page, setIsLoading)
    }, []))

    useFocusEffect(useCallback(() => {
        getFeedbackClientList(setFeedback, 'accec2c2-a471-4da8-ad26-812b83d2b103', page, setIsLoading)
    }, [page]))

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
                <Text style={styles.rating}>{feedback ? feedback.overallRating : 0}</Text>
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
                    <BreakdownItem label="Отлично" percentage={feedback ? feedback.great : 0}/>
                    <BreakdownItem label="Хорошо" percentage={feedback ? feedback.fine : 0}/>
                    <BreakdownItem label="Средне" percentage={feedback ? feedback.average : 0}/>
                    <BreakdownItem label="Плохо" percentage={feedback ? feedback.badly : 0}/>
                    <BreakdownItem label="Очень плохо" percentage={feedback ? feedback.veryBadly : 0}/>
                </View>

                {/*<ReviewCard/>*/}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
    breakdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
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
});

export default ClientFeedback;
