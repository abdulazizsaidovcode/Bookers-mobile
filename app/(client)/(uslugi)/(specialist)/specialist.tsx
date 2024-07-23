import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import CustomCheckbox1 from '@/components/checkbox/checkbox1';
import LocationInput from '@/app/locationInput';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import { getFreeTime, postClientFilter } from '@/helpers/api-function/uslugi/uslugi';
import { useAccardionStore } from '@/helpers/state_managment/accardion/accardionStore';
import { useCommunitySlider } from '@/helpers/state_managment/communitySlider/communitySliderStore';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import BottomModal from '@/components/(modals)/modal-bottom';
import AccordionFree from '@/components/accordions/accardionFree';
import AccardionSliderTwo from '@/components/accordions/accardionSliderTwo';
import AccardionSlider from '@/components/accordions/accardionSlider';
import Buttons from '@/components/(buttons)/button';
import { useMapStore } from '@/helpers/state_managment/map/map';

const Specialist = () => {
  const { clientData, setSelectedServiceId, selectedServiceId, setClientData, setSelectedClient, selectedClient } = ClientStory();
  const { genderIndex } = useAccardionStore();
  const { rating, value } = useCommunitySlider();
  const { userLocation } = useGetMeeStore();
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [bottomModal, setBottomModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleBottomModal = () => setBottomModal(!bottomModal);
  const { setMapData } = useMapStore();
  const navigate = useNavigation<any>();

  const fetchClientData = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (checked) {
        data = await getFreeTime();
      } else {
        const latitude = userLocation?.coords?.latitude || null;
        const longitude = userLocation?.coords?.longitude || null;
        postClientFilter([selectedServiceId], genderIndex, value, rating, latitude, longitude, searchValue);
      }
      setClientData(data);
    } catch (error) {
      console.error("Error fetching client data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedServiceId, genderIndex, value, rating, userLocation, checked, searchValue]);

  useFocusEffect(fetchClientData);

  useEffect(() => {
    fetchClientData();
  }, [searchValue]);

  useFocusEffect(
    useCallback(() =>{
      const latitude = userLocation?.coords?.latitude || null;
      const longitude = userLocation?.coords?.longitude || null;
      postClientFilter([selectedServiceId], genderIndex, value*1000, rating, latitude, longitude, searchValue).finally(() => {});
       return () => null
    },[])
   );

   useEffect(() =>{
      const latitude = userLocation?.coords?.latitude || null;
      const longitude = userLocation?.coords?.longitude || null;
      postClientFilter([selectedServiceId], genderIndex, value, rating, latitude, longitude, searchValue).finally(() => {});
    }, [searchValue]);   

    const handleFilterClick = async () => {
      setLoading(true);
      const latitude = userLocation?.coords?.latitude || null;
      const longitude = userLocation?.coords?.longitude || null;
      try {
        await postClientFilter([selectedServiceId], genderIndex, value, rating, latitude, longitude, searchValue, () => toggleBottomModal());
      } catch (error) {
        console.error("Error during filter:", error);
      } finally {
        setLoading(false);
        toggleBottomModal();
      }
    };
    
    const handleClientCardPress = (item: any) => {
      const client = {
        id: item.id,
        masterId: item.masterId,
        salon: item.salonName,
        imageUrl: item.imageUrl,
        name: item.fullName,
        zaps: item.nextEntryDate,
        masterType: item.masterSpecialization,
        orders: item.orderCount,
        feedbackCount: item.feedbackCount,
        clients: item.clientCount,
        address: `${item.district}, ${item.street}, ${item.house}`,
      };
      setSelectedClient(client);
      router.push('(client)/(uslugi)/(masterInformation)/masterInformation');
    };

  const renderClientCard = ({ item }) => (
    <View style={tw`mb-3`}>
      <ClientCard
        id={item.id}
         masterId={item.masterId}
        salon={item.salonName}
        imageUrl={item.imageUrl}
        name={item.fullName}
        zaps={item.nextEntryDate}
        masterType={item.masterSpecialization}
        orders={item.orderCount}
        feedbackCount={item.feedbackCount}
        clients={item.clientCount}
        address={`${item.district}, ${item.street}, ${item.house}`}
        onPress={() => handleClientCardPress(item)}
      />
    </View>
  );

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <NavigationMenu name={`Здоровье и красота волос`} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
      >
        <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
          <View style={[tw`flex flex-row items-center justify-between `]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[tw`flex-row items-center border px-8 py-3 rounded-xl`, { backgroundColor: '#9C0A35' }]}
              onPress={toggleBottomModal}
            >
              <Ionicons name="filter" size={24} color="white" />
              <Text style={[tw`text-white ml-2 text-xl`]}>Фильтр</Text>
            </TouchableOpacity>
            <View>
              <CustomCheckbox1
              value={checked}
              onValueChange={() => setChecked(!checked)}
              title="Запись на сегодня"
              onPress={getFreeTime}
            />
            </View> 
          </View>
          <LocationInput
            placeholder='🔍 Search'
            onChangeText={setSearchValue}
          />
          {loading ? (
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator size="large" color="#9C0A35" />
            </View>
          ) : (
            clientData?.length ? (
              <FlatList
                data={clientData}
                renderItem={renderClientCard}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={tw`pt-3`}
              />
            ) : (
              <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-white`}>No Data Available</Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
      <BottomModal
        isBottomModal={bottomModal}
        toggleBottomModal={toggleBottomModal}
        children={
          <View style={tw`w-full mt-3`}>
            <Text style={tw`text-xl text-center text-white font-bold mb-4`}>
              Фильтр
            </Text>
            <AccordionFree title="Пол мастера" />
            <AccardionSliderTwo title="Рейтинг" />
            <AccardionSlider title="Рядом со мной" />
            <View style={tw`mt-3`}>
              <Buttons
                title='Сохранять'
                onPress={handleFilterClick}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Specialist;
