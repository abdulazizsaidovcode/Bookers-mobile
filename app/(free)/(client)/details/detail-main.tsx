import {View, ScrollView, StatusBar, Text, RefreshControl} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {NavigationProp, useNavigation, useRoute} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import Buttons from "@/components/(buttons)/button";
import ClientDetailBasic from "@/components/clients/details/detail-basic";
import CenteredModal from "@/components/(modals)/modal-centered";
import React, {useCallback, useEffect, useState} from "react";
import clientStore from "@/helpers/state_managment/client/clientStore";
import Textarea from "@/components/select/textarea";
import {addClientMessage, getAgeList, getHistoryCount, getMeClient, getRegionList} from "@/helpers/api-function/client/client";
import FiltersButton from "@/components/(buttons)/filters-button";
import HistoryMain from "@/app/(free)/(client)/details/history/history-main";
import ProfileUpdate from "@/app/(free)/(client)/details/history/profile-update";
import {getMee} from "@/helpers/token";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import {handleRefresh} from "@/constants/refresh";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/detail-main'>;

const DetailMain = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<any>();
    const {infoClient} = route.params;
    const {isLoading, setIsLoading, historyCountData, setHistoryCountData, setAgeData, setRegionData, refreshing, setRefreshing} = clientStore()
    const {setGetMee} = useGetMeeStore()
    const [bottomModalSMS, setBottomModalSMS] = useState(false)
    const [messageVal, setMessageVal] = useState('')
    const [role, setRole] = useState('basics')
    const [clientData, setClientData] = useState<any>(null);

    useEffect(() => {
        getHistoryCount(setHistoryCountData, infoClient.id)
        getMeClient(setClientData, infoClient.id)
        getAgeList(setAgeData)
        getRegionList(setRegionData)
        getMee(setGetMee)
    }, []);

    useEffect(() => {
        if (!isLoading && !bottomModalSMS) setMessageVal('')
    }, [isLoading, bottomModalSMS]);

    const onRefresh = useCallback(() => {
        handleRefresh(setRefreshing);
    }, [setRefreshing]);

    const toggleBottomModalSMS = () => setBottomModalSMS(!bottomModalSMS)

    const handleChange = (e: string) => {
        const trimmedValue = e.trim();
        const regex = /^[a-zA-Z0-9а-яА-ЯёЁ.,!?;:()\s]+$/

        if (regex.test(trimmedValue) && !/\s\s+/.test(e)) setMessageVal(e)
        else if (e === '') setMessageVal('')
    };

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={``}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    <View>
                        <View style={[tw`mt-4 flex-row justify-start items-center mb-10`, {gap: 16}]}>
                            <FiltersButton
                                title={`Основное`}
                                isDisebled={role !== 'basics'}
                                onPress={() => setRole('basics')}
                            />
                            <FiltersButton
                                title={`История`}
                                isDisebled={role !== 'history'}
                                onPress={() => setRole('history')}
                            />
                            <FiltersButton
                                title={`Профиль`}
                                isDisebled={role !== 'profile'}
                                onPress={() => setRole('profile')}
                            />
                        </View>
                        <View>
                            {role === 'basics' && <ClientDetailBasic client={infoClient}/>}
                            {role === 'history' && <HistoryMain countData={historyCountData} clientID={infoClient.id}/>}
                            {role === 'profile' && <ProfileUpdate clientData={clientData}/>}
                        </View>

                        {/*client SMS*/}
                        <CenteredModal
                            btnWhiteText={isLoading ? 'loading...' : `Отправить`}
                            btnRedText={`Закрыть`}
                            isFullBtn={false}
                            isModal={bottomModalSMS}
                            toggleModal={() => {
                                toggleBottomModalSMS()
                                setMessageVal('')
                            }}
                            onConfirm={() => {
                                if (!isLoading) addClientMessage(infoClient.id, messageVal, setIsLoading, toggleBottomModalSMS)
                            }}
                        >
                            <>
                                <Text style={tw`text-center text-white text-lg font-semibold mb-5`}>Написать сообщение</Text>
                                <Textarea
                                    placeholder={`Сообщение`}
                                    value={messageVal}
                                    onChangeText={e => handleChange(e)}
                                />
                            </>
                        </CenteredModal>
                    </View>
                    {role === 'basics' && (
                        <View style={[tw`pb-5`, {gap: 10}]}>
                            <Buttons title={`Написать сообщение`} onPress={toggleBottomModalSMS}/>
                            <Buttons
                                title={`Записать`}
                                onPress={() => navigation.navigate('(free)/(client)/details/records', {record: infoClient})}
                            />
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default DetailMain;
