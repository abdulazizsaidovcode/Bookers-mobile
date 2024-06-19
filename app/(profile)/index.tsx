import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const ProfilePage: React.FC = ({ navigation }: any) => {
    const [isInviteModalVisible, setInviteModalVisible] = useState(false);
    const [isShareModalVisible, setShareModalVisible] = useState(false);

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

    const navigateTo = (screen: string) => {
        navigation.navigate(screen);
    };
    // eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTE5NTk1NTk5In0.baWTz1u6dafE8Yy9VzDI2Uq_40X7oEcdg4LTxEVqOCO9lno2Rr-fPwPpZ5m6iQUAIohuJVqnx53g1TH0i_jVlA
    return (
        <View style={tw`flex-1 bg-gray-900 p-4`}>
            <View style={tw`flex-row items-center mb-6`}>
                <Image source={{ uri: 'https://picsum.photos/200/300' }} style={tw`w-16 h-16 rounded-full mr-4`} />
                <View>
                    <Text style={tw`text-white text-lg font-bold`}>Гузаль Шерматова</Text>
                    <Text style={tw`text-gray-400`}>+998 93 123-45-67</Text>
                </View>
            </View>

            {[
                { icon: 'user', label: 'Подписка', screen: 'Subscription' },
                { icon: 'history', label: 'История сеансов', screen: 'SessionHistory' },
                { icon: 'info-circle', label: 'Справка', screen: 'Help' },
                { icon: 'bell', label: 'Уведомления', screen: '(profile)/(notification)/index' },
                { icon: 'globe', label: 'Веб страница', screen: 'WebPage' },
                { icon: 'cogs', label: 'Настройки', screen: 'Settings' },
                { icon: 'users', label: 'Клиенты', screen: 'Clients' },
                { icon: 'sign-out', label: 'Выйти', screen: 'Logout' }
            ].map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={tw`flex-row justify-between items-center bg-gray-700 p-4 rounded-lg mb-2`}
                    onPress={() => navigateTo(item.screen)}
                >
                    <View style={tw`flex-row items-center`}>
                        <FontAwesome name={item.icon} size={20} color="#E74C3C" />
                        <Text style={tw`text-white ml-4`}>{item.label}</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={20} color="#E74C3C" />
                </TouchableOpacity>
            ))}

            <Modal transparent={true} visible={isInviteModalVisible} onRequestClose={closeInviteModal}>
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

            <Modal transparent={true} visible={isShareModalVisible} onRequestClose={closeShareModal}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={tw`text-white text-lg mb-4`}>Поделиться</Text>
                        <View style={styles.iconContainer}>
                            {[
                                { name: 'facebook', color: '#3b5998', label: 'Facebook' },
                                { name: 'telegram', color: '#0088cc', label: 'Telegram' },
                                { name: 'instagram', color: '#C13584', label: 'Instagram' },
                                { name: 'linkedin', color: '#0e76a8', label: 'LinkedIn' },
                                { name: 'skype', color: '#00aff0', label: 'Skype' },
                                { name: 'copy', color: '#E74C3C', label: 'Копировать ссылку' }
                            ].map((item, index): any => (
                                <TouchableOpacity key={index} style={styles.iconButton}>
                                    <FontAwesome name={item.name} size={40} color={item.color} />
                                    <Text style={tw`text-white mt-2`}>{item.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Button title="Закрыть" onPress={closeShareModal} color="#E74C3C" />
                    </View>
                </View>
            </Modal>
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
