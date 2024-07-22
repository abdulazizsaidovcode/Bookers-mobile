import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native"; // Text komponentini import qilish
import CustomButton from "./CustomButton";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import AccardionHistory from "@/components/accordions/accardionHistory";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import ProfileCard from "./profileCard";
import CenteredModal from "@/components/(modals)/modal-centered";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const titleTex = ['Стрижка', 'Стрижка', 'Стрижка', 'укладка', "покраска волос"];
  const deleteToggleModal = () => {
    setModalDelete(!modalDelete)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <View style={styles.header}>
        <NavigationMenu name="История сеансов" />
        <TouchableOpacity onPress={() => {
          deleteToggleModal()
        }}>
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Предстоящие"
            onPress={() => setActiveTab('upcoming')}
            active={activeTab === 'upcoming'}
          />
          <CustomButton
            title="Прошедшие"
            onPress={() => setActiveTab('past')}
            active={activeTab === 'past'}
          />
        </View>
        {activeTab === 'upcoming' && (
          <ScrollView>
            <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
              <ProfileCard
                masterName="Натали"
                salonName="Beauty Wave"
                masterGender="Женский мастер"
                ratingnumber={5}
                money="100 000 сум"
                buttonName="Написать сообщение"
                Adress="Яккасарайский р-н, ул. Мирабад, 62а"
                titleTex={titleTex}
                locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
                phoneIcon={<Feather name="phone" size={24} color="white" />}
              />
            </AccardionHistory>
          </ScrollView>
        )}

        {activeTab === 'past' && (
          <ScrollView>
            <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
              <ProfileCard
                masterName="Натали"
                salonName="Beauty Wave"
                masterGender="Женский мастер"
                ratingnumber={5}
                money="100 000 сум"
                buttonName="Оставить отзыв"
                Adress="Яккасарайский р-н, ул. Мирабад, 62а"
                deleteIcon={<Feather name="trash-2" size={24} color="white" />}
              />
            </AccardionHistory>
          </ScrollView>
        )}
        <CenteredModal
          isFullBtn={true}
          btnWhiteText={'Отмена'}
          btnRedText={'Да'}
          onConfirm={() => deleteToggleModal()}
          isModal={modalDelete}
          toggleModal={deleteToggleModal}
        >
          <>
            <AntDesign name="delete" size={56} color="#9C0A35" />
            <Text style={styles.deleteText}>
              Вы хотите очистить все уведомлении?
            </Text>
          </>
        </CenteredModal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 14,
  },
  profileInfo: {
    flex: 1,
  },
  masterType: {
    fontSize: 12,
    paddingHorizontal: 8,
    borderColor: "#828282",
    borderWidth: 1,
  },
  deleteText: {
    color: '#494949',
    fontSize: 12,
    marginVertical: 20,
  },
});

export default OrderHistory;
