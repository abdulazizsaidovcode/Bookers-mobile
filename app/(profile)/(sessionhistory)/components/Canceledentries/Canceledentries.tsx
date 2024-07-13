import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { base_url } from "@/helpers/api";
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
import { getConfig } from "@/app/(tabs)/main";

const Canceledentries = () => {
  const [data, setData] = useState<any>([]);
  const [isChecked, setChecked] = useState(false);
  const [pastentries, setPastentries] = useState([]);
  const [toggle, setToggle] = useState(false);
  const navigation = useNavigation();
  const { setProduct } = History();

  const getsessionDetails = async () => {
    try {
      const config = await getConfig();
      const response = await axios.get(
        `${base_url}order/canceled-sessions?status=CANCELED_SESSIONS`,
        config
      );
      const responseData = response.data;
      if (responseData.success === true) setData(responseData.body);
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePastentries = (id: string) => {
    const res = pastentries.filter((state) => state !== id);
    setPastentries(res);
    console.log(res);
  };

  const selectAll = () => {
    const selected = data.map((item) => item.id);
    console.log(selected);
    setPastentries(selected);
  };

  const deletePast = async () => {
    const pastData = {
      status: "CANCELED_SESSIONS",
      orderIdList: pastentries,
    };

    try {
      const config = await getConfig();
      const response = await fetch(`${base_url}order/all`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...config.headers, // config içindeki headers'ı buraya ekliyoruz
        },
        body: JSON.stringify(pastData), // body'i JSON string formatında gönderiyoruz
      });
      const responseData = await response.json();
      if (responseData.success) setToggle(false);
      setChecked(false);
      setPastentries(responseData);
    } catch (error) {
      console.error("Error deleting past entries:", error);
    }
  };

  useEffect(() => {
    getsessionDetails();
  }, [pastentries]);

  return (
    <View style={[tw`flex-1 bg-gray-900 p-4 mt-5`, {backgroundColor: "#21212E"}]}>
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

      <ScrollView>
        {data &&
          data.map((item: any) => (
            <Pressable
              onPress={() => {
                !isChecked && navigation.navigate("(detail)/censeled-session"),
                  setProduct(item);
              }}
              key={item.id}
              style={tw`bg-gray-700 p-4 rounded-lg mb-4 flex-row items-center`}
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
                source={{
                  uri: `http://45.67.35.86:8080/attachment/getFile/${item.attachmentId}`,
                }}
                style={tw`w-12 h-12 rounded-full mr-4`}
              />
              <View style={tw`flex-1`}>
                <Text style={tw`text-white font-bold`}>{item.fullName}</Text>
                <Text style={tw`text-gray-400`}>{item.phone}</Text>
                <Text style={tw`text-red-500 font-bold mt-2`}>
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
        <FontAwesome name="trash" size={80} color="#9c0935" />
        <Text style={tw`text-white my-5`}>Удалить все прошедшие сеансы?</Text>
      </CenteredModal>
    </View>
  );
};

export default Canceledentries;
