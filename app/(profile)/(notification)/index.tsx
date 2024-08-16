import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import NotificationCard from "./card/index";
import axios from "axios";
import { base_url } from "@/helpers/api";
import tw from "tailwind-react-native-classnames";
import BottomModal from "@/components/(modals)/modal-bottom";
import NotificationSelect from "@/helpers/state_managment/notification";
import Buttons from "@/components/(buttons)/button";
import CenteredModal from "@/components/(modals)/modal-centered";
import { getNumbers, putNumbers } from "@/helpers/api-function/numberSittings/numbersetting";
import { getConfig } from "@/app/(tabs)/(master)/main";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";

const Notification: React.FC = () => {
    const { setNumber } = numberSettingStore();
    const navigation = useNavigation<any>();
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [deleteNot, setDeleteNot] = useState([]);
    const { onClose, notification, isModal } = NotificationSelect();

    const getNotification = async () => {
        setisLoading(true);
        try {
            const config = await getConfig();
            const { data } = await axios.get(`${base_url}notification`, config ? config : {});
            if (data.success) {
                setNotifications(data.body.reverse());
            }else {
                setNotifications([]);
            }

        } catch (error) {
            setNotifications([]);

        } finally {
            setisLoading(false);
        }
    };

    const deleteNotification = async () => {
        const deleteData = notifications.map((item: any) => item.id);
        try {
            const config = await getConfig();
            const response = await fetch(`${base_url}notification`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': config ? config.headers.Authorization : '',
                },
                body: JSON.stringify({ notificationIds: deleteData }),
            });
            const responseData = await response.json();
            setDeleteNot(responseData);
            setToggle(false);
        } catch (error) {
            console.error("Error deleting past entries:", error);
        }

        setDeleteNot([]);
    };

    useEffect(() => {
        getNotification();
        console.log(notifications);

    }, [deleteNot]);

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            putNumbers(7, () => getNumbers(setNumber));
                            navigation.goBack();
                        }}
                    >
                        <Feather
                            name="chevron-left"
                            size={30}
                            color="white"
                            onPress={() => navigation.goBack()}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Уведомления</Text>
                    {
                        notifications && notifications.length > 0 ? (
                            <TouchableOpacity onPress={() => setToggle(!toggle)}>
                                <FontAwesome name="trash" size={24} color="#fff" />
                            </TouchableOpacity>
                        ) : (
                            <Text></Text>
                        )}
                </View>
            <View style={styles.padding}>
                {isLoading && <ActivityIndicator size="large" color={"#888"} />}
                {!isLoading && notifications && notifications.length === 0 && (
                    <Text style={tw` text-center text-white mt-10`}>
                        Нет уведомлений
                    </Text>
                )}
                <FlatList
                    data={notifications}
                    renderItem={({ item }) => <NotificationCard item={item} />}
                    keyExtractor={(item: any) => item.id}
                />
            </View>
            <BottomModal isBottomModal={isModal} toggleBottomModal={onClose}>
                <View style={tw`w-full`}>
                    <View>
                        <Text style={tw`text-white text-2xl`}>
                            {notification.title === null ? "Untitled" : notification.title}
                        </Text>
                        <Text style={tw`text-white text-lg mt-5`}>
                            {notification.content}
                        </Text>
                    </View>
                    <View style={tw`mt-5`}>
                        <Buttons title="Попробовать" onPress={onClose} />
                    </View>
                </View>
            </BottomModal>
            <CenteredModal
                isModal={toggle}
                onConfirm={deleteNotification}
                toggleModal={() => setToggle(!toggle)}
                btnWhiteText="Отмена"
                btnRedText="Да"
                isFullBtn={true}
            >
                <>
                    <FontAwesome name="trash" size={80} color="#9c0935" />
                    <Text style={tw`text-white my-5`}>
                        Вы хотите очистить все уведомлении?
                    </Text>
                </>
            </CenteredModal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#21212E",
        padding: 16,
    },
    padding: {
        padding: 16,
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        marginTop: 36,
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
    },
});

export default Notification;
