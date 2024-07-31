import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {AntDesign} from "@expo/vector-icons";
import ReviewCard from "@/components/(cliendCard)/riewCard";
import axios from "axios";
import {getConfig} from "@/app/(tabs)/(master)/main";
import {client_feedback} from "@/helpers/api";

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

const BreakdownItem = ({label, percentage}: { label: string, percentage: number }) => (
    <View style={styles.breakdownItem}>
        <Text style={styles.breakdownLabel}>{label}</Text>
        <View style={styles.bar}>
            <View style={[styles.filledBar, {width: `${percentage}%`}]}/>
        </View>
    </View>
);

const ClientFeedback = () => {
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
                <Text style={styles.rating}>3.9</Text>
                <View style={styles.stars}>
                    {[...Array(4)].map((_, index) => (
                        <AntDesign name="star" color="white" size={36} key={index}/>
                    ))}
                    <AntDesign name="staro" color="white" size={36}/>
                </View>
                <Text style={styles.reviewCount}>На основе 20 отзывов</Text>

                <View style={styles.reviewBreakdown}>
                    <BreakdownItem label="Отлично" percentage={100}/>
                    <BreakdownItem label="Хорошо" percentage={80}/>
                    <BreakdownItem label="Средне" percentage={60}/>
                    <BreakdownItem label="Плохо" percentage={40}/>
                    <BreakdownItem label="Очень плохо" percentage={20}/>
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
