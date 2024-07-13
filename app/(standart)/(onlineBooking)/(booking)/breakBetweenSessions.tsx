import React, { useEffect, useState } from "react";
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
import { router, useNavigation } from "expo-router";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Buttons from "@/components/(buttons)/button";
import { MaterialIcons } from "@expo/vector-icons";
import {
  OnlineBookingUserviceTimeAll,
  OnlineBookingUserviceTimeService,
} from "@/helpers/api-function/onlineBooking/onlineBooking";
import { fetchServices } from "@/helpers/api-function/client/client";
import clientStore from "@/helpers/state_managment/client/clientStore";
import axios from "axios";
import { master_service_list } from "@/helpers/api";
import { config } from "@/helpers/token";
// import { OnlineBookingCheck } from "@/helpers/state_managment/onlinBooking/onlineBooking";
import isRegister from "@/helpers/state_managment/isRegister/isRegister";

const BreakBetweenSession = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [activeButton, setActiveButton] = useState("everyService");
  const [modalVisible, setModalVisible] = useState(false);
  const [hour, setHour] = useState("0 ч.");
  const [minute, setMinute] = useState("0 мин.");
  const [servicesId, setServicesId] = useState("");
  const navigation = useNavigation<any>();
  const { services, setServices } = clientStore();

  const hours = [
    { title: "0 ч.", minutes: ["0 мин.", "30 мин."] },
    { title: "1 ч.", minutes: ["0 мин.", "30 мин."] },
    { title: "2 ч.", minutes: ["0 мин.", "15 мин.", "30 мин.", "45 мин."] },
  ];

  const renderItem = ({ item, onPress, isActive }: any) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.modalItem, isActive && styles.activeItem]}
    >
      <Text style={[styles.modalItemText, isActive && styles.activeItemText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handleHourPress = (selectedHour: any) => {
    setHour(selectedHour);
    setMinute(hours && hours.find((h) => h.title === selectedHour).minutes[0]);
  };

  const postTile = () => {
    let obg = {
      hour: hour.split(" ")[0],
      minute: minute.slice(0, 2),
    };
    let obgser = {
      serviceId: servicesId,
      hour: hour.split(" ")[0],
      minute: minute.slice(0, 2),
    };
    if (servicesId) {
      OnlineBookingUserviceTimeService(obgser);
    } else {
      OnlineBookingUserviceTimeAll(obg);
    }
    // setConfirmation(false);
    navigation.goBack();
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get(master_service_list, config)
      .then((res) => setServices(res.data.body))
      .catch((err) => console.error(err));
  };

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
                onPress={() => {
                  setServicesId("");
                  setActiveButton("everyService");
                }}
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
                onPress={() => {
                  setServicesId("");
                  setActiveButton("eachProcedure");
                }}
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
                {services &&
                  services.map((service: any, index: number) => (
                    <View style={styles.procedureContainer}>
                      <Text style={styles.procedureTitle}>
                        {service.category.name}
                      </Text>
                      <Text style={styles.procedurePrice}>{service.price}</Text>
                      <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => {
                          setModalVisible(true);
                          setServicesId(service.id);
                        }}
                      >
                        <View style={styles.timeContainer}>
                          <Text style={styles.selectButtonText}>
                            {" "}
                            {`${
                              servicesId !== service.id
                                ? Math.floor(service.serviceTime / 60)
                                : hour
                            } час .  ${
                              servicesId !== service.id
                                ? service.serviceTime % 60
                                : minute
                            } мин`}
                          </Text>
                          <MaterialIcons
                            name="access-time"
                            size={24}
                            color="white"
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setModalVisible(true)}
              >
                <View style={styles.timeContainer}>
                  <Text
                    style={styles.selectButtonText}
                  >{`${hour} ${minute}`}</Text>
                  <MaterialIcons name="access-time" size={24} color="white" />
                </View>
              </TouchableOpacity>
            )}
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
                data={hours.map((h) => h.title)}
                renderItem={({ item }) =>
                  renderItem({
                    item,
                    onPress: () => handleHourPress(item),
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
                data={hours.find((h) => h.title === hour)?.minutes || []}
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
          <View style={styles.buttonCont}>
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
        </View>
      </Modal>
      <View style={styles.addButton}>
        <Buttons
          isDisebled={hour !== "0 ч." || minute !== "0 мин." || !!servicesId}
          title="Сохранить"
          onPress={postTile}
        />
      </View>
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
    backgroundColor: "#B9B9C9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  procedureTitle: {
    color: "#000",
    fontSize: 16,
  },
  procedurePrice: {
    color: "#9C0A35",
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
  },
  modalItem: {
    margin: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeItem: {
    backgroundColor: "#9C0A35",
  },
  modalItemText: {
    color: "white",
  },
  activeItemText: {
    color: "white",
    fontWeight: "bold",
  },
  selectButtonModal: {
    backgroundColor: "#9C0A35",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  selectButtonTextModal: {
    color: "white",
    fontSize: 18,
  },
  buttonCont: {
    backgroundColor: "#21212E",
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
  flatList: {
    maxHeight: 200,
  },
  addButton: {
    backgroundColor: "#21212E",
    position: "absolute",
    paddingBottom: 16,
    paddingTop: 16,
    bottom: 1,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BreakBetweenSession;
