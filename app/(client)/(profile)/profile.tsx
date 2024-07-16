import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { router, useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/type/root';

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(client)/(profile)/profile"
>;


const ProfilePage: React.FC = () => {
    const [isInviteModalVisible, setInviteModalVisible] = useState(false);
    const [isShareModalVisible, setShareModalVisible] = useState(false);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const openInviteModal = () => {
        setInviteModalVisible(true);
    };

    const closeInviteModal = () => {
        setInviteModalVisible(false);
    };

    const openShareModal = () => {
        setShareModalVisible(true);
    };

    const closeShareModal = () => {
        setShareModalVisible(false);
    };
    return (


        <View style={tw`flex-1 bg-gray-900 p-4`}>
            <View style={tw`flex-row items-center mb-6`}>
                <Image source={{ uri: 'https://picsum.photos/200/300' }} style={tw`w-16 h-16 rounded-full mr-4`} />
                <View>
                    <Text style={tw`text-white text-lg font-bold`}>Лола Ахмедова</Text>
                    <Text style={tw`text-gray-400`}>+998 93 123-45-67</Text>
                </View>
            </View>

            <TouchableOpacity
                style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg mb-2`}
                onPress={openInviteModal}
            >
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="share-alt" size={20} color="#E74C3C" />
                    <Text style={tw`text-white ml-4`}>Поделиться</Text>
                </View>
                <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
            </TouchableOpacity>

            {/* <TouchableOpacity
                style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg mb-2`}
                onPress={() => router.push('/(pages)/(profile)/(payment)/(card_page)/card_page')}
            >
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="credit-card" size={20} color="#E74C3C" />
                    <Text style={tw`text-white ml-4`}>Способы оплаты</Text>
                </View>
                <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
            </TouchableOpacity> */}

            <TouchableOpacity
                style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg mb-2`}
                onPress={() => navigation.navigate('(client)/(profile)/(orderHistory)/orderHistory')}
            >
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="history" size={20} color="#E74C3C" />
                    <Text style={tw`text-white ml-4`}>История записей</Text>
                </View>
                <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
            </TouchableOpacity>

            <TouchableOpacity
                style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg mb-2`}
                onPress={() => navigation.navigate('(client)/(profile)/(profileEdit)/profileEdit')}
            >
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="user" size={20} color="#E74C3C" />
                    <Text style={tw`text-white ml-4`}>Профиль</Text>
                </View>
                <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
            </TouchableOpacity>

            <TouchableOpacity
                style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg mb-2`}
                onPress={() => navigation.navigate('(free)/(help)/help')}
            >
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="info-circle" size={20} color="#E74C3C" />
                    <Text style={tw`text-white ml-4`}>Справка</Text>
                </View>
                <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
            </TouchableOpacity>

            <TouchableOpacity
                style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg mb-2`}
                onPress={() => navigation.navigate('(client)/(profile)/(notification)/notification')}
            >
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="bell" size={20} color="#E74C3C" />
                    <Text style={tw`text-white ml-4`}>Уведомления</Text>
                </View>
                <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
            </TouchableOpacity>

            {/* <TouchableOpacity
                style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg mb-2`}
                onPress={() => navigation.navigate('')}
            >
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="credit-card" size={20} color="#E74C3C" />
                    <Text style={tw`text-white ml-4`}>Карта лояльности</Text>
                </View>
                <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
            </TouchableOpacity> */}

            <TouchableOpacity
                style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg mb-2`}
                onPress={() => navigation.navigate('(client)/(profile)/(settings)/settings')}
            >
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="cogs" size={20} color="#E74C3C" />
                    <Text style={tw`text-white ml-4`}>Настройки</Text>
                </View>
                <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
            </TouchableOpacity>

            <TouchableOpacity
                style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg`}
                // onPress={() => navigation.navigate('')}
            >
                <View style={tw`flex-row items-center`}>
                    <FontAwesome name="sign-out" size={20} color="#E74C3C" />
                    <Text style={tw`text-white ml-4`}>Выйти</Text>
                </View>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={isInviteModalVisible}
                onRequestClose={closeInviteModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={tw`text-white text-lg mb-4`}>Кому вы хотите отправить ссылку?</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                closeInviteModal();
                                openShareModal();
                            }}
                        >
                            <Text style={tw`text-white text-center`}>Пригласить мастеров</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                closeInviteModal();
                                openShareModal();
                            }}
                        >
                            <Text style={tw`text-white text-center`}>Пригласить друзей</Text>
                        </TouchableOpacity>
                        <Button title="Закрыть" onPress={closeInviteModal} color="#E74C3C" />
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={isShareModalVisible}
                onRequestClose={closeShareModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={tw`text-white text-lg mb-4`}>Поделиться</Text>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity style={styles.iconButton}>
                                <FontAwesome name="facebook" size={40} color="#3b5998" />
                                <Text style={tw`text-white mt-2`}>Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <FontAwesome name="telegram" size={40} color="#0088cc" />
                                <Text style={tw`text-white mt-2`}>Telegram</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <FontAwesome name="instagram" size={40} color="#C13584" />
                                <Text style={tw`text-white mt-2`}>Instagram</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <FontAwesome name="linkedin" size={40} color="#0e76a8" />
                                <Text style={tw`text-white mt-2`}>LinkedIn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <FontAwesome name="skype" size={40} color="#00aff0" />
                                <Text style={tw`text-white mt-2`}>Skype</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <FontAwesome name="copy" size={40} color="#E74C3C" />
                                <Text style={tw`text-white mt-2`}>Копировать ссылку</Text>
                            </TouchableOpacity>
                        </View>
                        <Button title="Закрыть" onPress={closeShareModal} color="#E74C3C" />
                    </View>
                </View>
            </Modal>

            {/* Add other profile options here */}
        </View>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButton: {
        backgroundColor: '#E74C3C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    iconButton: {
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default ProfilePage;