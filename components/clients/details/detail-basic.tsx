import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import tw from "tailwind-react-native-classnames";
import {MaterialIcons, Feather, Entypo, FontAwesome5, FontAwesome6} from '@expo/vector-icons';
import {getFile} from "@/helpers/api";
import CenteredModal from "@/components/(modals)/modal-centered";
import React, {useState} from "react";
import clientStore from "@/helpers/state_managment/client/clientStore";
import BottomModal from "@/components/(modals)/modal-bottom";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {sliceText} from "@/helpers/api-function/client/client";

const ClientDetailBasic = ({client}: { client?: any }) => {
    const {setIsLoading, isLoading} = clientStore()
    const [isClientModalDelete, setIsClientModalDelete] = useState(false)
    const [bottomModalNetwork, setBottomModalNetwork] = useState(false)
    const [useDefault, setUseDefault] = useState(false);
    const toggleModalDelete = () => setIsClientModalDelete(!isClientModalDelete)
    const toggleBottomModalNetwork = () => setBottomModalNetwork(!bottomModalNetwork)

    const callPhone = () => {
        const url: string = `tel:${client.phoneNumber}`;
        Linking.openURL(url).catch((err) => console.error('Error:', err));
    };

    const goInstagram = () => {
        const url: string = `https://www.instagram.com/${client.instagram}`;
        Linking.openURL(url).catch((err) => console.error('Error:', err));
    };

    const goTelegram = () => {
        const url: string = `https://t.me/${client.telegram}`;
        Linking.openURL(url).catch((err) => console.error('Error:', err));
    };

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

            <Text style={styles.contactTitle}>Контактная информация</Text>
            <View style={styles.contactInfo}>
                <TouchableOpacity
                    onPress={() => toggleBottomModalNetwork()}
                    activeOpacity={.6}
                    style={[styles.contactItem]}
                >
                    <Feather name="phone" size={24} color="#9C0A35"/>
                    <Text style={styles.contactText}>
                        {client ? client.phoneNumber : ''}
                    </Text>
                </TouchableOpacity>
                {client.instagram && (
                    <TouchableOpacity
                        onPress={() => toggleBottomModalNetwork()}
                        activeOpacity={.6}
                        style={[styles.contactItem, {marginTop: 10}]}
                    >
                        <Entypo name="instagram" size={24} color="#9C0A35"/>
                        <Text style={styles.contactText}>{client.instagram}</Text>
                    </TouchableOpacity>
                )}
                {client.telegram && (
                    <TouchableOpacity
                        onPress={() => toggleBottomModalNetwork()}
                        activeOpacity={.6}
                        style={[styles.contactItem, {marginTop: 10}]}
                    >
                        <FontAwesome5 name="telegram-plane" size={24} color="#9C0A35"/>
                        <Text style={styles.contactText}>{client.telegram}</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/*client delete*/}
            <CenteredModal
                btnWhiteText={`Отмена`}
                btnRedText={isLoading ? 'loading...' : `Да`}
                isFullBtn
                isModal={isClientModalDelete}
                toggleModal={() => {
                    toggleModalDelete()
                }}
            >
                <View style={tw`items-center justify-center mb-5`} key={`profile image upload center modal`}>
                    <MaterialIcons name="delete" size={100} color="#9C0A35"/>
                    <Text style={[tw`text-white text-base mt-1 text-center`, {opacity: .8}]}>
                        Вы хотите удалить клиента?
                    </Text>
                </View>
            </CenteredModal>

            {/*networks un*/}
            <BottomModal
                isBottomModal={bottomModalNetwork}
                toggleBottomModal={() => {
                    toggleBottomModalNetwork()
                }}
            >
                <View style={tw`w-full`}>
                    <Text style={styles.modalTitle}>Позвонить через</Text>
                    <View style={[tw`flex-row justify-start items-center mb-6`, {gap: 25}]}>
                        <TouchableOpacity onPress={callPhone} activeOpacity={.7}>
                            <FontAwesome name="phone-square" size={45} color="#45E760"/>
                            <Text style={styles.modalOptionText}>Телефон</Text>
                        </TouchableOpacity>
                        {client.instagram && (
                            <TouchableOpacity onPress={goInstagram} activeOpacity={.7}>
                                <FontAwesome5 name="instagram-square" size={44} color="#9C0A35"/>
                                <Text style={styles.modalOptionText}>Инстаграм</Text>
                            </TouchableOpacity>
                        )}
                        {client.telegram && (
                            <TouchableOpacity onPress={goTelegram} activeOpacity={.7}>
                                <FontAwesome name="telegram" size={42} color="#06BCEE"/>
                                <Text style={styles.modalOptionText}>Телеграм</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.defaultOption}>
                        <TouchableOpacity
                            onPress={() => setUseDefault(!useDefault)}
                            activeOpacity={.7}
                            style={!useDefault && styles.checkbox}
                        >
                            {useDefault && <FontAwesome6 name="square-check" size={27} color="white"/>}
                        </TouchableOpacity>
                        <Text style={[styles.defaultText, tw`${useDefault ? 'ml-2' : ''}`]}>Используй по умолчанию</Text>
                    </View>
                </View>
            </BottomModal>
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
    contactInfo: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    contactTitle: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 16,
        fontWeight: '700'
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactText: {
        color: '#4F4F4F',
        marginLeft: 12,
        fontSize: 16
    },
    modalTitle: {
        color: '#FFF',
        opacity: .7,
        fontSize: 18,
        marginBottom: 20
    },
    modalOptions: {
        marginBottom: 24,
    },
    modalOptionText: {
        color: '#FFF',
        marginTop: 5,
    },
    defaultOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#FFF',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    defaultText: {
        color: '#FFF',
    },
});

export default ClientDetailBasic;
