import {View, ScrollView, StatusBar, Text} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import ClientsBtn from "@/components/(buttons)/clients-btn";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import {RouteProp, useRoute} from '@react-navigation/native'
import Buttons from "@/components/(buttons)/button";
import ClientDetailBasic from "@/components/clients/details/detail-basic";
import CenteredModal from "@/components/(modals)/modal-centered";
import React, {useEffect, useState} from "react";
import clientStore from "@/helpers/state_managment/client/clientStore";
import Textarea from "@/components/select/textarea";
import {addClientMessage} from "@/helpers/api-function/client/client";
import FiltersButton from "@/components/(buttons)/filters-button";
import ProfileHistoryCard from "@/components/(cards)/profile-history-card";
import Entypo from "@expo/vector-icons/Entypo";

type CreatingClientScreenRouteProp = RouteProp<RootStackParamList, '(free)/(client)/details/detail-main'>;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/detail-main'>;

const DetailMain = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<CreatingClientScreenRouteProp>();
    const {infoClient} = route.params;
    const {isLoading, setIsLoading} = clientStore()
    const [bottomModalSMS, setBottomModalSMS] = useState(false)
    const [messageVal, setMessageVal] = useState('')
    const [role, setRole] = useState('basics')

    useEffect(() => {
        if (!isLoading && !bottomModalSMS) setMessageVal('')
    }, [isLoading, bottomModalSMS]);

    const toggleBottomModalSMS = () => setBottomModalSMS(!bottomModalSMS)

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={``}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    <View>
                        <View style={[tw`mt-4 flex-row justify-start items-center mb-10`, {gap: 16}]}>
                            <FiltersButton
                                title={`Основное`}
                                isDisebled={role !== 'basics' ? true : false}
                                onPress={() => setRole('basics')}
                            />
                            <FiltersButton
                                title={`История`}
                                isDisebled={role !== 'history' ? true : false}
                                onPress={() => setRole('history')}
                            />
                            <FiltersButton
                                title={`Профиль`}
                                isDisebled={role !== 'profile' ? true : false}
                                onPress={() => setRole('profile')}
                            />
                        </View>
                        <View>
                            {role === 'basics' && <ClientDetailBasic client={infoClient}/>}
                            {role === 'history' && (
                                <>
                                    <ProfileHistoryCard
                                        name={`Предстоящие записи`}
                                        icon={<Entypo name="calendar" size={30} color="#9C0A35"/>}
                                        count={0}
                                    />
                                    <ProfileHistoryCard
                                        name={`Прошедшие записи`}
                                        icon={<Entypo name="hour-glass" size={30} color="#9C0A35"/>}
                                        count={0}
                                    />
                                    <ProfileHistoryCard
                                        name={`Отменённые записи`}
                                        icon={<MaterialCommunityIcons name="cancel" size={30} color="#9C0A35"/>}
                                        count={0}
                                    />
                                </>
                            )}
                            {role === 'profile' && ''}
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
                                    onChangeText={e => setMessageVal(e)}
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
