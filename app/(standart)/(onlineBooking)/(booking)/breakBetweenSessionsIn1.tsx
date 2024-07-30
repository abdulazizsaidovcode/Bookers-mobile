import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { OnlineBookingSettingsUrgentlyStory, OnlineBookingStory } from "@/helpers/state_managment/onlinBooking/onlineBooking";
import { postOnlineBookingUserviceTimeAll } from "@/helpers/api-function/onlineBooking/onlineBooking";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const hoursData = [0, 1, 2];
const minutesData = [0, 15, 30, 45];

const SingleBreakBetweenSession = () => {
  const {isLoading, setIsLoading } = OnlineBookingStory();

  const {selectedHour, setSelectedHour, selectedMinute, setSelectedMinute} = OnlineBookingSettingsUrgentlyStory()
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<any>();


  const handleSaveTime = () => {
    // Add logic to save the time if needed
    setModalVisible(false);
  };

  const renderModalItem = ({ item, onPress, isActive }: any) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.modalItem, isActive && styles.activeItem]}
    >
      <Text style={[styles.modalItemText, isActive && styles.activeItemText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Перерывы между сеансами</Text>
        </View>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.timeContainer}>
            <Text style={styles.selectButtonText}>
              {selectedHour} ч. {selectedMinute} мин.
            </Text>
            <MaterialIcons name="arrow-drop-down" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() =>
          postOnlineBookingUserviceTimeAll({serviceId: null, hour: selectedHour, minute: selectedMinute }, navigation, setIsLoading)
        }
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
            <TouchableOpacity
              style={styles.selectButtonModal}
              onPress={handleSaveTime}
            >
              <Text style={styles.selectButtonTextModal}>Выбрать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
    justifyContent: "space-between",
    paddingTop: height * 0.01, // Responsive padding top
  },
  section: {
    marginBottom: height * 0.02, // Responsive margin bottom
  },
  sectionTitle: {
    color: "white",
    fontSize: width * 0.045, // Responsive font size
  },
  selectButton: {
    backgroundColor: "#4B4B64",
    paddingVertical: height * 0.02, // Responsive vertical padding
    paddingHorizontal: width * 0.04, // Responsive horizontal padding
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.02, // Responsive margin bottom
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  selectButtonText: {
    color: "white",
    fontSize: width * 0.045, // Responsive font size
  },
  saveButton: {
    backgroundColor: "#9C0A35",
    paddingVertical: height * 0.02, // Responsive vertical padding
    borderRadius: 8,
    alignItems: "center",
    marginTop: height * 0.01, // Responsive margin top
  },
  saveButtonText: {
    color: "white",
    fontSize: width * 0.045, // Responsive font size
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
    padding: width * 0.05, // Responsive padding
    justifyContent: "space-around",
  },
  modalColumn: {
    flex: 1,
  },
  modalItem: {
    margin: width * 0.01, // Responsive margin
    paddingVertical: height * 0.015, // Responsive vertical padding
    alignItems: "center",
    justifyContent: "center",
  },
  activeItem: {
    backgroundColor: "#9C0A35",
  },
  modalItemText: {
    color: "white",
    fontSize: width * 0.045, // Responsive font size
  },
  activeItemText: {
    color: "white",
    fontWeight: "bold",
  },
  selectButtonModal: {
    backgroundColor: "#9C0A35",
    paddingVertical: height * 0.015, // Responsive vertical padding
    borderRadius: 8,
    marginTop: height * 0.01, // Responsive margin top
    width: "80%",
    alignItems: "center",
    marginBottom: height * 0.01, // Responsive margin bottom
  },
  selectButtonTextModal: {
    color: "white",
    fontSize: width * 0.045, // Responsive font size
  },
  buttonCont: {
    backgroundColor: "#21212E",
    width: "100%",
    alignItems: "center",
    paddingBottom: height * 0.01, // Responsive padding bottom
  },
  flatList: {
    maxHeight: height * 0.25, // Responsive max height
  },
});

export default SingleBreakBetweenSession;
