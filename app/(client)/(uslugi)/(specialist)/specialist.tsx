import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Fontisto } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
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
import { getConfig } from '@/app/(tabs)/(master)/main';
import axios from 'axios';
import { getClient_freeTime } from '@/helpers/api';

const Specialist = () => {
  const { clientData, setSelectedServiceId, selectedServiceId, setClientData } = ClientStory();
  const { genderIndex } = useAccardionStore();
  const { rating, value } = useCommunitySlider();
  const { userLocation } = useGetMeeStore();
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [bottmModal, setBottomModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleBottomModal = () => setBottomModal(!bottmModal);

  const handleFree = async () => {
    setLoading(true);
    try {
      const freeTimeData = await getFreeTime();
      setClientData(freeTimeData);
    } catch (error) {
      console.log("Error fetching free time data:", error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);   
        try {  
          if (checked) {
            const freeTimeData = await getFreeTime();
            setClientData(freeTimeData);
          } else {
            const latitude = userLocation?.coords?.latitude || null;
            const longitude = userLocation?.coords?.longitude || null;
            const filteredData = await postClientFilter([selectedServiceId], genderIndex, value, rating, latitude, longitude, searchValue);
            setClientData(filteredData);
          }
        } catch (error) {
          console.log("Error fetching client data:", error);
        } 
        finally {
          setLoading(false);
        }
      };
      fetchData();
      return () => null
    }, [selectedServiceId, genderIndex, value, rating, userLocation, checked, searchValue])
  );
  
 useEffect(
  useCallback(() => {
    const latitude = userLocation?.coords?.latitude || null;
    const longitude = userLocation?.coords?.longitude || null;
    postClientFilter([selectedServiceId], genderIndex, value, rating, latitude, longitude, searchValue).finally(() => {});
  }, [searchValue])
);   

  const handleClick = () => {
    const latitude = userLocation?.coords?.latitude || null;
    const longitude = userLocation?.coords?.longitude || null;
    postClientFilter([selectedServiceId], genderIndex, value, rating, latitude, longitude, searchValue).finally(() => {
      toggleBottomModal();
    });  
  }; 

  // useFocusEffect(
  //   useCallback(() =>{
  //     postClientFilter()
  //      return () => null
  //   },[])
  //  )

  const handleClientCardPress = (id:any) => {
    console.log("Client ID:", clientData);
    router.push('(client)/(uslugi)/(masterInformation)/masterInformation');
  }; 
  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <NavigationMenu name={`Здоровье и красота волос`} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}
      >
        <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
          <View style={[tw`flex flex-row items-center justify-between mb-2`]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[tw`flex-row items-center border px-8 py-3  rounded-xl`, { backgroundColor: '#9C0A35' }]}
              onPress={toggleBottomModal}
            >
              <Fontisto name="arrow-swap" size={24} color="white" />
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
          <View style={tw`mb-3`}>
            <LocationInput
              placeholder='🔍 Search'
              onChangeText={setSearchValue}
            />
          </View>
          {loading ? (
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator size="large" color="#9C0A35" />
            </View>
          ) : (
            clientData && clientData ? (
              clientData.map((client: any, index: any) => (
                <View key={index} style={tw`mb-3`}>
                  <ClientCard
                    id={client.id}
                    salon={client.salonName}
                    imageUrl={client.imageUrl}
                    name={client.fullName}
                    zaps={client.nextEntryDate}
                    masterType={client.masterSpecialization}
                    orders={client.orderCount}
                    feedbackCount={client.feedbackCount}
                    clients={client.clientCount}
                    address={`${client.district}, ${client.street}, ${client.house}`}
                    onPress={() => handleClientCardPress(client.id)}
                  />
                </View>
              ))
            ) : (
              <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-white`}>No Data Available</Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
      <BottomModal
        isBottomModal={bottmModal}
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
                onPress={handleClick}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Specialist;
