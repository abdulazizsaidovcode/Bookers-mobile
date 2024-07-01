import React from 'react';
import ProfileHistoryCard from "@/components/(cards)/profile-history-card";
import Entypo from "@expo/vector-icons/Entypo";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {HistoryCount} from "@/type/client/client";
import {View} from "react-native";
import AppointmentCard from "@/components/(cards)/appointment-card";

const HistoryMain = ({countData}: {countData: HistoryCount | null}) => {
    return (
        <>
            <ProfileHistoryCard
                name={`Предстоящие записи`}
                icon={<Entypo name="calendar" size={30} color="#9C0A35"/>}
                count={countData ? countData.upcomingSessions : 0}
            />
            <ProfileHistoryCard
                name={`Прошедшие записи`}
                icon={<Entypo name="hour-glass" size={30} color="#9C0A35"/>}
                count={countData ? countData.pastSessions : 0}
            />
            <ProfileHistoryCard
                name={`Отменённые записи`}
                icon={<MaterialCommunityIcons name="cancel" size={30} color="#9C0A35"/>}
                count={countData ? countData.cancelledSessions : 0}
            />
            <View>
                <AppointmentCard />
            </View>
        </>
    );
};

export default HistoryMain;