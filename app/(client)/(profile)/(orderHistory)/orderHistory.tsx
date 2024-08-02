import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking, Alert } from "react-native"; // Linking import qilish
import CustomButton from "./CustomButton";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import AccardionHistory from "@/components/accordions/accardionHistory";
import { AntDesign, Feather, SimpleLineIcons } from "@expo/vector-icons";
import ProfileCard from "./profileCard";
import CenteredModal from "@/components/(modals)/modal-centered";
import { getOrderClientUpcomingInterface } from "@/type/client/editClient";
import { deleteAllPastComingFunction, getOrderClientPustComing, getorderClientUpcoming } from "@/helpers/api-function/oreder/orderHistory";
import { useFocusEffect } from "expo-router";
import { useMapStore } from "@/helpers/state_managment/map/map";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import AccardionHistoryTwo from "@/components/accordions/accardionHistoryTwo";
import { useAccardionStoreId } from "@/helpers/state_managment/accardion/accardionStore";
import clientStore from "@/helpers/state_managment/client/clientStore";
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";

const OrderHistory = () => {
  const { activeTab, setActiveTab, pastComing, setPastComing } = useAccardionStoreId();
  const {setSelectedClient}=ClientStory()
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [upcoming, setUpcoming] = useState<getOrderClientUpcomingInterface[]>([]);
  const { setMapData } = useMapStore();
  const navigate = useNavigation<any>()
  const navigation = useNavigation<NavigationProp<any>>();
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
  const DeleteAllPastComing = () => {
    const ids: any = pastComing.map(past => past.orderId)
    console.log(ids);
    
    if (ids.length > 0) {
      console.log("order ids", ids);
      deleteAllPastComingFunction(ids, () => deleteToggleModal(), () => getOrderClientPustComing(setPastComing))
    } else {
      Alert.alert("No pastComing", "There are no pastcoming to delete");
    }
  }

  useFocusEffect(
    useCallback(() => {
      getUpcomingClient();
      return () => { };
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      getPastcomingClient();
      return () => { };
    }, [])
  )


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      {activeTab === 'upcoming' && (
        <View style={styles.header}>
          <NavigationMenu name="Записи" />
        </View>
      )}
      {activeTab === 'past' && (
        <View style={styles.header}>
          <NavigationMenu name="История сеансов" />
          <TouchableOpacity onPress={() => {
            deleteToggleModal();
          }}>
            <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}


      <View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Предстоящие"
            onPress={() => setActiveTab('upcoming')}
            active={activeTab === 'upcoming'}
          />
          <CustomButton
            title="Прошедшие"
            onPress={() => {
              setActiveTab('past')
            }}
            active={activeTab === 'past'}
          />
        </View>
        {activeTab === 'upcoming' && (
          <ScrollView style={{ marginBottom: 160 }}>
            {upcoming.length !== 0 ? (
              upcoming.map((upcoming: any, index: number) => (
                <AccardionHistory id={upcoming.serviceIds} key={index} title={upcoming.serviceName} date={upcoming.orderDate} >
                  <ProfileCard
                    onPress={()=>{
                      setSelectedClient(upcoming)
                      navigation.navigate('(client)/(oreder)/orderDetail', { id: upcoming.orderId });
                    }}
                    imageURL={upcoming.userAttachmentId}
                    masterName={upcoming.firstName + " " + upcoming.lastName}
                    salonName={upcoming.salonName}
                    masterGender={upcoming.specializations}
                    ratingnumber={upcoming.feedbackCount}
                    money={`${upcoming.orderPrice} сум`}
                    buttonName="Написать сообщение"
                    Adress={upcoming.address}
                    titleTex={upcoming.serviceName.trim().split(', ')} // Stringni massivga aylantiramiz
                    locationIcon={
                      <SimpleLineIcons
                        onPress={() => {
                          navigate.navigate('(client)/(map)/(master-locations)/master-locations',{id: upcoming.id});
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
              pastComing.map((pastComing: any, index: number) => (
                <AccardionHistoryTwo key={index} id={pastComing.serviceIds} title={pastComing.serviceName} date={pastComing.orderDate} >
                  <ProfileCard
                    onPress={()=>{
                      setSelectedClient(pastComing)
                      navigation.navigate('(client)/(oreder)/orderDetail', { id: pastComing.orderId });
                    }}
                    titleTex={pastComing.serviceName.trim().split(', ')}
                    imageURL={pastComing.userAttachmentId}
                    masterName={pastComing.firstName + " " + pastComing.lastName}
                    salonName={pastComing.salonName}
                    masterGender={pastComing.specializations}
                    ratingnumber={pastComing.feedbackCount}
                    money={`${pastComing.orderPrice} сум`}
                    buttonName="Оставить отзыв"
                    Adress={pastComing.adress}
                    orderId={pastComing.orderId}
                    deleteIcon={<Feather name="trash-2" size={24} color="white" />}
                  />
                </AccardionHistoryTwo>
              ))
            ) : (
              <View style={styles.notFound}>
                <Text style={styles.notFoundText}>No Pastcoming!</Text>
              </View>
            )}
          </ScrollView>
        )}
        <CenteredModal
          isFullBtn={true}
          btnWhiteText={'Отмена'}
          btnRedText={'Да'}
          onConfirm={() => {
            DeleteAllPastComing()
          }}
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
