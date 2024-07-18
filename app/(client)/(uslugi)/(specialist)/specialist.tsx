import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar, StyleSheet, Modal, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Buttons from '@/components/(buttons)/button'; // Importing the Buttons component
import NavigationMenu from '@/components/navigation/navigation-menu';
import { Fontisto } from '@expo/vector-icons';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import LocationInput from '@/app/locationInput';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';

const Specialist = () => {
  const { clientData } = ClientStory();
  console.log(clientData);
  

  const handEnd = () => {
    router.push('');
  };

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
              activeOpacity={0.8}
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
          {clientData ? (
            clientData.map((client:any, index:any) => (
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
            ))
          ) : (
            <Text style ={tw`text-xl text-white`}>Loading or no data available...</Text>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Specialist;
