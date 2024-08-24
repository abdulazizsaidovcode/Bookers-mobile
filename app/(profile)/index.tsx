import React, { useCallback, useRef, useState } from "react";
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
  Share,
  Alert,
  Dimensions,
  Pressable,
} from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  AntDesign,
  FontAwesome6,
} from "@expo/vector-icons";
import { Easing } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { getUser } from "@/helpers/api-function/getMe/getMee";
import { getFile } from "@/helpers/api";
import CenteredModal from "@/components/(modals)/modal-centered";
import tw from "tailwind-react-native-classnames";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import registerStory from "@/helpers/state_managment/auth/register";
import { getMasterTariff } from "@/constants/storage";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { Loading } from "@/components/loading/loading";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const data: { name: any; color: string; label: string }[] = [
  { name: "facebook", color: "#3b5998", label: "Facebook" },
  { name: "telegram", color: "#0088cc", label: "Telegram" },
  { name: "instagram", color: "#C13584", label: "Instagram" },
  { name: "linkedin", color: "#0e76a8", label: "LinkedIn" },
  { name: "skype", color: "#00aff0", label: "Skype" },
  { name: "copy", color: "#E74C3C", label: "Копировать ссылку" },
];


const ProfilePage = () => {
  const { setNumber } = numberSettingStore();
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const navigation = useNavigation<any>();
  const { getMee, setGetMee } = useGetMeeStore();
  const { tariff, setTariff, isLoading, setIsLoading } = clientStore()
  const { isWaitModal, setIsWaitModal } = numberSettingStore()
  const [toggle, setToggle] = useState(false);
  const { role } = registerStory();


  useFocusEffect(
    useCallback(() => {
      getUser(setGetMee);
      getMasterTariff(setTariff)
    }, [])
  );

  // const openInviteModal = () => {
  //   setInviteModalVisible(true);
  // };

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
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true)
    await SecureStore.deleteItemAsync("number");
    await AsyncStorage.removeItem("registerToken");
    await SecureStore.deleteItemAsync("password");
    navigation.navigate("(auth)/auth");
    setToggle(false);
    setIsLoading(false)
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "https://t.me/senior_BX",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const navigationList =
    role === "ROLE_MASTER"
      ? [
        {
          icon: "user",
          label: "Подписка",
          screen: "(profile)/(tariff)/tariff",
        },
        {
          icon: "wallet",
          label: "Способы оплаты",
          screen: "(profile)/(sessionhistory)/sessionHistory",
        },
        {
          icon: "history",
          label: "История сеансов",
          screen: "(profile)/(sessionhistory)/sessionHistory",
        },
        {
          icon: "info-circle",
          label: "Документация",
          screen: "(profile)/(help)/help",
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
        {
          icon: "arrow-alt-circle-left",
          label: "Выйти",
          screen: "Logout",
          modal: true,
        },
      ]
      : role === "ROLE_CLIENT"
        ? [
          {
            icon: "share-alt",
            label: "Поделиться",
            screen: "",
            openInviteModal: true,
          },
          // {
          //   icon: "wallet",
          //   label: "Способы оплаты",
          //   screen: "(client)/(profile)/(payment)/payment",
          // },
          {
            icon: "clock",
            label: "История записей",
            screen: "(client)/(profile)/(orderHistory)/orderHistory",
          },
          {
            icon: "user",
            label: "Профиль",
            screen: "(client)/(profile)/(profileEdit)/profileEdit",
          },
          {
            icon: "exclamation-circle",
            label: "О сервиса",
            screen: "(profile)/(help)/help",
          },
          {
            icon: "bell",
            label: "Уведомления",
            screen: "(client)/(profile)/(notification)/notification",
          },
          // {
          //   icon: "credit-card",
          //   label: "Карта лояльности",
          //   screen: "(client)/(profile)/(card)/card",
          // },
          {
            icon: "cogs",
            label: "Настройки",
            screen: "(client)/(profile)/(settings)/settings",
          },
          {
            icon: "sign-out-alt",
            label: "Выйти",
            screen: "Logout",
            modal: true,
          },
        ]
        : [
          {
            icon: "share-alt",
            label: "Поделиться",
            screen: "",
            // modal: true
          },
          // {
          //   icon: "wallet",
          //   label: "Способы оплаты",
          //   screen: "(client)/(profile)/(payment)/payment",
          // },
          {
            icon: "clock",
            label: "История записей",
            screen: "(client)/(profile)/(orderHistory)/orderHistory",
          },
          {
            icon: "user",
            label: "Профиль",
            screen: "(client)/(profile)/(profileEdit)/profileEdit",
          },
          {
            icon: "exclamation-circle",
            label: "О сервиса",
            screen: "(free)/(help)/help",
          },
          {
            icon: "bell",
            label: "Уведомления",
            screen: "(client)/(profile)/(notification)/notification",
          },
          // {
          //   icon: "credit-card",
          //   label: "Карта лояльности",
          //   screen: "(client)/(profile)/(card)/card",
          // },
          {
            icon: "cogs",
            label: "Настройки",
            screen: "(client)/(profile)/(settings)/settings",
          },
          {
            icon: "sign-out-alt",
            label: "Выйти",
            screen: "Logout",
            modal: true,
          },
        ];

  return (
    <>
      {isLoading ?
        <Loading />
        :
        <View style={[styles.container]}>
          <StatusBar backgroundColor={`#21212E`} barStyle={`dark-content`} />
          <View
            style={[styles.sidebar]}
          >
            <View style={styles.profileHeader}>
              <Image
                source={
                  getMee && getMee.attachmentId
                    ? { uri: getFile + getMee.attachmentId }
                    : require("@/assets/avatar.png")
                }
                style={styles.avatar}
              />
              <View>
                {/* <View style={{flexDirection: "row", justifyContent:"center", gap: 4}}> */}
                <Text style={styles.profileName}>
                  {getMee && getMee.firstName ? getMee.firstName : "No data"} {getMee && getMee.lastName && getMee.lastName}
                </Text>
                <Text style={styles.profilePhone}>{getMee && getMee.phoneNumber ? getMee.phoneNumber : "No data"}</Text>
              </View>
            </View>
            {navigationList.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() =>
                  item.icon === "share-alt"
                    ? onShare()
                    : item.modal
                      ? setToggle(true)
                      : navigateTo(item.screen)
                }
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <FontAwesome5 name={item.icon} size={20} color="#9C0A35" />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

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
                  {data.map((item, index): any => (
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
          <CenteredModal
            isFullBtn={false}
            btnWhiteText=""
            oneBtn={true}
            btnRedText={"Закрыть"}
            isModal={isWaitModal}
            onConfirm={() => setIsWaitModal(false)}
            toggleModal={() => setIsWaitModal(false)}
          >
            <>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: "700",
                  marginBottom: 20,
                  paddingTop: 10
                }}
              >
                Ваша заявка принта!
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "400",
                  marginBottom: 20,
                  letterSpacing: 1,
                  textAlign: "center"
                }}
              >
                Администратор проверяет Ваши данные.
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "400",
                  marginBottom: 30,
                  letterSpacing: 1,
                  textAlign: "center"
                }}
              >
                Это займет не более 20 минут
              </Text>
            </>
          </CenteredModal>
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
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
    zIndex: 9999,
  },
  menuButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  menuButton: {
    padding: 16,
    backgroundColor: "#9c0935",
  },
  sidebar: {
    backgroundColor: '#21212E',
    flex: 1,
    height: height,
    zIndex: 9999,
    padding: 14,
    paddingTop: height / 10,
  },
  sidebarIn: {
    width: width / 2,
    height: height,
    backgroundColor: "#21212E",
    paddingTop: height / 15,
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
    // marginLeft: 7
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#21212E",
    paddingHorizontal: height / 50,
    paddingVertical: height / 60,
    borderRadius: 12,
    marginBottom: 8,
    borderColor: "#353535",
    borderWidth: 2,
    elevation: 10,
    shadowColor: "#000",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    color: "#fff",
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
