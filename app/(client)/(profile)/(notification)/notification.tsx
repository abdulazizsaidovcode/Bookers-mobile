import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import NavigationMenu from "@/components/navigation/navigation-menu";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomModal from "@/components/(modals)/modal-bottom";
import Buttons from "@/components/(buttons)/button";
import CenteredModal from "@/components/(modals)/modal-centered";
import {
  clientNotification,
  clientNotificationDelete,
  clientPostReadyORnotReady,
} from "@/helpers/api-function/client/clientPage";
import { getClientNotififcations } from "@/type/client/editClient";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Loading } from "@/components/loading/loading";

const NotificationClient: React.FC = () => {
  const [isBottomModalVisible, setBottomModalVisible] = useState<boolean>(
    false
  );
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<getClientNotififcations[]>(
    []
  );
  const [notificationIds, setNotificationIds] = useState<string[]>([]);
  const [idList, setIdList] = useState<string[]>([]);
  const [
    selectedNotification,
    setSelectedNotification,
  ] = useState<getClientNotififcations | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
      return () => {};
    }, [])
  );

  const deleteToggleModal = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleBottomModal = (
    notification: getClientNotififcations | null = null
  ) => {
    setSelectedNotification(notification);
    setBottomModalVisible(!isBottomModalVisible);
  };

  const handleDeletePress = () => {
    const ids: any = notification.map((notif) => notif.id);
    if (ids.length > 0) {
      setNotificationIds(ids);
      deleteToggleModal();
    } else {
      Alert.alert("No notifications", "There are no notifications to delete.");
    }
  };

  const fetchNotifications = async () => {
    await clientNotification(setNotification, setIsLoading);
  };

  const handleDeleteAll = () => {
    if (notificationIds.length > 0) {
      clientNotificationDelete(
        { notificationIds },
        () => fetchNotifications(),
        setIsLoading
      );
      setNotificationIds([]);
      setDeleteModal(false);
    }
  };

  const handleReadAll = () => {
    const ids: any = notification.map((notif) => notif.id);
    if (ids && ids.length > 0) {
      setIdList(ids);
      clientPostReadyORnotReady(
        { idList: ids },
        () => fetchNotifications(),
        setIsLoading
      );
      setNotificationIds([]);
    }
  };

  const handleReadSingle = (id: string) => {
    clientPostReadyORnotReady({ idList: [id] }, () => fetchNotifications());
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#21212E"} barStyle={"light-content"} />
          <View style={styles.headerContainer}>
            <NavigationMenu name={"Уведомления"} />
            <View style={styles.delete_read_Button}>
              <Ionicons
                name="checkmark-done-circle-outline"
                size={30}
                color="white"
                onPress={handleReadAll} // <--- Handle all read action
              />
              <AntDesign
                name="delete"
                size={24}
                color="white"
                onPress={handleDeletePress}
              />
            </View>
          </View>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {notification.length !== 0 ? (
              notification.map((notif: any, index: any) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.card,
                    notif.read === true ? [] : styles.unreadCard,
                  ]}
                  activeOpacity={0.9}
                  onPress={() => {
                    toggleBottomModal(notif);
                    handleReadSingle(notif.id);
                  }}
                >
                  <View style={styles.header}>
                    <Image
                      source={require("@/assets/avatar.png")}
                      style={styles.avatar}
                    />
                    <Text style={styles.title}>{notif.title}</Text>
                  </View>
                  <Text style={styles.description}>{notif.content}</Text>
                  <View style={styles.footer}>
                    <Text style={styles.date}>{notif.createAt}</Text>
                    <AntDesign name="right" size={24} color="#4F4F4F" />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.notFound}>
                <Text style={styles.notFoundText}>No notifications!</Text>
              </View>
            )}
          </ScrollView>
          {selectedNotification && (
            <BottomModal
              toggleBottomModal={() => toggleBottomModal(null)}
              isBottomModal={isBottomModalVisible}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {selectedNotification.title || "No title"}
                </Text>
                <Text style={styles.modalDate}>
                  {selectedNotification.createAt || "Not found"}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedNotification.content}
                </Text>
                <Buttons
                  onPress={() => toggleBottomModal()}
                  title={"Закрыть"}
                />
              </View>
            </BottomModal>
          )}
          <CenteredModal
            isFullBtn={true}
            btnWhiteText={"Отмена"}
            btnRedText={"Да"}
            onConfirm={() => handleDeleteAll()}
            isModal={deleteModal}
            toggleModal={deleteToggleModal}
          >
            <>
              <AntDesign name="delete" size={56} color="#9C0A35" />
              <Text style={styles.deleteText}>
                Вы хотите очистить все уведомления?
              </Text>
            </>
          </CenteredModal>
        </>
      )}
    </View>
  );
};

export default NotificationClient;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#21212E",
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingBottom: 10,
  },
  delete_read_Button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  card: {
    backgroundColor: "#B9B9C9",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    borderLeftWidth: 10, // Kartochkaning chap tomoni uchun chegara qo'shish
    borderLeftColor: "#B9B9C9", // Standart oq rang
  },
  unreadCard: {
    borderLeftColor: "#9C0A35", // Tasdiqlanmagan bildirishnomalar uchun qizil rang
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  description: {
    color: "#555",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: "#888",
    fontSize: 12,
  },
  notFound: {
    marginTop: 100,
  },
  notFoundText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  modalContent: {
    width: "100%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    color: "#494949",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#494949",
    marginBottom: 10,
  },
  modalDescription: {
    color: "white",
    marginBottom: 10,
  },
  deleteText: {
    color: "#494949",
    fontSize: 12,
    marginVertical: 20,
  },
});
