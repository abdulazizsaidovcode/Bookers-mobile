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
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { base_url } from "@/helpers/api";
import moment from "moment";
import BottomModal from "@/components/(modals)/modal-bottom";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { getConfig } from "@/app/(tabs)/main";
import NavigationMenu from "@/components/navigation/navigation-menu";


const Upcomingentries = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { getMee } = useGetMeeStore();
  const [bottomModalNetwork, setBottomModalNetwork] = useState(false);
  const [useDefault, setUseDefault] = useState(false);

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
    try {
      const config = await getConfig();
      const { data } = await axios.get(
        `${base_url}order/upcoming-sessions?status=UPCOMING_SESSIONS`,
        config
      );
      setData(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUpcoming();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={tw`bg-gray-700 p-4 rounded-lg mb-4`}>
      <View style={tw`flex-row items-center mb-4`}>
        <Image
          source={{
            uri: `http://45.67.35.86:8080/attachment/getFile/${item.attachmentId}`,
          }}
          style={tw`w-12 h-12 rounded-full mr-4`}
        />
        <View>
          <Text style={tw`text-white font-bold`}>{item.fullName}</Text>
          <Text style={tw`text-gray-400`}>{item.phone}</Text>
        </View>
      </View>
      <Text style={tw`text-gray-400 mb-2`}>{item.serviceName}</Text>
      <Text style={tw`text-red-500 font-bold mb-2`}>{item.toPay} сум</Text>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-gray-400 mb-4`}>
          {moment(item.orderDate).format("dddd D MMMM")}
        </Text>
        <View style={tw`flex-row items-center`}>
          <Text
            style={tw`text-red-700 border rounded-lg py-1 px-2 border-red-700`}
          >
            {item.startTime.slice(0, 5)}
          </Text>
          <Text
            style={tw`text-red-700 border rounded-lg py-1 px-2 ml-2 border-red-700`}
          >
            {item.finishTime.slice(0, 5)}
          </Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between`}>
        <TouchableOpacity
          style={tw`bg-red-700 p-2 rounded-lg flex-row items-center`}
        >
          <Pressable
            onPress={() =>
              navigation.navigate("(chat)/(communicatie)/chatDetails", {
                id: item.id,
              })
            }
            style={tw`text-white mr-2 w-60`}
          >
            <Text style={tw`text-white`}>Написать сообщение</Text>
          </Pressable>
          <FontAwesome name="envelope" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleBottomModalNetwork}
          style={tw`bg-red-700 w-9 h-9 rounded-full justify-center items-center`}
        >
          <FontAwesome name="phone" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[tw`flex-1 bg-gray-900 p-4 mt-5`, {backgroundColor: "#21212E"}]}>
      <NavigationMenu name="Предстоящие записи"/>
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
});

export default Upcomingentries;
