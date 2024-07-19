import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { Fontisto } from '@expo/vector-icons';
import ClientCard from '@/components/(cliendCard)/cliendCard';
import LocationInput from '@/app/locationInput';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import CustomCheckbox1 from '@/components/checkbox/checkbox1';
import { postClientFilter } from '@/helpers/api-function/uslugi/uslugi';
import { useAccardionStore } from '@/helpers/state_managment/accardion/accardionStore';
import { useCommunitySlider } from '@/helpers/state_managment/communitySlider/communitySliderStore';
import useGetMeeStore from '@/helpers/state_managment/getMee';

const Specialist = () => {
  const { clientData, setSelectedServiceId, selectedServiceId, allCategory } = ClientStory();
  const { isSelected } = useAccardionStore();
  const { genderIndex } = useAccardionStore();
  const { rating, value } = useCommunitySlider();
  const { userLocation } = useGetMeeStore();
  
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handEnd = () => {
    router.push('');
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  useFocusEffect(
    React.useCallback(() => {  
      const latitude = userLocation?.coords?.latitude || null;
      const longitude = userLocation?.coords?.longitude || null;

      setLoading(true);
      postClientFilter(setSelectedServiceId, genderIndex, value, rating, latitude, longitude)
        .finally(() => {
          setLoading(false);
        });

      return () => {};
    }, [setSelectedServiceId, rating, genderIndex, value])
  );

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <NavigationMenu name={`Здоровье и красота волос`} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
        <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
          <View style={[tw`flex flex-row items-center justify-between mb-2`]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[tw`flex-row items-center border px-8 py-3 rounded-xl`, { backgroundColor: '#9C0A35' }]}
              onPress={toggleModal}>
              <Fontisto name="arrow-swap" size={24} color="white" />
              <Text style={[tw`text-white ml-2 text-xl`]}>Фильтр</Text>
            </TouchableOpacity>
            <View style={tw`mt-3`}>
              <CustomCheckbox1 title="Запись на сегодня" />
            </View>
          </View>
          <View style={tw`mb-6`}>
            <LocationInput placeholder='🔍 Search' />
          </View>
          {loading ? (
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator size="large" color="#9C0A35" />
            </View>
          ) : clientData && clientData.length > 0 ? (
            clientData.map((client: any, index: any) => (
              <View key={index} style={tw`mb-3`}>
                <ClientCard
                  salon={client.salonName}
                  imageUrl={client.imageUrl}
                  name={client.fullName}
                  zaps={client.nextEntryDate}
                  masterType={client.masterSpecialization}
                  orders={client.orderCount}
                  clients={client.clientCount}
                  address={`${client.district}, ${client.house}`}
                />
              </View>
            ))
          ) : (
            <Text style={tw`text-xl text-white text-center mb-10`}>Bunday ma'lumot topilmadi</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Specialist;
