import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { base_url, getFile } from "@/helpers/api";
import axios from "axios";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import CenteredModal from "@/components/(modals)/modal-centered";
import tw from "tailwind-react-native-classnames";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { useNavigation } from "expo-router";
import History from "@/helpers/state_managment/history";
import { getConfig } from "@/app/(tabs)/(master)/main";
import { ProductType } from "@/type/history";

const Canceledentries = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [isChecked, setChecked] = useState(false);
  const [pastEntries, setPastEntries] = useState<string[]>([]);
  const [toggle, setToggle] = useState(false);
  const navigation = useNavigation<any>();
  const { setProduct } = History();

  const getSessionDetails = async () => {
    try {
      const config = await getConfig();
      const response = await axios.get(
        `${base_url}order/canceled-sessions?status=CANCELED_SESSIONS`,
        config ? config : {}
      );
      const responseData = response.data;
      if (responseData.success) setData(responseData.body);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePastEntries = (id: string) => {
    const res = pastEntries.filter((state) => state !== id);
    setPastEntries(res);
  };

  const selectAll = () => {
    const selected = data.map((item) => item.id);
    console.log(selected);
    setPastEntries(selected);
  };

  const deletePast = async () => {
    const pastData = {
      status: "CANCELED_SESSIONS",
      orderIdList: pastEntries,
    };

    try {
      const config = await getConfig();
      const response = await fetch(`${base_url}order/all`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: config ? config.headers.Authorization : "",
        },
        body: JSON.stringify(pastData),
      });
      const responseData = await response.json();
      if (responseData.success) {
        setToggle(false);
        setChecked(false);
        setPastEntries([]);
      }
    } catch (error) {
      console.error("Error deleting past entries:", error);
    }
  };

  useEffect(() => {
    getSessionDetails();
  }, []);

  return (
    <View
      style={[tw`flex-1 p-4 mt-5`, { backgroundColor: "#21212E" }]}
    >
      {isChecked ? (
        <View
          style={[
            tw`flex-row items-center justify-between mt-7`,
            { paddingHorizontal: 16 },
          ]}
        >
          <View style={tw`flex-row items-center justify-center`}>
            <View style={tw`flex-row items-center justify-center`}>
              <AntDesign
                onPress={() => {
                  setChecked(!isChecked);
                  setPastEntries([]);
                }}
                name="close"
                size={20}
                color="#828282"
              />
              <Text
                style={[tw`text-lg font-bold mr-4 ml-1`, { color: "#828282" }]}
              >
                {pastEntries.length}
              </Text>
            </View>
            <TouchableOpacity
              onPress={selectAll}
              activeOpacity={0.8}
              style={tw`flex-row items-center`}
            >
              <Ionicons name={"checkbox"} size={24} color="white" />
              <Text style={tw`text-white ml-2 text-base font-medium`}>
                выделить все
              </Text>
            </TouchableOpacity>
          </View>
          <MaterialIcons
            onPress={() => pastEntries.length !== 0 && setToggle(!toggle)}
            name="delete"
            size={30}
            color="white"
          />
        </View>
      ) : (
        <NavigationMenu
          name="Отменены сеансы"
          deleteIcon
          toggleModal={() => setChecked(!isChecked)}
        />
      )}

      <ScrollView>
        {data &&
          data.map((item) => (
            <Pressable
              onPress={() => {
                !isChecked && navigation.navigate("(detail)/censeled-session")
                setProduct(item);
              }}
              key={item.id}
              style={[tw`p-4 mb-4 flex-row items-start`, { backgroundColor: "#B9B9C9", borderRadius: 20 }]}
            >
              {isChecked && (
                <View>
                  {pastEntries.includes(item.id) ? (
                    <Pressable
                      onPress={() => deletePastEntries(item.id)}
                      key={`checked-${item.id}`}
                      style={[
                        tw`w-6 h-6 items-center justify-center rounded-md mr-3`,
                        { backgroundColor: "#9C0A35" },
                      ]}
                    >
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color="white"
                        style={tw`font-bold`}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => setPastEntries([...pastEntries, item.id])}
                      key={`unchecked-${item.id}`}
                      style={[
                        tw`w-6 h-6 items-center justify-center rounded-md mr-3`,
                        {
                          backgroundColor: "#B9B9C9",
                          borderWidth: 2,
                          borderColor: "gray",
                        },
                      ]}
                    ></Pressable>
                  )}
                </View>
              )}
              <Image
                source={item.attachmentId ? {
                  uri: getFile + item.attachmentId,
                } : require("../../../../../assets/avatar.png")}
                style={tw`w-12 h-12 rounded-full mr-4`}
              />
              <View style={tw`flex-1`}>
                <Text style={tw` font-bold`}>{item.fullName}</Text>
                <Text style={tw`text-gray-600`}>{item.phone}</Text>
                <View style={[tw`flex-row`, { gap: 5 }]}>
                {item.serviceName.trim().split(", ").map((service: string, index: number) => (
                  <View key={index} style={[tw`mb-2 p-1 rounded-lg`, { borderWidth: 1, borderColor: '#828282', alignSelf: 'flex-start' }]}>
                    <Text style={{ fontSize: 12 }}>{service}</Text>
                  </View>
                ))}
              </View>
                <Text style={[tw`text-lg font-bold mt-2`, { color: '#9C0A35' }]}>
                  {item.servicePrice} сум
                </Text>
              </View>
            </Pressable>
          ))}
      </ScrollView>

      <CenteredModal
        isModal={toggle}
        onConfirm={deletePast}
        toggleModal={() => setToggle(!toggle)}
        btnWhiteText="Отмена"
        btnRedText="Да"
        children={
          <>
            <FontAwesome name="trash" size={80} color="#9c0935" />
            <Text style={tw`text-white my-5`}>
              Удалить все прошедшие сеансы?
            </Text>
          </>
        }
        isFullBtn={true}
      />
    </View>
  );
};

export default Canceledentries;
