import {Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Entypo, Feather, FontAwesome5, FontAwesome6} from "@expo/vector-icons";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import React, {useState} from "react";
import BottomModal from "@/components/(modals)/modal-bottom";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ContactInformation = () => {
    const {getMee} = useGetMeeStore()
    const [bottomModalNetwork, setBottomModalNetwork] = useState(false)
    const [useDefault, setUseDefault] = useState(false);

    const toggleBottomModalNetwork = () => setBottomModalNetwork(!bottomModalNetwork)
    const callPhone = () => Linking.openURL(`tel:${getMee.phoneNumber}`).catch((err) => console.error('Error:', err));
    const goInstagram = () => Linking.openURL(`https://www.instagram.com/${getMee.instagram}`).catch((err) => console.error('Error:', err));
    const goTelegram = () => Linking.openURL(`https://t.me/${getMee.telegram}`).catch((err) => console.error('Error:', err));
    return (
        <>
            <Text style={styles.contactTitle}>Контактная информация</Text>
            <View style={styles.contactInfo}>
                {getMee.phoneNumber && (
                    <TouchableOpacity
                        onPress={() => toggleBottomModalNetwork()}
                        activeOpacity={.6}
                        style={[styles.contactItem]}
                    >
                        <Feather name="phone" size={24} color="#9C0A35"/>
                        <Text style={styles.contactText}>
                            {getMee.phoneNumber}
                        </Text>
                    </TouchableOpacity>
                )}
                {getMee.instagram && (
                    <TouchableOpacity
                        onPress={() => toggleBottomModalNetwork()}
                        activeOpacity={.6}
                        style={[styles.contactItem, {marginTop: 10}]}
                    >
                        <Entypo name="instagram" size={24} color="#9C0A35"/>
                        <Text style={styles.contactText}>{getMee.instagram}</Text>
                    </TouchableOpacity>
                )}
                {getMee.telegram && (
                    <TouchableOpacity
                        onPress={() => toggleBottomModalNetwork()}
                        activeOpacity={.6}
                        style={[styles.contactItem, {marginTop: 10}]}
                    >
                        <FontAwesome5 name="telegram-plane" size={24} color="#9C0A35"/>
                        <Text style={styles.contactText}>{getMee.telegram}</Text>
                    </TouchableOpacity>
                )}
            </View>

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
                        {getMee.instagram && (
                            <TouchableOpacity onPress={goInstagram} activeOpacity={.7}>
                                <FontAwesome5 name="instagram-square" size={44} color="#9C0A35"/>
                                <Text style={styles.modalOptionText}>Инстаграм</Text>
                            </TouchableOpacity>
                        )}
                        {getMee.telegram && (
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
})

export default ContactInformation;