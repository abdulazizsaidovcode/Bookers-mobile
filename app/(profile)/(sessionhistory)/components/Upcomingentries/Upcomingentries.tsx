import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Linking,
  ActivityIndicator,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { base_url, getFile } from "@/helpers/api";
import moment from "moment";
import BottomModal from "@/components/(modals)/modal-bottom";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { getConfig } from "@/app/(tabs)/(master)/main";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { ProductType } from "@/type/history";
import Buttons from "@/components/(buttons)/button";
import { editOrderStatus } from "@/helpers/api-function/dashboard/dashboard";
import { updateOrderStatus } from "@/helpers/api-function/client/client";

const Upcomingentries = () => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState<ProductType[]>([]);
  const { getMee } = useGetMeeStore();
  const [bottomModalNetwork, setBottomModalNetwork] = useState(false);
  const [useDefault, setUseDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderStatusLoading, setOrderStatusLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState("");

  const toggleBottomModalNetwork = () =>
    setBottomModalNetwork(!bottomModalNetwork);
  const callPhone = () =>
    Linking.openURL(`tel:${getMee.phoneNumber}`).catch((err) =>
      console.error("Error:", err)
    );
  const goInstagram = () =>
    Linking.openURL(`https://www.instagram.com/${getMee.instagram}`).catch(
      (err) => console.error("Error:", err)
    );
  const goTelegram = () =>
    Linking.openURL(`https://t.me/${getMee.telegram}`).catch((err) =>
      console.error("Error:", err)
    );

  const getUpcoming = async () => {
    setLoading(true);
    try {
      const config = await getConfig();
      const { data } = await axios.get(
        `${base_url}order/upcoming-sessions?status=UPCOMING_SESSIONS`,
        config ? config : {}
      );
      if (data.success) setData(data.body);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(loading);
  

  const handleEditOrderStatus = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status, setOrderStatusLoading, setSuccessStatus);
    getUpcoming()
  }

  useEffect(() => {
    getUpcoming();
  }, []);

  const renderItem = ({ item }: any) => (
    <>
      {item.orderStatus == "WAIT" ?
        <View style={[tw`p-4 rounded-lg mb-4`, { backgroundColor: "#B9B9C9" }]}>
          <View style={tw`flex-row items-start mb-4`}>
            <Image
              source={item.attachmentId ? {
                uri: `${getFile}${item.attachmentId}`,
              } : require("../../../../../assets/avatar.png")}
              style={tw`w-14 h-14 rounded-full mr-4`}
            />
            <View style={{ flexDirection: 'column' }}>
              <View style={{ marginBottom: 10 }} >
                <Text style={[tw`text-black font-bold`, { fontSize: 18 }]}>{item.fullName}</Text>
                <View style={[tw`rounded px-2 py-1`, { backgroundColor: "#217355", width: 142 }]}>
                  <Text style={[tw`text-white`, { fontSize: 13 }]}>Постоянный клиент</Text>
                </View>
              </View>

            </View>
          </View>
          <View style={[tw`mb-2 p-1 rounded-lg`, { borderWidth: 1, borderColor: '#828282', alignSelf: 'flex-start' }]}>
            <Text style={{ fontSize: 12 }}>{item.serviceName}</Text>
          </View>
          <View style={tw`flex-row`}>
            <Text style={[tw`text-lg text-black font-bold`]}
            >Сегодня</Text>
            <View style={tw`flex-row items-center`}>
              <Text
                style={[tw`text-lg text-black font-bold`]}
              >
                {item.startTime.slice(0, 5)}
              </Text>
              <Text
                style={[tw`text-lg text-black font-bold`]}
              >
                -{item.finishTime.slice(0, 5)}
              </Text>
            </View>
          </View>
          <View style={[tw`flex-row w-40 mt-3`, { gap: 5 }]}>
            <Buttons onPress={() => handleEditOrderStatus(item.id, "CONFIRMED")} title="Одобрить" />
            <TouchableOpacity
              style={[
                styles.button,
              ]}
              activeOpacity={.8}
              onPress={() => handleEditOrderStatus(item.id, "REJECTED")}
            >
              <Text style={[styles.buttonText, { color: '#9C0A35', fontSize: 18 }]}>
                Отклонить
              </Text>
            </TouchableOpacity>
          </View>
        </View> :
        // 2
        <View style={[tw`p-4 rounded-lg mb-4`, { backgroundColor: "#B9B9C9" }]}>
          <View style={tw`flex-row items-start mb-4`}>
            <Image
              source={item.attachmentId ? {
                uri: `${getFile}${item.attachmentId}`,
              } : require("../../../../../assets/avatar.png")}
              style={tw`w-14 h-14 rounded-full mr-4`}
            />
            <View style={{ flexDirection: 'column' }}>
              <View style={{ marginBottom: 10 }} >
                <Text style={[tw`text-black font-bold`, { fontSize: 18 }]}>{item.fullName}</Text>
                <Text style={tw`text-gray-600`}>{item.phone}</Text>
              </View>

              <View style={[tw`flex-row`, { gap: 5 }]}>
                {item.serviceName.split(",").map((service: string, index: number) => (
                  <View key={index} style={[tw`mb-2 p-1 rounded-lg`, { borderWidth: 1, borderColor: '#828282', alignSelf: 'flex-start' }]}>
                    <Text style={{ fontSize: 12 }}>{service}</Text>
                  </View>
                ))}
              </View>
              <Text style={[tw`text-xl font-bold`, { color: "#9C0A35" }]}>{item.toPay} сум</Text>
            </View>
          </View>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-gray-600`}>
              {moment(item.orderDate).format("dddd D MMMM")}
            </Text>
            <View style={tw`flex-row items-center`}>
              <Text
                style={[tw`border rounded-lg py-1 px-2 `, { color: "#9C0A35", borderColor: "#9C0A35" }]}
              >
                {item.startTime.slice(0, 5)}
              </Text>
              <Text
                style={[tw`border rounded-lg py-1 px-2 ml-2`, { color: "#9C0A35", borderColor: "#9C0A35" }]}
              >
                {item.finishTime.slice(0, 5)}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row justify-between`}>
            <TouchableOpacity
              style={[tw`rounded-lg flex-row items-center py-3 text-center`, { backgroundColor: "#9C0A35" }]}
            >
              <Pressable
                // onPress={() =>
                //   navigation.navigate("(chat)/(communicatie)/chatDetails", {
                //     id: item.id,
                //   })
                // }
                style={tw`text-white mr-2 w-60`}
              >
                <Text style={tw`text-white text-center`}>Написать сообщение</Text>
              </Pressable>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleBottomModalNetwork}
              style={[tw`w-14 h-14 ml-5 rounded-full justify-center items-center`, { backgroundColor: "#9C0A35" }]}
            >
              <FontAwesome name="phone" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>}
    </>
  );

  return (
    <View
      style={[tw`flex-1 bg-gray-900 p-4 mt-5`, { backgroundColor: "#21212E" }]}
    >
      <NavigationMenu name="Предстоящие записи" />
      {loading || orderStatusLoading && <ActivityIndicator size="large" color={"#888"} />}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <BottomModal
        isBottomModal={bottomModalNetwork}
        toggleBottomModal={() => {
          toggleBottomModalNetwork();
        }}
      >
        <View style={tw`w-full`}>
          <Text style={styles.modalTitle}>Позвонить через</Text>
          <View
            style={[tw`flex-row justify-start items-center mb-6`, { gap: 25 }]}
          >
            <TouchableOpacity onPress={callPhone} activeOpacity={0.7}>
              <FontAwesome name="phone-square" size={45} color="#45E760" />
              <Text style={styles.modalOptionText}>Телефон</Text>
            </TouchableOpacity>
            {getMee.instagram && (
              <TouchableOpacity onPress={goInstagram} activeOpacity={0.7}>
                <FontAwesome5
                  name="instagram-square"
                  size={44}
                  color="#9C0A35"
                />
                <Text style={styles.modalOptionText}>Инстаграм</Text>
              </TouchableOpacity>
            )}
            {getMee.telegram && (
              <TouchableOpacity onPress={goTelegram} activeOpacity={0.7}>
                <FontAwesome name="telegram" size={42} color="#06BCEE" />
                <Text style={styles.modalOptionText}>Телеграм</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.defaultOption}>
            <TouchableOpacity
              onPress={() => setUseDefault(!useDefault)}
              activeOpacity={0.7}
              style={!useDefault && styles.checkbox}
            >
              {useDefault && (
                <FontAwesome6 name="square-check" size={27} color="white" />
              )}
            </TouchableOpacity>
            <Text style={[styles.defaultText, tw`${useDefault ? "ml-2" : ""}`]}>
              Используй по умолчанию
            </Text>
          </View>
        </View>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  contactInfo: {
    backgroundColor: "#B9B9C9",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  contactTitle: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "700",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactText: {
    color: "#4F4F4F",
    marginLeft: 12,
    fontSize: 16,
  },
  modalTitle: {
    color: "#FFF",
    opacity: 0.7,
    fontSize: 18,
    marginBottom: 20,
  },
  modalOptionText: {
    color: "#FFF",
    marginTop: 5,
  },
  defaultOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#FFF",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  defaultText: {
    color: "#FFF",
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9C0A35',
  },
  buttonText: {
    fontWeight: '500',
  },
});

export default Upcomingentries;
