import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {MaterialIcons} from '@expo/vector-icons';
import {getFile} from "@/helpers/api";
import CenteredModal from "@/components/(modals)/modal-centered";
import React, {useEffect, useState} from "react";
import clientStore from "@/helpers/state_managment/client/clientStore";
import {clientDelete, getClientAll, getClientStatistics, sliceText} from "@/helpers/api-function/client/client";
import ContactInformation from "@/components/contact-information/contact-information";
import {useNavigation} from "@react-navigation/native";

const ClientDetailBasic = ({client}: { client?: any }) => {
    const navigation = useNavigation<any>()
    const {setIsLoading, isLoading, setAllClients, setStatusData} = clientStore()
    const [isClientModalDelete, setIsClientModalDelete] = useState(false)
    const [deleteData, setDeleteData] = useState(false)
    const toggleModalDelete = () => setIsClientModalDelete(!isClientModalDelete)

    useEffect(() => {
        if (deleteData) {
            getClientAll(setAllClients)
            getClientStatistics(setStatusData)
            navigation.navigate('(free)/(client)/main')
            setDeleteData(false)
        }
    }, [deleteData]);

    return (
        <>
            <View style={[tw`w-full flex-row justify-start items-center mb-10`, {gap: 20}]}>
                <Image
                    source={(client && client.attachmentId) ? {uri: `${getFile}${client.attachmentId}`} : require('../../../assets/avatar.png')}
                    style={[tw`rounded-full`, styles.profileImage]}
                />
                <Text style={styles.profileName}>
                    {sliceText(client.firstName, client.lastName)}
                </Text>
            </View>

            <TouchableOpacity
                activeOpacity={.7}
                style={styles.deleteButton}
                onPress={() => {
                    toggleModalDelete();
                }}
            >
                <MaterialIcons name="delete" size={30} color="#9C0A35"/>
                <Text style={styles.deleteButtonText}>Удалить клиента</Text>
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
        color: '#9C0A35',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10
    },
});

export default ClientDetailBasic;
