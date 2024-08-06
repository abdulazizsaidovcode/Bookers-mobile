import {Image, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Feather, MaterialIcons} from '@expo/vector-icons';
import {getFile} from "@/helpers/api";
import CenteredModal from "@/components/(modals)/modal-centered";
import React, {useCallback, useEffect, useState} from "react";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {clientDelete, getClientAll, getClientStatistics, sliceText} from "@/helpers/api-function/client/client";
import ContactInformation from "@/components/contact-information/contact-information";
import {useNavigation} from "@react-navigation/native";
import {useFocusEffect} from "expo-router";
import {getMasterTariff} from "@/constants/storage";
import FiltersButton from "@/components/(buttons)/filters-button";
import SwitchWithLabel from "@/components/switchWithLabel/switchWithLabel";

const ClientDetailBasic = ({client}: { client?: any }) => {
    const navigation = useNavigation<any>()
    const {setIsLoading, isLoading, setAllClients, setStatusData, tariff} = clientStore()
    const [isClientModalDelete, setIsClientModalDelete] = useState(false)
    const [deleteData, setDeleteData] = useState(false)
    const [isSwitch, setIsSwitch] = useState(true)
    const toggleModalDelete = () => setIsClientModalDelete(!isClientModalDelete)

    useEffect(() => {
        if (deleteData) {
            if (tariff === 'FREE') navigation.navigate('(free)/(client)/main')
            else navigation.navigate('(standart)/client/standard-main')
            getClientAll(setAllClients)
            getClientStatistics(setStatusData)
            setDeleteData(false)
        }
    }, [deleteData]);

    const toggleSwitch = () => setIsSwitch(!isSwitch)

    return (
        <>
            <View style={[tw`w-full flex-row justify-start items-center mb-10`, {gap: 20}]}>
                <Image
                    source={(client && client.attachmentId) ? {uri: `${getFile}${client.attachmentId}`} : require('../../../assets/avatar.png')}
                    style={[tw`rounded-full`, styles.profileImage]}
                />
                <View style={tw`flex-column`}>
                    <Text style={styles.profileName}>
                        {sliceText(client.firstName, client.lastName)}
                    </Text>

                    {tariff === 'STANDARD' && (
                        <View style={{alignSelf: 'flex-start', marginTop: 5}}>
                            <FiltersButton
                                title={`client`}
                                isDisebled={false}
                                backgroundColor={`#00A1D3`}
                                textColor={`white`}
                            />
                        </View>
                    )}
                </View>
            </View>

            {tariff === 'STANDARD' && (
                <TouchableOpacity
                    activeOpacity={.8}
                    style={[styles.deleteButton, tw`items-center justify-between`]}
                >
                    <View style={tw`flex-row items-center justify-start`}>
                        <Feather name="check-circle" size={30} color="#9C0A35"/>
                        <Text style={[styles.deleteButtonText, {color: 'black', fontWeight: 900}]}>Сделать VIP</Text>
                    </View>
                    <Switch
                        style={{transform: 'scale(1.3)'}}
                        trackColor={{false: "#767577", true: "#9C0A35"}}
                        thumbColor={isSwitch ? "#FFFFFF" : "#FFFFFF"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitch()}
                        value={isSwitch}
                    />
                </TouchableOpacity>
            )}
            <TouchableOpacity
                activeOpacity={.7}
                style={styles.deleteButton}
                onPress={() => {
                    toggleModalDelete();
                }}
            >
                <MaterialIcons name="delete" size={30} color="#9C0A35"/>
                <Text style={[styles.deleteButtonText, {color: '#9C0A35'}]}>Удалить клиента</Text>
            </TouchableOpacity>

            {/*contact info*/}
            <ContactInformation/>

            {/*client delete*/}
            <CenteredModal
                btnWhiteText={`Отмена`}
                btnRedText={isLoading ? 'loading...' : `Да`}
                isFullBtn
                isModal={isClientModalDelete}
                toggleModal={() => toggleModalDelete()}
                onConfirm={() => clientDelete(client.id, setDeleteData, setIsLoading)}
            >
                <View style={tw`items-center justify-center mb-5`} key={`profile image upload center modal`}>
                    <MaterialIcons name="delete" size={100} color="#9C0A35"/>
                    <Text style={[tw`text-white text-base mt-1 text-center`, {opacity: .8}]}>
                        Вы хотите удалить клиента?
                    </Text>
                </View>
            </CenteredModal>
        </>
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: 70,
        height: 70
    },
    profileName: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    deleteButton: {
        flexDirection: 'row',
        backgroundColor: '#B9B9C9',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 24,
    },
    deleteButtonText: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10
    },
});

export default ClientDetailBasic;
