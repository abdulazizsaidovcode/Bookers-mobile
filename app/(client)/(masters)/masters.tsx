import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import debounce from "lodash.debounce";
import useTopMastersStore from "@/helpers/state_managment/masters";
import { getCategory, getTopMasters } from "@/helpers/api-function/masters";
import BottomModal from "@/components/(modals)/modal-bottom";
import AccardionSlider from "@/components/accordions/accardionSlider";
import AccardionSliderTwo from "@/components/accordions/accardionSliderTwo";
import AccordionFree from "@/components/accordions/accardionFree";
import AccordionCustom from "@/components/accordions/accardionCustom";
import LocationInput from "@/app/locationInput";
import { useCommunitySlider } from "@/helpers/state_managment/communitySlider/communitySliderStore";
import { useAccardionStore } from "@/helpers/state_managment/accardion/accardionStore";
import { postClientFilter } from "@/helpers/api-function/uslugi/uslugi";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { useMapStore } from "@/helpers/state_managment/map/map";
import { Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import Buttons from "@/components/(buttons)/button";
import { FontAwesome } from "@expo/vector-icons";
import { getClient_filter, getFile } from "@/helpers/api";
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";
import axios from "axios";
import { getConfig } from "@/app/(tabs)/(master)/main";

const Masters = () => {
  const { masters, isLoading, category, setTopMasters } = useTopMastersStore();
  const [bottomModal, setBottomModal] = useState(false);
  const [pastEntries, setPastEntries] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const { rating, value } = useCommunitySlider(); // value * 1000
  const { genderIndex } = useAccardionStore();
  const { userLocation } = useGetMeeStore();
  const { setMapData } = useMapStore();
  const navigation = useNavigation<any>();
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const { selectedClient, setSelectedClient } = ClientStory()

  const toggleBottomModal = () => setBottomModal(!bottomModal);

  const deletePastEntries = (id: string) => {
    const res = pastEntries.filter((state) => state !== id);
    setPastEntries(res);
  };



  useEffect(() => {
    getTopMasters(page, 10 , search);
    getCategory()
    console.log(masters);
    
  }, [page, search]);

  const loadMore = useCallback(
    debounce(() => {
      if (!loadingMore && !isLoading) {
        setLoadingMore(true);
        setPage((prevPage) => prevPage + 1);
      }
    }, 200),
    [loadingMore, isLoading]
  );

  useFocusEffect(
    useCallback(() => {
      return () => loadMore.cancel();
    }, [loadMore])
  );

  useEffect(() => {
    if (loadingMore && !isLoading) {
      setLoadingMore(false);
    }
  }, [isLoading, loadingMore]);

  const renderFooter = () => {
    return loadingMore ? (
      <View style={{ padding: 10 }}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const TopMasterCard = ({ item }: any) => {

    const {
      id,
      attachmentId,
      fullName,
      salonName,
      genderName,
      orderCount,
      clientCount,
      street,
      mainPhoto,
      nextEntryDate,
    } = item;

    const avatarSource = attachmentId
      ? { uri: `${getFile}${attachmentId}` }
      : require("../../../assets/avatar.png");

    const mainPhotoSource = mainPhoto
      ? { uri: `${getFile}${mainPhoto}` }
      : null;

    const genderLabel =
      genderName === "MALE"
        ? "Мужской мастер"
        : genderName === "FEMALE"
          ? "Женский мастер"
          : "Не найдено";

    const nextBookingDate =
      moment().format("YYYY-MM-DD") === nextEntryDate
        ? "Сегодня"
        : moment(nextEntryDate).format("dd, DD MMM");

    return (
      <View
        key={id}
        style={[tw`rounded-lg p-2 mt-2`, { backgroundColor: "#b9b9c9" }]}
      >
        <View style={tw`flex-row justify-between`}>
          <View style={tw`flex-row`}>
            <Image style={tw`w-16 h-16 rounded-full`} source={avatarSource} />
            <View>
              <View style={tw`flex-row items-center ml-2`}>
                <Text style={tw`text-lg font-bold`}>{fullName}</Text>
                <View
                  style={[
                    tw`border rounded-lg p-1 ml-2`,
                    { borderColor: "#4F4F4F" },
                  ]}
                >
                  <Text style={{ fontSize: 8, textTransform: "capitalize" }}>
                    {salonName || "Не найдено"}
                  </Text>
                </View>
              </View>
              <Text style={tw`ml-3 capitalize text-gray-500`}>
                {genderLabel}
              </Text>
            </View>
          </View>
          <View>
            <Text>{orderCount} заказа</Text>
            <Text>{clientCount} клиентов</Text>
          </View>
        </View>
        <View>
          <Text style={tw`ml-3 my-2 text-gray-500`}>
            {street || "Не найдено"}
          </Text>
          {mainPhotoSource ? (
            <Image
              style={tw`w-full h-80 rounded-lg`}
              source={mainPhotoSource}
            />
          ) : (
            <View
              style={tw`w-full h-80 bg-gray-600 rounded-lg items-center justify-center`}
            >
              <FontAwesome name="photo" size={70} color="#fff" />
            </View>
          )}
          <Text style={tw`ml-3 mt-3 text-base font-medium`}>
            Ближайшая запись: {nextBookingDate}
          </Text>
          <View style={tw`mt-2 flex-row px-9 justify-center`}>
            <Buttons title="Записаться"
              onPress={() => {
                setSelectedClient(item)
                navigation.navigate('(client)/(uslugi)/(masterInformation)/masterInformation')
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setMapData(item);
                navigation.navigate(
                  "(client)/(map)/(master-locations)/master-locations"
                );
              }}
              activeOpacity={0.8}
              style={[
                tw`w-12 h-12 items-center justify-center rounded-full bg-black ml-3`,
                { backgroundColor: "#9c0935" },
              ]}
            >
              <Ionicons name="location-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (!masters || !Array.isArray(masters)) {
    return null; // or some loading indicator
  }

  const handleClick = async () => {
    try {
      // await postClientFilter(
      //   pastEntries,
      //   genderIndex,
      //   genderIndex,
      //   rating,
      //   userLocation.coords.latitude,
      //   userLocation?.coords.longitude
      // );
      const config = await getConfig();

      const postData = { categoryId: pastEntries, gender: genderIndex, nextToMe: value * 1000, lat: userLocation.coords.latitude, lng: userLocation?.coords.longitude };
      const url = `${getClient_filter}?page=${page ? page : 0}&size=${10}${pastEntries ? `&nameOrPhone=""` : ""}`;
      const { data } = await axios.post(url, postData, config ? config : {});
      
      setTopMasters(data.body.object)
      console.log(data.body.object);
      
      setPastEntries([]);
      toggleBottomModal();
    } catch (error) {
      console.log(error);
    }
  };

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
          onPress={() =>navigation.navigate("(client)/(map)/(recent-masters)/recent-masters")}
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


        <FlatList
          data={masters &&  masters} // Filter out undefined items
          keyExtractor={(item) => item.id}
          renderItem={TopMasterCard}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />

        {isLoading && <ActivityIndicator size="large" color={"#888"} />}

        <BottomModal
          isBottomModal={bottomModal}
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
                    {category.length &&
                      category.map((item: any, i: any) => (
                        <View style={tw`flex-row mt-2`} key={i}>
                          {pastEntries && pastEntries.includes(item.id) ? (
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
