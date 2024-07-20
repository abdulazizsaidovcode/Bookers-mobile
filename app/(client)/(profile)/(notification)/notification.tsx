import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import NavigationMenu from "@/components/navigation/navigation-menu";
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomModal from "@/components/(modals)/modal-bottom";
import Buttons from "@/components/(buttons)/button";
import CenteredModal from "@/components/(modals)/modal-centered";
import { clientNotification } from '@/helpers/api-function/client/clientPage';
import { getClientNotififcations } from '@/type/client/editClient';
import { useFocusEffect } from 'expo-router';

const NotificationClient = () => {
    const [isBottomModalVisible, setBottomModalVisible] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [notification, setNotification] = useState<any>([])

    const deleteToggleModal = () => {
        setDeleteModal(!deleteModal)
    }
    const toggleBottomModal = () => {
        setBottomModalVisible(!isBottomModalVisible);
    };
    // useEffect(() => {
    //     clientNotification(setNotification)
    // })
    useFocusEffect(

        useCallback(() => {
            clientNotification(setNotification)
            return () => { }
        }, [])
    )
    return (
        <View style={{ backgroundColor: '#21212E', flex: 1, padding: 10 }}>
            <StatusBar backgroundColor={'#21212E'} barStyle={'light-content'} />
            <View style={styles.headerContainer}>
                <NavigationMenu name={"Уведомления"} />
                <TouchableOpacity onPress={deleteToggleModal}>
                    <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {notification && notification.length !== 0 ? (
                    notification.map((notifications: getClientNotififcations, index: number) => 
                        <TouchableOpacity key={index} style={styles.card} activeOpacity={0.9} onPress={toggleBottomModal}>
                            <View style={styles.header}>
                                <Image
                                    source={require('@/assets/avatar.png')}
                                    style={styles.avatar}
                                />
                                <Text style={styles.title}>{notifications.title}</Text>
                            </View>
                            <Text style={styles.description}>
                                {notifications.content}
                            </Text>
                            <View style={styles.footer}>
                                <Text style={styles.date}>{notifications.createAt}</Text>
                                <AntDesign name="right" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                    )
                ) : (
                    <View style={{marginTop: 100}}>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                        <Text style={{color: 'white'}}>Not found</Text>
                    </View>
                )}

            </ScrollView>
            <BottomModal
                toggleBottomModal={toggleBottomModal}
                isBottomModal={isBottomModalVisible}
            >
                <View style={{ width: '100%' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 10 }}>Отмена
                        бронирования</Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                        textAlign: 'center',
                        color: '#494949',
                        padding: 5,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: '#494949',
                        marginBottom: 10
                    }}>Наращивание 2D ресниц</Text>
                    <Text style={{ color: 'white', marginBottom: 10 }}>Ваша заявка №12 на18 апреля была отменена.
                        Причина в том, что мастер в этот день не будет на работе и отменил ваш заказ. Вы можете
                        перенести заказ на другой день или обратиться к специалисту повторно. Спасибо за
                        понимание.</Text>
                    <Buttons title={'Перейти к заявке'} />
                </View>
            </BottomModal>
            <CenteredModal children={
                <>
                    <AntDesign name="delete" size={56} color="#9C0A35" />
                    <Text style={{ color: '#494949', fontSize: 12, marginVertical: 20 }}>Вы хотите очистить все
                        уведомлении?</Text>
                </>
            } isFullBtn={true} btnWhiteText={'Отмена'} btnRedText={'Да'} isModal={deleteModal} toggleModal={() => {
                deleteToggleModal()
            }} />
        </View>
    );
}

export default NotificationClient;

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    scrollViewContent: {
        paddingBottom: 10,
    },
    card: {
        backgroundColor: '#B9B9C9', // Background rangini moslang
        borderRadius: 10,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    description: {
        color: '#555',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        color: '#888',
        fontSize: 12,
    },
});
