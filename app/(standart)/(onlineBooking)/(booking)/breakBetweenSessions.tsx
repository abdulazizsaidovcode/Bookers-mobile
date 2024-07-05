import React, { useState } from "react";
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Modal,
    FlatList,
} from "react-native";
import { router } from "expo-router";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import { MaterialIcons } from '@expo/vector-icons';

const BreakBetweenSession = () => {
    const [selectedTime, setSelectedTime] = useState("");
    const [activeButton, setActiveButton] = useState("everyService");
    const [modalVisible, setModalVisible] = useState(false);
    const [hour, setHour] = useState("1 ч.");
    const [minute, setMinute] = useState("45 мин.");

    const hours = ["1 ч.", "2 ч.", "3 ч.", "4 ч.", "5 ч."];
    const minutes = ["5 мин.", "10 мин.", "15 мин.", "30 мин.", "45 мин.", "50 мин.", "55 мин.", "60 мин."];

    const saveSettings = () => {
        console.log("Selected Time:", `${hour} ${minute}`);
        router.push("/category");
    };

    const renderItem = ({ item, onPress, isActive }) => (
        <TouchableOpacity onPress={onPress} style={[styles.modalItem, isActive && styles.activeItem]}>
            <Text style={[styles.modalItemText, isActive && styles.activeItemText]}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name="Онлайн бронирование" />
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <View>
                        <ScrollView
                            horizontal
                            contentContainerStyle={styles.horizontalScroll}
                            showsHorizontalScrollIndicator={false}
                        >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.button,
                                    activeButton === "everyService" && styles.activeButton,
                                ]}
                                onPress={() => setActiveButton("everyService")}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        activeButton === "everyService" && styles.activeButtonText,
                                    ]}
                                >
                                    После любой услуги
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.button,
                                    activeButton === "eachProcedure" && styles.activeButton,
                                ]}
                                onPress={() => setActiveButton("eachProcedure")}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        activeButton === "eachProcedure" && styles.activeButtonText,
                                    ]}
                                >
                                    Для каждой процедуры разный
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Перерывы между сеансами</Text>
                            <Text style={styles.sectionSubtitle}>
                                Настройте перерывы между сеансами
                            </Text>
                        </View>
                        {activeButton === "eachProcedure" ? (
                            <View>
                                <View style={styles.procedureContainer}>
                                    <Text style={styles.procedureTitle}>Стрижка, укладка</Text>
                                    <Text style={styles.procedurePrice}>350 000 сум</Text>
                                    <TouchableOpacity
                                        style={styles.selectButton}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <View style={styles.timeContainer}>
                                            <Text style={styles.selectButtonText}>{`${hour} ${minute}`}</Text>
                                            <MaterialIcons name="access-time" size={24} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.procedureContainer}>
                                    <Text style={styles.procedureTitle}>
                                        Стрижка, укладка, покраска
                                    </Text>
                                    <Text style={styles.procedurePrice}>500 000 сум</Text>
                                    <TouchableOpacity
                                        style={styles.selectButton}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <View style={styles.timeContainer}>
                                            <Text style={styles.selectButtonText}>{`${hour} ${minute}`}</Text>
                                            <MaterialIcons name="access-time" size={24} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => setModalVisible(true)}
                            >
                                <View style={styles.timeContainer}>
                                    <Text style={styles.selectButtonText}>{`${hour} ${minute}`}</Text>
                                    <MaterialIcons name="access-time" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Buttons isDisabled={false} title="Сохранить" onPress={saveSettings} />
                    </View>
                </ScrollView>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalColumn}>
                            <FlatList
                                data={hours}
                                renderItem={({ item }) =>
                                    renderItem({
                                        item,
                                        onPress: () => setHour(item),
                                        isActive: item === hour,
                                    })
                                }
                                keyExtractor={(item) => item}
                                showsVerticalScrollIndicator={false}
                                style={styles.flatList}
                            />
                        </View>
                        <View style={styles.modalColumn}>
                            <FlatList
                                data={minutes}
                                renderItem={({ item }) =>
                                    renderItem({
                                        item,
                                        onPress: () => setMinute(item),
                                        isActive: item === minute,
                                    })
                                }
                                keyExtractor={(item) => item}
                                showsVerticalScrollIndicator={false}
                                style={styles.flatList}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.selectButtonModal}
                        onPress={() => {
                            setModalVisible(false);
                            setSelectedTime(`${hour} ${minute}`);
                        }}
                    >
                        <Text style={styles.selectButtonTextModal}>Выбрать</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 6,
        backgroundColor: "#21212E",
    },
    content: {
        flex: 1,
        backgroundColor: "#21212E",
    },
    scrollViewContent: {
        paddingHorizontal: 16,
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "#21212E",
    },
    horizontalScroll: {
        flexDirection: "row",
        gap: 16,
        marginTop: 15,
        marginBottom: 5,
    },
    button: {
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#4B4B64",
    },
    activeButton: {
        backgroundColor: "#9C0A35",
    },
    buttonText: {
        color: "#828282",
    },
    activeButtonText: {
        color: "white",
    },
    section: {
        marginBottom: 3,
    },
    sectionTitle: {
        color: "white",
        fontSize: 18,
    },
    sectionSubtitle: {
        color: "gray",
        marginBottom: 10,
    },
    selectButton: {
        backgroundColor: "#4B4B64",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    selectButtonText: {
        color: "white",
        fontSize: 18,
    },
    buttonContainer: {
        marginBottom: 5,
        backgroundColor: "#21212E",
        justifyContent: "flex-end",
    },
    procedureContainer: {
        backgroundColor: "#4B4B64",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    procedureTitle: {
        color: "white",
        fontSize: 16,
    },
    procedurePrice: {
        color: "#FF5733",
        fontSize: 14,
        marginBottom: 10,
    },
    modalView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        flexDirection: "row",
        backgroundColor: "#21212E",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        padding: 20,
        justifyContent: "space-around",
    },
    modalColumn: {
        flex: 1,
        alignItems: "center",
    },
    modalItem: {
        color: "gray",
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: "center",
    },
    activeItem: {
        backgroundColor: "#9C0A35",
        borderRadius: 8,
    },
    modalItemText: {
        color: "white",
    },
    activeItemText: {
        color: "white",
    },
    flatList: {
        maxHeight: 200,
        width: '100%',
    },
    selectButtonModal: {
        backgroundColor: "#9C0A35",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "90%",
        marginTop: 10,
        marginBottom: 20,
    },
    selectButtonTextModal: {
        color: "white",
        fontSize: 18,
    },
});

export default BreakBetweenSession;
