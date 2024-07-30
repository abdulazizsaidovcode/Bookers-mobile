import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { OnlineBookingSettingsUrgentlyStory, OnlineBookingStory } from "@/helpers/state_managment/onlinBooking/onlineBooking";
import { postOnlineBookingserviceTime } from "@/helpers/api-function/onlineBooking/onlineBooking";



const hoursData = [0, 1, 2];
const minutesData = [0, 15, 30, 45];

export interface ServiceTime {
  serviceId: string | null;
  hour: number;
  minute: number;
}

const BreakBetweenSessionIn: React.FC = () => {
  const {isLoading, setIsLoading } = OnlineBookingStory();
  const { serviseData } = OnlineBookingSettingsUrgentlyStory();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);

  const serviceTimes = OnlineBookingSettingsUrgentlyStory(state => state.serviceTimes);
  const setServiceTime = OnlineBookingSettingsUrgentlyStory(state => state.setServiceTime);

  const handleSelectTime = (serviceId: string | null) => {
    setCurrentServiceId(serviceId);
    setModalVisible(true);
    const currentServiceTime = serviceTimes.find((time: ServiceTime) => time.serviceId === serviceId) || { hour: 0, minute: 0 };
    setSelectedHour(currentServiceTime.hour);
    setSelectedMinute(currentServiceTime.minute);
  };

  const handleSaveTime = () => {
    if (currentServiceId !== null) {
      setServiceTime(currentServiceId, selectedHour, selectedMinute);
    }
    setModalVisible(false);
  };

  const renderModalItem = ({ item, onPress, isActive }: { item: number, onPress: () => void, isActive: boolean }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.modalItem, isActive && styles.activeItem]}
    >
      <Text style={[styles.modalItemText, isActive && styles.activeItemText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const isSaveDisabled = serviceTimes.length === 0;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Перерывы между сеансами</Text>
          <Text style={styles.sectionSubtitle}>
            Настройте перерывы между сеансами
          </Text>
        </View>
        {serviseData.map((service: any) => (
          <View key={service.id} style={styles.procedureContainer}>
            <Text style={styles.procedureTitle}>{service && service.name ? service.name : "No data"}</Text>
            <Text style={styles.procedurePrice}>{service && service.price ? `${service.price} сум` : "No data"}</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => handleSelectTime(service.id)}
            >
              <View style={styles.timeContainer}>
                <Text style={styles.selectButtonText}>
                  {serviceTimes.find(time => time.serviceId === service.id)
                    ? `${serviceTimes.find(time => time.serviceId === service.id)!.hour} ч. ${serviceTimes.find(time => time.serviceId === service.id)!.minute} мин.`
                    : service && service.serviceTime ? `${Math.floor(service.serviceTime / 60)} ч. ${service.serviceTime % 60} мин.` : "0 ч. 0 мин."}
                </Text>
                <MaterialIcons name="arrow-drop-down" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.saveButton, isSaveDisabled && styles.saveButtonDisabled]}
        onPress={() => postOnlineBookingserviceTime(serviceTimes, navigator, setIsLoading)}
        disabled={isSaveDisabled}
      >
        <Text style={styles.saveButtonText}>Сохранить</Text>
      </TouchableOpacity>

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
                data={hoursData}
                renderItem={({ item }) =>
                  renderModalItem({
                    item,
                    onPress: () => setSelectedHour(item),
                    isActive: item === selectedHour,
                  })
                }
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
              />
            </View>
            <View style={styles.modalColumn}>
              <FlatList
                data={minutesData}
                renderItem={({ item }) =>
                  renderModalItem({
                    item,
                    onPress: () => setSelectedMinute(item),
                    isActive: item === selectedMinute,
                  })
                }
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
              />
            </View>
          </View>
          <View style={styles.buttonCont}>
            <TouchableOpacity style={styles.selectButtonModal} onPress={handleSaveTime}>
              <Text style={styles.selectButtonTextModal}>Выбрать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 10,
    backgroundColor: "#21212E",
  },
  scrollViewContent: {
    paddingBottom: 50,
    flexGrow: 1,
    backgroundColor: "#21212E",
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
  procedureContainer: {
    backgroundColor: "#B9B9C9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  procedureTitle: {
    color: "#000",
    fontSize: 22,
    fontWeight: "500"
  },
  procedurePrice: {
    color: "#9C0A35",
    fontSize: 19,
    marginBottom: 10,
    fontWeight: "600"
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
  saveButton: {
    backgroundColor: "#9C0A35",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: "gray",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default BreakBetweenSessionIn;
