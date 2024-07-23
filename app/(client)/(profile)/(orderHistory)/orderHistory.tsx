import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking } from "react-native"; // Linking import qilish
import CustomButton from "./CustomButton";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import AccardionHistory from "@/components/accordions/accardionHistory";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import ProfileCard from "./profileCard";
import CenteredModal from "@/components/(modals)/modal-centered";
import { getOrderClientPastcomingInterface, getOrderClientUpcomingInterface } from "@/type/client/editClient";
import { getOrderClientPustComing, getorderClientUpcoming } from "@/helpers/api-function/oreder/orderHistory";
import { useFocusEffect } from "expo-router";
import { useMapStore } from "@/helpers/state_managment/map/map";
import { useNavigation } from "@react-navigation/native";
import AccardionHistoryTwo from "@/components/accordions/accardionHistoryTwo";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [upcoming, setUpcoming] = useState<getOrderClientUpcomingInterface[]>([]);
  const [pastComing, setPastComing] = useState<getOrderClientPastcomingInterface[]>([]);
  const { setMapData } = useMapStore();
  const navigate = useNavigation<any>();

  const getUpcomingClient = async () => {
    await getorderClientUpcoming(setUpcoming);
  };
  const getPastcomingClient = async () => {
    await getOrderClientPustComing(setPastComing);
  }
  
  const deleteToggleModal = () => {
    setModalDelete(!modalDelete);
  };

  const handlePhonePress = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  useFocusEffect(
    useCallback(() => {
      getUpcomingClient();
      return () => { };
    }, [])
  );
  useFocusEffect(
    useCallback(()=>{
      getPastcomingClient();
      return () => { };
    },[])
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <View style={styles.header}>
        <NavigationMenu name="История сеансов" />
        <TouchableOpacity onPress={() => {
          deleteToggleModal();
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
            {upcoming.length !== 0 ? (
              upcoming.map((upcoming, index) => (
                <AccardionHistory id={upcoming.serviceIds} key={index} title={upcoming.serviceName} date={upcoming.orderDate} >
                  <ProfileCard
                    imageURL={upcoming.userAttachmentId}
                    masterName={upcoming.firstName + " " + upcoming.lastName}
                    salonName={upcoming.salonName}
                    masterGender=""
                    ratingnumber={upcoming.feedbackCount}
                    money={`${upcoming.orderPrice} сум`}
                    buttonName="Написать сообщение"
                    Adress={upcoming.address}
                    titleTex={upcoming.serviceName.split('  ')} // Stringni massivga aylantiramiz
                    locationIcon={
                      <SimpleLineIcons
                        onPress={() => {
                          setMapData(upcoming);
                          navigate.navigate('(client)/(map)/(master-locations)/master-locations');
                        }}
                        name="location-pin"
                        size={24}
                        color="white"
                      />
                    }
                    phoneIcon={
                      <Feather
                        name="phone"
                        size={24}
                        color="white"
                        onPress={() => handlePhonePress(upcoming.phoneNumber)} // Telefon qilish funksiyasini qo'shamiz
                      />
                    }
                  />
                </AccardionHistory>
              ))
            ) : (
              <View style={styles.notFound}>
                <Text style={styles.notFoundText}>No upcoming!</Text>
              </View>
            )}

          </ScrollView>
        )}

        {activeTab === 'past' && (
          <ScrollView>
            {pastComing.length !== 0 ? (
              pastComing.map((pastComing, index) => (
                <AccardionHistoryTwo key={index} id={pastComing.serviceIds} title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
                  <ProfileCard
                    titleTex={['Наращивание ресниц', 'Наращивание ресниц', 'Наращивание ресниц']}
                    imageURL={pastComing.userAttachmentId}
                    masterName={pastComing.firstName + " " + pastComing.lastName}
                    salonName="Beauty Wave"
                    masterGender="Женский мастер"
                    ratingnumber={5}
                    money="100 000 сум"
                    buttonName="Оставить отзыв"
                    Adress="Яккасарайский р-н, ул. Мирабад, 62а"
                    deleteIcon={<Feather name="trash-2" size={24} color="white" />}
                  />
                </AccardionHistoryTwo>
              ))
            ) : (
              <View style={styles.notFound}>
                <Text style={styles.notFoundText}>No Pastcoming!</Text>
              </View>
            )}

            {/* <AccardionHistoryTwo id={'2'} title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
              <ProfileCard
                titleTex={['Наращивание ресниц', 'Наращивание ресниц', 'Наращивание ресниц']}
                imageURL={''}
                masterName="Натали"
                salonName="Beauty Wave"
                masterGender="Женский мастер"
                ratingnumber={5}
                money="100 000 сум"
                buttonName="Оставить отзыв"
                Adress="Яккасарайский р-н, ул. Мирабад, 62а"
                deleteIcon={<Feather name="trash-2" size={24} color="white" />}
              />
            </AccardionHistoryTwo> */}
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
              Вы хотите очистить все увед
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
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  notFound: {
    marginTop: 100,
  },
  notFoundText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default OrderHistory;
