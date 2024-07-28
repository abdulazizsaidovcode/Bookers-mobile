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
import tw from "tailwind-react-native-classnames";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import debounce from "lodash.debounce";
import Buttons from "@/components/(buttons)/button";
import useTopMastersStore from "@/helpers/state_managment/masters";
import { getTopMasters } from "@/helpers/api-function/masters";
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
import { TopMasterCard } from "./masterCard";

const Masters = () => {
  const { masters, isLoading, category } = useTopMastersStore();
  const [bottomModal, setBottomModal] = useState(false);
  const [pastEntries, setPastEntries] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const { rating, value } = useCommunitySlider(); // value * 1000
  const { genderIndex } = useAccardionStore();
  const { userLocation } = useGetMeeStore();
  const { setMapData } = useMapStore();
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const toggleBottomModal = () => setBottomModal(!bottomModal);

  const deletePastEntries = (id: string) => {
    const res = pastEntries.filter((state) => state !== id);
    setPastEntries(res);
  };

  useEffect(() => {
    getTopMasters(page);
  }, [page]);

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

  if (!masters || !Array.isArray(masters)) {
    return null; // or some loading indicator
  }

  const handleClick = async () => {
    try {
      await postClientFilter(
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
          // onPress={() =>
          //   navigation.navigate(
          //     "(client)/(map)/(recent-masters)/recent-masters"
          //   )
          // }
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
          data={masters.filter((item) => item)} // Filter out undefined items
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
                    {category &&
                      category.map((item, i) => (
                        <View style={tw`flex-row mt-2`} key={i}>
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
