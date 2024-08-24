import { Text, View } from "@/components/Themed";
import React, { useCallback, useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Pressable,
    StyleSheet,
    Dimensions,
    TouchableOpacity, FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import { getNumbers, putNumbers } from "@/helpers/api-function/numberSittings/numbersetting";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import Buttons from "@/components/(buttons)/button";
import * as SecureStore from "expo-secure-store";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { getFile } from "@/helpers/api";
import { getTariffMaster } from "@/app/(profile)/(tariff)/tariff";
import { setMasterTariff } from "@/constants/storage";
import tw from "tailwind-react-native-classnames";
import CenteredModal from "@/components/(modals)/modal-centered";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, "(welcome)/welcome">;

const Welcome = () => {
    const { number, setNumber, setIsWaitModal } = numberSettingStore();
    const { getMee, setGetMee, iconName, modalText, isOpenModal, setIsOpenModal } = useGetMeeStore();
    const navigation = useNavigation<SettingsScreenNavigationProp | any>();
    const [getTariffStatus, setGetTariffStatus] = useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
            const fetchUserAndTariff = async () => {
                await getUser(setGetMee);
                const tariffStatus: any = await getTariffMaster(setGetTariffStatus);
                setGetTariffStatus(tariffStatus);
            };
            fetchUserAndTariff();

            if (number.length < 0 || number.length === 0) putNumbers(1, () => getNumbers(setNumber));
            return;
        }, [])
    );

    useEffect(() => {
        if (getTariffStatus) setMasterTariff(getTariffStatus);
    }, [getTariffStatus]);

    const closeModal = () => {
        setIsOpenModal(false);
    }
    const removeDuplicates = (array: any) => {
        return [...new Set(array)];
    };

    const uniqueNumbers = removeDuplicates(number);

    const containsAllNumbers = (array: any) => {
        const requiredNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
        return requiredNumbers.every(num => array.includes(num));
    };

    const registered = async () => {
        await SecureStore.setItemAsync('isCreate', 'true');
        await SecureStore.setItemAsync("tariff", 'all');
    };

    const data = [
        {
            title: "Услуги",
            description: "Настройте свои услуги",
            icon: <Feather name="check-circle" size={24} color="white" />,
            onPress: () => navigation.navigate("(standart)/(services)/(gender)/servesGender"),
        },
        {
            title: "График работы",
            description: "Настройте своё рабочее время",
            icon: <FontAwesome5 name="calendar" size={24} color="white" />,
            onPress: () => navigation.navigate("(free)/(work-grafic)/workGraffic"),
        },
        {
            title: "Локация",
            description: "Настройте локацию Вашего места работы",
            icon: <Entypo name="location" size={24} color="white" />,
            onPress: () => router.push("../(location)/Location"),
        },
        {
            title: "Галерея",
            description: "Создайте галерею своих работ",
            icon: <MaterialIcons name="photo" size={24} color="white" />,
            onPress: () => navigation.navigate("(settings)/(settings-gallery)/settings-gallery-main"),
        },
        {
            title: "Онлайн бронирование",
            description: "Настройте записи на Ваши услуги",
            icon: <FontAwesome6 name="calendar-plus" size={24} color="white" />,
            onPress: () => navigation.navigate("(standart)/(onlineBooking)/onlineBooking"),
        },
        // {
        //     title: "Уведомления",
        //     description: "Настройте уведомления",
        //     icon: <Ionicons name="notifications-outline" size={24} color="white"/>,
        //     onPress: () => navigation.navigate("(notifications)/notifications"),
        // },
        {
            title: "Клиенты",
            description: "Добавьте своих клинетов",
            icon: <Fontisto name="persons" size={24} color="white" />,
            onPress: () => navigation.navigate(`(standart)/client/standard-main`),
        },
        // {
        //     title: "Помощь",
        //     description: "Ознакомьтесь с документацией сервиса",
        //     icon: <AntDesign name="questioncircleo" size={24} color="white"/>,
        //     onPress: () => navigation.navigate("(profile)/(help)/help"),
        // },
    ];

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        const isEnabled = number.includes(index + 1);
        const checkNumber = number.length > 0 ? number.length - 1 : 0;

        const checkStatus = () => {
            if (number.length === 6) return 'FULL'
            else if (checkNumber <= index) {
                if (number.length === index + 1) return 'NOW'
            } else return 'FINISHED'
        }

        return (
            <Pressable
                onPress={item.onPress}
                key={index}
                disabled={!isEnabled}
                style={({ pressed }) => [styles.pressable, { opacity: pressed ? .9 : isEnabled ? 1 : 0.65 },]}
            >
                <View style={[
                    styles.button,
                    checkStatus() === 'NOW' ? styles.shadow : {},
                    { backgroundColor: checkStatus() === 'NOW' ? '#fff' : "#B9B9C9", position: 'relative' }
                ]}>
                    {checkStatus() === 'FINISHED' && (
                        <View style={[tw`absolute top-0 left-0 w-7 h-7 rounded-sm justify-center items-center`, { backgroundColor: '#9C0A35' }]}>
                            <Entypo name="check" size={20} color="white" />
                        </View>
                    )}
                    <View style={styles.iconContainer}>
                        <View style={styles.iconBackground}>{item.icon}</View>
                    </View>
                    <Text
                        style={styles.buttonTitle}>{item.title}</Text>
                    <Text style={isEnabled ? styles.buttonDescription : styles.buttonDescription2}>
                        {(number.includes(index + 1) && checkStatus() === 'FINISHED') ? 'Настроено!' : item.description}
                    </Text>
                </View>
            </Pressable>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollView, { paddingBottom: 16 }]}
            >
                <View style={styles.progressBar}>
                    {[...Array(6)].map((_, index) => (
                        <View
                            key={index}
                            style={
                                number.includes(index + 1)
                                    ? styles.progressIndicator
                                    : styles.progressSegment
                            }
                        />
                    ))}
                </View>
                <View style={[styles.centeredView, { marginBottom: 20 }]}>
                    <Text style={styles.welcomeText}>Добро пожаловать!</Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.profileImage}
                            source={getMee.attachmentId ? { uri: `${getFile}${getMee.attachmentId}` } : { uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s` }}
                        />
                        <View style={styles.editIconContainer}>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                navigation.navigate("(profile)/(settings)/(childSettings)/(profileEdit)/profileEdit")
                            }}>
                                <MaterialIcons name="edit" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.profileName}>
                        {getMee.firstName} {getMee.lastName}
                    </Text>
                    {/*<View style={styles.infoContainer}>*/}
                    {/*    <Text style={styles.infoText}>*/}
                    {/*        А теперь мы поможем Вам настроить приложение что бы клиенты могли*/}
                    {/*        начать бронировать Ваши услуги.*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                </View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(_, index: any) => index.toString()}
                    numColumns={2}
                />
                {containsAllNumbers(uniqueNumbers) && (
                    <View style={styles.buttonContainer2}>
                        <Buttons title="Вперёд" onPress={() => {
                            navigation.navigate('(tabs)/(master)');
                            registered();
                            setIsWaitModal(true)
                        }} />
                    </View>
                )}
            </ScrollView>
            <CenteredModal isFullBtn={true} btnRedText="Продолжить" btnWhiteText="" oneBtn={true} isModal={isOpenModal} toggleModal={() => closeModal()}>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                        backgroundColor: "#21212E",
                        padding: 15,
                        gap: 10
                    }}
                >
                    <Feather name="check-circle" size={80} color="#9C0A35" />
                    <Text
                        style={{ fontSize: 17, color: '#fff', textAlign: "center" }}
                    >
                       {modalText}
                    </Text>
                </View>
            </CenteredModal>
        </SafeAreaView>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#21212E",
    },
    scrollView: {
        paddingHorizontal: 16,
        flexGrow: 1,
        justifyContent: "flex-start",
        backgroundColor: "#21212E",
    },
    progressBar: {
        backgroundColor: "#1E1E1E",
        flexDirection: "row",
        height: 5,
        marginTop: 40,
        marginBottom: 40,
        borderRadius: 5,
    },
    progressIndicator: {
        flex: 1,
        backgroundColor: "#9C0A35",
        borderRadius: 5,
        marginHorizontal: 1,
    },
    progressSegment: {
        flex: 1,
        backgroundColor: "#8A8A8A",
        borderRadius: 5,
        marginHorizontal: 1,
    },
    centeredView: {
        alignItems: "center",
        backgroundColor: "#21212E",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    imageContainer: {
        backgroundColor: "transparent",
        alignItems: "center",
        marginTop: 20,
        position: "relative",
    },
    profileImage: {
        width: 96,
        height: 96,
        borderRadius: 50,
    },
    editIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: -8,
        right: -8,
        backgroundColor: "#9c0935",
        borderColor: "#21212E",
        borderWidth: 4,
    },
    profileName: {
        fontSize: 24,
        marginTop: 16,
        fontWeight: "bold",
        color: "white",
    },
    infoContainer: {
        padding: 16,
        width: "100%",
        marginTop: 20,
        borderRadius: 24,
        backgroundColor: "#b9b9c9",
    },
    infoText: {
        fontSize: 16,
        textAlign: "center",
        color: "#6e6e6e",
        padding: 8,
    },
    buttonContainer2: {
        width: '100%',
        paddingHorizontal: 12,
        marginVertical: 20,
        backgroundColor: "#21212e",
    },
    pressable: {
        width: screenWidth / 2.2,
        padding: 8,
    },
    button: {
        borderRadius: 24,
        minHeight: screenHeight / 4.3,
        // maxHeight: screenHeight / 4.2,
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 8,
    },
    iconContainer: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    iconBackground: {
        padding: 17,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9C0A35",
    },
    buttonTitle: {
        fontSize: 18,
        color: "black",
        marginTop: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonDescription: {
        fontSize: 14,
        color: "#6e6e6e",
        textAlign: "center",
    },
    buttonDescription2: {
        fontSize: 14,
        color: "#0E0E0E",
        textAlign: "center",
    },
    shadow: {
        shadowColor: "#FFF",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowRadius: 15,
        elevation: 10,
    }
});
