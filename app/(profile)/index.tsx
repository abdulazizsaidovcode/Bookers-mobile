import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import { getFile } from "@/helpers/api";
import CenteredModal from "@/components/(modals)/modal-centered";
import tw from "tailwind-react-native-classnames";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePage: React.FC = () => {
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const navigation = useNavigation<any>();
  const { getMee, setGetMee } = useGetMeeStore();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getUser(setGetMee);
  }, []);
  const openInviteModal = () => {
    setInviteModalVisible(true);
  };

  const closeInviteModal = () => {
    setInviteModalVisible(false);
  };

  const openShareModal = () => {
    setShareModalVisible(true);
  };

  const closeShareModal = () => {
    setShareModalVisible(false);
  };

  const navigateTo = (screen: string) => {
    if (screen) {
      navigation.navigate(screen);
    } else {
      console.log(screen);
    }
  };

  const handleSubmit = async () => {
    await SecureStore.deleteItemAsync("number");
    await AsyncStorage.removeItem("registerToken")    
    await SecureStore.deleteItemAsync('password')
    navigation.navigate("(auth)/auth");
    setToggle(false)
  };

  return (
    <ScrollView style={[styles.container]}>
      <SafeAreaView style={{ paddingBottom: 24 }}>
        <StatusBar backgroundColor={`#21212E`} barStyle={`dark-content`} />
        <Text style={styles.title}>Профиль</Text>
        <View style={styles.profileHeader}>
          <Image
            source={
              getMee.attachmentId
                ? { uri: getFile + getMee.attachmentId }
                : require("@/assets/avatar.png")
            }
            style={styles.avatar}
          />
          <View>
            <Text style={styles.profileName}>
              {getMee.firstName} {getMee.lastName}
            </Text>
            <Text style={styles.profilePhone}>{getMee.phoneNumber}</Text>
          </View>
        </View>

        {[
          {
            icon: "user",
            label: "Подписка",
            screen: "(profile)/(tariff)/tariff",
          },
          {
            icon: "history",
            label: "История сеансов",
            screen: "(profile)/(sessionhistory)/sessionHistory",
          },
          {
            icon: "info-circle",
            label: "Справка",
            screen: "(profile)/(help)/help",
          },
          {
            icon: "bell",
            label: "Уведомления",
            screen: "(profile)/(notification)/index",
          },
          {
            icon: "wallet",
            label: "Расходы",
            screen: "(profile)/(Expenses)/index",
          },
          {
            icon: "globe",
            label: "Веб страница",
            screen: "(profile)/(WebPage)/WebPage",
          },
          {
            icon: "cogs",
            label: "Настройки",
            screen: "(profile)/(settings)/settings",
          },
          { icon: "users", label: "Клиенты", screen: "(free)/(client)/main" },
          {
            icon: "sign-out",
            label: "Выйти",
            screen: "Logout",
            modal: true,
          },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() =>
              item.modal ? setToggle(true) : navigateTo(item.screen)
            }
            activeOpacity={0.7}
          >
            <View style={styles.menuItemContent}>
              <FontAwesome5 name={item.icon} size={20} color="#9c0935" />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </View>
            <MaterialIcons name="navigate-next" size={36} color="#9c0935" />
          </TouchableOpacity>
        ))}

        <Modal
          transparent={true}
          visible={isInviteModalVisible}
          onRequestClose={closeInviteModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Кому вы хотите отправить ссылку?
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  closeInviteModal();
                  openShareModal();
                }}
              >
                <Text style={styles.modalButtonText}>Пригласить мастеров</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  closeInviteModal();
                  openShareModal();
                }}
              >
                <Text style={styles.modalButtonText}>Пригласить друзей</Text>
              </TouchableOpacity>
              <Button
                title="Закрыть"
                onPress={closeInviteModal}
                color="#E74C3C"
              />
            </View>
          </View>
        </Modal>

        <Modal
          transparent={true}
          visible={isShareModalVisible}
          onRequestClose={closeShareModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Поделиться</Text>
              <View style={styles.iconContainer}>
                {[
                  { name: "facebook", color: "#3b5998", label: "Facebook" },
                  { name: "telegram", color: "#0088cc", label: "Telegram" },
                  { name: "instagram", color: "#C13584", label: "Instagram" },
                  { name: "linkedin", color: "#0e76a8", label: "LinkedIn" },
                  { name: "skype", color: "#00aff0", label: "Skype" },
                  {
                    name: "copy",
                    color: "#E74C3C",
                    label: "Копировать ссылку",
                  },
                ].map((item, index): any => (
                  <TouchableOpacity key={index} style={styles.iconButton}>
                    <FontAwesome
                      name={item.name}
                      size={40}
                      color={item.color}
                    />
                    <Text style={styles.iconLabel}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Button
                title="Закрыть"
                onPress={closeShareModal}
                color="#E74C3C"
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <CenteredModal
        btnWhiteText="Нет"
        isFullBtn
        btnRedText="Да"
        children={
          <View style={tw`items-center`}>
            <AntDesign name="questioncircleo" size={50} color="#9C0A35" />
            <Text style={tw`text-2xl font-bold text-white my-3`}>
              Вы уверены?
            </Text>
          </View>
        }
        isModal={toggle}
        onConfirm={handleSubmit}
        toggleModal={() => setToggle(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
    padding: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 26,
    letterSpacing: 1,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profilePhone: {
    color: "#cccccc",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#b9b9c9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    color: "black",
    marginLeft: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  modalButtonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  iconButton: {
    alignItems: "center",
    marginBottom: 16,
  },
  iconLabel: {
    color: "#ffffff",
    marginTop: 8,
  },
});

export default ProfilePage;
