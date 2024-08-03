import { getConfig } from "@/app/(tabs)/(master)/main";
import CenteredModal from "@/components/(modals)/modal-centered";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { base_url, getFile } from "@/helpers/api";
import History from "@/helpers/state_managment/history";
import Pastentries from "@/helpers/state_managment/pastentries/Pastentries";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable, ActivityIndicator, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";

const PastEntries = () => {
  const [data, setData] = useState<any[]>([]);
  const { isChecked, setChecked, pastentries, setPastentries } = Pastentries();
  const [toggle, setToggle] = useState(false);
  const { setProduct } = History();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false)
  const [cheked, setCheck] = useState(false)

  const getsessionDetails = async () => {
    setLoading(true)
    try {
      const config = await getConfig();
      const response = await axios.get(
        `${base_url}order/past-sessions?status=PAST_SESSIONS`,
        config ? config : {}
      );
      const responseData = response.data;
      if (responseData.success === true) setData(responseData.body);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const deletePastentries = (id: string) => {
    const res = pastentries.filter((state) => state !== id);
    setPastentries(res);
  };

  const selectAll = () => {
    setCheck(true)
    const selected = data.map((item) => item.id);
    setPastentries(selected);
  };

  const deletePast = async () => {
    const pastData = {
      status: "PAST_SESSIONS",
      orderIdList: pastentries,
    };

    try {
      const config = await getConfig();
      // const response = await fetch(`${base_url}order/delete/all`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: config ? config.headers.Authorization : {},
      //   },
      //   body: JSON.stringify(pastData),
      // });
      const { data } = await axios.post(`${base_url}order/delete/all`, pastData, config ? config : {})

      if (data.success) setToggle(false);
      setChecked(false);
      getsessionDetails();
    } catch (error) {
      console.error("Error deleting past entries:", error);
    }
  };

  useEffect(() => {
    getsessionDetails();
  }, [pastentries]);

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
                  setPastentries([]);
                }}
                name="close"
                size={20}
                color="#828282"
              />
              <Text
                style={[tw`text-lg font-bold mr-4 ml-1`, { color: "#828282" }]}
              >
                {pastentries.length}
              </Text>
            </View>
            <View
              style={tw`flex-row items-center`}
            >
              {cheked ? 
              <TouchableOpacity onPress={() => {
                setPastentries([])
                setCheck(false)
              }}>
                <Ionicons name={"checkbox"} size={24} color="white" />
              </TouchableOpacity>
               :
               <TouchableOpacity onPress={selectAll}>
                <View style={tw`w-5 h-5 rounded border border-gray-500`}></View>
              </TouchableOpacity>
              }
              <Text style={tw`text-white ml-2 text-base font-medium`}>
                выделить все
              </Text>
            </View>
          </View>
          <MaterialIcons
            onPress={() => pastentries.length !== 0 && setToggle(!toggle)}
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
      {loading && <ActivityIndicator size="large" color={"#888"} />}
      <ScrollView contentContainerStyle={tw`mt-5`} showsVerticalScrollIndicator={false}>
        {data &&
          data.map((item: any) => (
            <Pressable
              onPress={() => {
                !isChecked && navigation.navigate("(detail)/censeled-session"),
                  setProduct(item);
              }}
              key={item.id}
              style={[tw`bg-gray-700 p-4 mb-4 flex-row items-start`, { backgroundColor: "#B9B9C9", borderRadius: 20 }]}
            >
              {isChecked && (
                <View>
                  {pastentries.length > 0 && pastentries.includes(item.id) ? (
                    <Pressable
                      onPress={() => deletePastentries(item.id)}
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
                      onPress={() => setPastentries([...pastentries, item.id])}
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
                <Text style={tw`text-gray-700 mt-1`}>{item.phone}</Text>
                <View style={[tw`flex-row mt-1`, { gap: 5 }]}>
                  {item.serviceName.trim().split(", ").map((service: string, index: number) => (
                    <View key={index} style={[tw`mb-2 p-1 rounded-lg`, { borderWidth: 1, borderColor: '#828282', alignSelf: 'flex-start' }]}>
                      <Text style={{ fontSize: 12 }}>{service}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[tw`text-lg font-bold`, { color: '#9C0A35' }]}>
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
        isFullBtn={true}
      >
        <>
          <FontAwesome name="trash" size={80} color="#9c0935" />
          <Text style={tw`text-white my-5`}>Удалить все прошедшие сеансы?</Text>
        </>
      </CenteredModal>
    </View>
  );
};

export default PastEntries;
