import React from 'react';
import ProfileHistoryCard from "@/components/(cards)/profile-history-card";
import Entypo from "@expo/vector-icons/Entypo";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {HistoryCount} from "@/type/client/client";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/detail-main'>;

const HistoryMain = ({countData, clientID}: { countData: HistoryCount | null, clientID: string | any }) => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    return (
        <>
            <ProfileHistoryCard
                name={`Предстоящие записи`}
                icon={<Entypo name="calendar" size={30} color="#9C0A35"/>}
                count={countData ? countData.upcomingSessions : 0}
                clicks={() => navigation.navigate('(free)/(client)/details/history/upcoming-history', {clientID})}
            />
            <ProfileHistoryCard
                name={`Прошедшие записи`}
                icon={<Entypo name="hour-glass" size={30} color="#9C0A35"/>}
                count={countData ? countData.pastSessions : 0}
                clicks={() => navigation.navigate('(free)/(client)/details/history/past-history', {clientID})}
            />
            <ProfileHistoryCard
                name={`Отменённые записи`}
                icon={<MaterialCommunityIcons name="cancel" size={30} color="#9C0A35"/>}
                count={countData ? countData.cancelledSessions : 0}
                clicks={() => navigation.navigate('(free)/(client)/details/history/canceled-history', {clientID})}
            />
        </>
    );
};

export default HistoryMain;