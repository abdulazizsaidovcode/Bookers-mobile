import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import moment from "moment";
import Buttons from "@/components/(buttons)/button";
import useTopMastersStore from "@/helpers/state_managment/masters";
import { getCategory, getTopMasters } from "@/helpers/api-function/masters";
import { FontAwesome } from "@expo/vector-icons";
import BottomModal from "@/components/(modals)/modal-bottom";
import AccardionSlider from "@/components/accordions/accardionSlider";
import AccardionSliderTwo from "@/components/accordions/accardionSliderTwo";
import AccordionFree from "@/components/accordions/accardionFree";
import AccordionCustom from "@/components/accordions/accardionCustom";
import { getFile } from "@/helpers/api";
import LocationInput from "@/app/locationInput";
import { useCommunitySlider } from "@/helpers/state_managment/communitySlider/communitySliderStore";
import { useAccardionStore } from "@/helpers/state_managment/accardion/accardionStore";
import { postClientFilter } from "@/helpers/api-function/uslugi/uslugi";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { useMapStore } from "@/helpers/state_managment/map/map";

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "app/(client)/(masters)/masters"
>;

const Masters = () => {
  const { masters, isLoading, category } = useTopMastersStore();
  const [bottmModal, setBottomModal] = useState(false);
  const [pastEntries, setPastEntries] = useState<string[]>([]);
  const [search, setSearch] = useState<any>("");
  const { rating, value } = useCommunitySlider(); // value * 1000
  const { genderIndex } = useAccardionStore();
  const { userLocation } = useGetMeeStore();
  const { setMapData } = useMapStore();
  const navigation = useNavigation<any>();

  const toggleBottomModal = () => setBottomModal(!bottmModal);

  const deletePastEntries = (id: string) => {
    const res = pastEntries.filter((state) => state !== id);
    setPastEntries(res);
  };

  const handleClick = async () => {
    try {
      postClientFilter(
        pastEntries,
        genderIndex,
        value * 1000,
        rating,
        userLocation.coords.latitude,
        userLocation?.coords.longitude
      );
      toggleBottomModal();
      setPastEntries([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopMasters(search);
    getCategory();
  }, [search]);

  return (
    <View
      style={[
        tw`px-5`,
        {
          flex: 1,
          backgroundColor: "#21212E",
        },
      ]}
    >
      <View style={tw`mt-10 w-full flex-row justify-between`}>
        <TouchableOpacity
          onPress={toggleBottomModal}
          style={[
            tw`rounded-lg px-4 py-2 justify-center items-center flex-row`,
            { backgroundColor: "#9c0935" },
          ]}
        >
          <Ionicons name="filter-sharp" size={24} color="#fff" />
          <Text style={tw`text-white text-lg font-medium ml-2`}>Фильтр</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "(client)/(map)/(recent-masters)/recent-masters"
            )
          }
          style={[
            tw`rounded-lg px-4 py-2 border justify-center items-center border flex-row`,
            { borderColor: "#fff" },
          ]}
        >
          <Entypo name="compass" size={24} color="#fff" />
          <Text style={tw`text-white text-lg font-medium ml-2`}>На карте</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`w-full`}>
        <LocationInput
          onChangeText={(e) => setSearch(e)}
          value={search}
          placeholder="Search"
        />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`text-white text-lg font-medium mt-5`}>
          Топ {masters.length} специалисты
        </Text>
        {isLoading && <ActivityIndicator size="large" color={"#888"} />}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            backgroundColor: "#21212E",
          }}
        >
          {masters &&
            masters.map((item) => (
              <View
                key={item.id}
                style={[
                  tw`rounded-lg p-2 mt-2`,
                  { backgroundColor: "#b9b9c9" },
                ]}
              >
                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-row`}>
                    <Image
                      style={tw`w-16 h-16 rounded-full`}
                      source={
                        item.attachmentId
                          ? {
                              uri: `${getFile}${item.attachmentId}`,
                            }
                          : require("../../../assets/avatar.png")
                      }
                    />
                    <View>
                      <View style={tw`flex-row items-center ml-2`}>
                        <Text style={tw`text-lg font-bold`}>
                          {item.fullName}
                        </Text>
                        <View
                          style={[
                            tw`border rounded-lg p-1 ml-2`,
                            { borderColor: "#4F4F4F" },
                          ]}
                        >
                          <Text
                            style={{ fontSize: 8, textTransform: "capitalize" }}
                          >
                            {item.salonName ? item.salonName : "Не найдено"}
                          </Text>
                        </View>
                      </View>
                      <Text style={tw`ml-3 capitalize text-gray-500`}>
                        {item.genderName === "MALE"
                          ? "Мужской мастер"
                          : item.genderName === "FEMALE"
                          ? "Женский мастер"
                          : "Не найдено"}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text>{item.orderCount} заказа</Text>
                    <Text>{item.clientCount} клиентов</Text>
                  </View>
                </View>
                <View>
                  <Text style={tw`ml-3 mt-3 text-gray-500`}>
                    {item.street ? item.street : "Не найдено"}
                  </Text>
                  {item.mainPhoto ? (
                    <Image
                      style={tw`w-full h-52 rounded-lg`}
                      source={{
                        uri: `${getFile}${item.mainPhoto}`,
                      }}
                    />
                  ) : (
                    <View
                      style={tw`w-full h-52 bg-gray-600 rounded-lg items-center justify-center`}
                    >
                      <FontAwesome name="photo" size={50} color="#fff" />
                    </View>
                  )}
                  <Text style={tw`ml-3 mt-3 text-base font-medium`}>
                    Ближайшая запись:
                    {moment().format("YYYY-MM-DD") === item.nextEntryDate
                      ? "Сегодня"
                      : moment(item.nextEntryDate).format("dd, DD MMM")}
                  </Text>
                  <View style={tw`mt-2 flex-row px-9 justify-center`}>
                    <Buttons title="Записаться" />
                    <TouchableOpacity
                      onPress={() => {
                        setMapData(item);
                        navigation.navigate("(client)/(master-locations)/master-locations")
                      }}
                      activeOpacity={0.8}
                      style={[
                        tw`w-12 h-12 items-center justify-center rounded-full bg-black ml-3`,
                        { backgroundColor: "#9c0935" },
                      ]}
                    >
                      <Ionicons
                        name="location-outline"
                        size={24}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </ScrollView>
        <BottomModal
          isBottomModal={bottmModal}
          toggleBottomModal={toggleBottomModal}
          children={
            <View style={tw`w-full mt-3`}>
              <Text style={tw`text-xl text-center mb-5 text-white font-bold`}>
                Фильтр
              </Text>
              <AccordionCustom
                title="Направления услуг"
                children={
                  <View>
                    {category &&
                      category.map((item, i) => (
                        <View style={tw`flex-row mt-2`}>
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
                              onPress={() =>
                                setPastEntries([...pastEntries, item.id])
                              }
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
                          <Text key={i}>{item.name}</Text>
                        </View>
                      ))}
                  </View>
                }
              />
              <AccordionFree title="Пол мастера" />
              <AccardionSlider title="Рядом со мной" />
              <AccardionSliderTwo title="Рейтинг" />
              <View style={tw`mt-7`}>
                <Buttons onPress={handleClick} title="Сохранять" />
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default Masters;
