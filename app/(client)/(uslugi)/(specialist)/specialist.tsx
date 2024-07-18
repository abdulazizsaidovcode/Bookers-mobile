import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StatusBar, StyleSheet, Modal, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Buttons from '@/components/(buttons)/button'; // Importing the Buttons component
import NavigationMenu from '@/components/navigation/navigation-menu';
import { Fontisto } from '@expo/vector-icons';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import LocationInput from '@/app/locationInput';
import { router, useFocusEffect } from 'expo-router';
import { postClientFilter } from '@/helpers/api-function/uslugi/uslugi';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { useAccardionStore } from '@/helpers/state_managment/accardion/accardionStore';
import useGetMeeStore from '@/helpers/state_managment/getMee';


const Specialist = () => {
  const { allCategory, setSelectedServiceId } = ClientStory();
  const { setExpanded,setGenderIndex,setSelection} = useAccardionStore();
  const { userLocation, setUserLocation } = useGetMeeStore();
  const clientData = [
    {
      imageUrl: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig/IMG%20Worlds%20of%20Adventure%20Admission%20Ticket%20in%20Dubai%20-%20Klook.jpg',
      name: 'Натали',
      masterType: 'Женский мастер',
      orders: 12,
      clients: 10,
      address: 'Ближайшая запись: Пт, 16 февраля',
    },
    // ... Add more client data here
  ];

  console.log( "category" , allCategory);
  
  useFocusEffect(
    React.useCallback(() => {
      postClientFilter(`${setSelectedServiceId}`,setGenderIndex, setExpanded,userLocation.coords.latitude,userLocation.coords.longitude);
      return () => {};
    },[])
  );

  const handEnd = () =>{
    router.push('')
  }

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <NavigationMenu name={`Здоровье и красота волос`} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
        <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
          <View style={[tw`flex flex-row items-center justify-between mb-2 `]}>
            <TouchableOpacity
              activeOpacity={.8}
              style={[tw`flex-row items-center border px-8 py-3 rounded-xl`, { backgroundColor: '#9C0A35' }]}
              onPress={handEnd}>
              <Fontisto name="arrow-swap" size={24} color="white" />
              <Text style={[tw`text-white ml-2 text-xl`]}>Фильтр</Text>
            </TouchableOpacity>
            <Text style={tw`text-white`}>Запись на сегодня</Text>
          </View>
          <View style={tw`mb-6`}>
            <LocationInput placeholder='🔍 Search' />
          </View>
          {clientData.map((client, index) => (
            <View key={index} style={tw`mb-3`}>
              <ClientCard
                imageUrl={client.imageUrl}
                name={client.name}
                masterType={client.masterType}
                orders={client.orders}
                clients={client.clients}
                address={client.address}
              />
            </View>
          ))}
        </View>
      </ScrollView>  
    </SafeAreaView>
  );
};

export default Specialist;
