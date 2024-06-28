import {View, ScrollView, StatusBar, Text} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {SafeAreaView} from "react-native-safe-area-context";
import NavigationMenu from "@/components/navigation/navigation-menu";
import {Ionicons} from '@expo/vector-icons';
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

type CreatingClientScreenRouteProp = RouteProp<RootStackParamList, '(free)/(free)/(client)/details/detail-main'>;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(free)/(client)/details/detail-main'>;

const DetailMain = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const route = useRoute<CreatingClientScreenRouteProp>();
    const {infoClient} = route.params;
    const {isLoading, setIsLoading} = clientStore()
    const [bottomModalSMS, setBottomModalSMS] = useState(false)
    const [messageVal, setMessageVal] = useState('')

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
                        <View style={[tw`mt-4`, {alignSelf: 'flex-start'}]}>
                            <ClientsBtn
                                name={`Все`}
                                countOrIcon
                                icon={<Ionicons name="person-circle-outline" size={30} color="white"/>}
                            />
                        </View>
                        <View>
                            <ClientDetailBasic client={infoClient}/>
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
                    <View style={[tw`pb-5`, {gap: 10}]}>
                        <Buttons title={`Написать сообщение`} onPress={toggleBottomModalSMS}/>
                        <Buttons title={`Записать`}/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default DetailMain;
