import React, {useEffect, useState} from 'react';
import tw from "tailwind-react-native-classnames";
import {FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, View} from "react-native";
import NavigationMenu from "@/components/navigation/navigation-menu";
import LocationInput from "@/components/(location)/locationInput";
import {
    addClientSMS,
    getClientStatistics,
    getClientStoppedVisitSearch,
    getStoppedVisiting
} from "@/helpers/api-function/client/client";
import {FromAddressBookList} from "@/components/clients/client-items";
import IconsButtons from "@/components/(buttons)/icon-btn";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "@/type/root";
import CenteredModal from "@/components/(modals)/modal-centered";

type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, '(standart)/client/stopped-visiting'>;

const StoppedVisiting = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const {setClientStoppedVisit, clientStoppedVisiting, setStatusData, setIsLoading, isLoading} = clientStore()
    const [clientID, setClientID] = useState('')
    const [clientVal, setClientVal] = useState('')
    const [isClientModal, setIsClientModal] = useState<boolean>(false)
    const [trues, setTrues] = useState<boolean>(false)
    const [height, setHeight] = useState(80);

    useEffect(() => {
        getStoppedVisiting(setClientStoppedVisit)
    }, []);

    useEffect(() => {
        if (trues) {
            toggleClientModal()
            navigation.navigate('(standart)/client/standard-main')
            getClientStatistics(setStatusData)
            setTrues(false)
        }
    }, [trues]);

    const toggleClientModal = () => setIsClientModal(!isClientModal);

    const handleContentSizeChange = (event: any) => {
        const newHeight = Math.min(Math.max(80, event.nativeEvent.contentSize.height), 200);
        setHeight(newHeight);
    };

    return (
        <SafeAreaView style={[tw`flex-1`, {backgroundColor: '#21212E'}]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`}/>
            <NavigationMenu name={`Не посещали`} clicks={() => navigation.navigate('(standart)/client/standard-main')}/>
            <View style={tw`flex-1`}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between'}}
                >
                    <View>
                        <View style={tw`mb-5`}>
                            <LocationInput
                                onChangeText={(e) => getClientStoppedVisitSearch(setClientStoppedVisit, e)}
                                placeholder={`🔍 Поиск клиента по имени`}
                            />
                        </View>
                        {clientStoppedVisiting ? (
                            <FlatList
                                data={clientStoppedVisiting}
                                renderItem={({item}) => (
                                    <FromAddressBookList
                                        key={item.id}
                                        client={item}
                                        isBtn
                                        clicks={() => {
                                            setClientID(item.id);
                                            toggleClientModal()
                                        }}
                                    />
                                )}
                            />
                        ) : (
                            <View style={tw`flex-1 items-center justify-center`}>
                                <Text style={[tw`text-base font-medium`, {color: '#828282', letterSpacing: 1}]}>
                                    У вас пока нет ни одного клиента
                                </Text>
                            </View>
                        )}

                        <CenteredModal
                            btnWhiteText={`Закрыть`}
                            btnRedText={`${isLoading ? 'loading...' : 'Отправить'}`}
                            isFullBtn
                            isModal={isClientModal}
                            toggleModal={toggleClientModal}
                            onConfirm={() => {
                                isLoading ? console.log('malumot tuliqmas...') : addClientSMS(clientID, clientVal, setTrues, setIsLoading)
                            }}
                        >
                            <View>
                                <Text style={[tw`text-lg font-semibold text-white text-center mb-5`, {opacity: .8}]}>
                                    Приглашение на запись!
                                </Text>
                                <TextInput
                                    value={clientVal}
                                    style={[styles.textArea, {height}]}
                                    multiline
                                    placeholder="Ваш текст здесь..."
                                    onContentSizeChange={handleContentSizeChange}
                                    onChangeText={e => setClientVal(e)}
                                />
                            </View>
                        </CenteredModal>
                    </View>

                    <View style={tw`pb-5`}>
                        <IconsButtons
                            name={`Создать`}
                            icon={<Ionicons name="add-circle-outline" size={36} color="white"/>}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textArea: {
        width: 300,
        padding: 10,
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#4B4B64',
        color: '#E0E0E0',
        fontSize: 16,
        textAlignVertical: 'top', // Align text to the top
    },
});

export default StoppedVisiting;