import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView, View, StatusBar, Text, TouchableOpacity, FlatList, Linking, Alert, Image,
  Dimensions, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ClientCardDetail from '@/components/(cliendCard)/clientCardDetail';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { FontAwesome6, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { getMasterGallery, getMasterOtzif, getMAstersServeses, ServicesClient } from '@/helpers/api-function/uslugi/uslugi';
import { useMapStore } from '@/helpers/state_managment/map/map';
import { useFocusEffect, useNavigation } from 'expo-router';
import ClientCardUslugi from '@/components/(cliendCard)/clientCardUslugi';
import Buttons from '@/components/(buttons)/button';
import { getFile } from '@/helpers/api';
import CustomButton1 from './CustomButton';
import ReviewCard from '@/components/(cliendCard)/riewCard';
import ClientFeedback from "@/app/(client)/(uslugi)/(masterInformation)/components/fedbek";
import MasterInformationGalery from './components/galery';
import MasterCardUslugi from '@/components/(cliendCard)/masterCardUslugi';
import { fetchFavouriteOrders } from '@/helpers/api-function/favourite-orders/favourite-orders';
import useFavoutite from '@/helpers/state_managment/favourite';
import useFavoutiteOrders from '@/helpers/state_managment/favourite-orders/favourite-orders';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const MasterInformation = () => {
  const { selectedClient, masterServis, masterGallery, feedbackForMaster, clientData } = ClientStory();
  const {favouriteOrders, setFavouriteOrders, setIsLoading} = useFavoutiteOrders()
  const [activeTab, setActiveTab] = useState<string | null>('upcoming');
  const [selectedCategorys, setSelectedCategories] = useState<any>('vse');
  const [selectedService, setSelectedService] = useState<any>(null);
  const { setMapData } = useMapStore();
  const navigate = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      if (selectedClient) {
        const id = selectedClient.id;

        getMasterOtzif(id);
        getMAstersServeses(id);
        getMasterGallery(id);
      }
      return () => null;
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      fetchFavouriteOrders(setFavouriteOrders, setIsLoading)
    }, [])
  )
  useFocusEffect(
    useCallback(() => {
      setSelectedService(masterServis)
    }, [masterServis])
  )

  setTimeout(() => {
    console.log(selectedClient);
  }, 1000)

  const renderItem = ({ item }: any) => (
    <View style={tw`mb-4`}>
      <Text style={tw`text-white`}>{item.clientName}</Text>
      <Text style={tw`text-gray-400`}>{item.text}</Text>
    </View>
  );

  const handleTabChange = (tab: any) => {
    setSelectedCategories(tab)
  };

  console.log(clientData);

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <NavigationMenu name={`Подробнее OOOO`} />
      <View style={tw`flex flex-row mb-5 p-3`}>
        <CustomButton1
          borderColor='#9E9E9E'
          title="Услуги"
          onPress={() => setActiveTab('upcoming')}
          active={activeTab === 'upcoming'}
          textColor='#9E9E9E'
        />
        <CustomButton1
          title="Галерея"
          borderColor='#9E9E9E'
          onPress={() => setActiveTab('past')}
          active={activeTab === 'past'}
          textColor='#9E9E9E'
        />
        <CustomButton1
          title="Отзывы"
          borderColor='#9E9E9E'
          onPress={() => setActiveTab('pastStart')}
          active={activeTab === 'pastStart'}
          textColor='#9E9E9E'
        />
      </View>
      {activeTab === 'upcoming' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
          <View style={tw`mb-5`}>
            {clientData && 
                <View style={tw`mb-4`}>
                  <MasterCardUslugi
                    item={clientData}
                    favouriteOrders={favouriteOrders}
                    onPress={() => { }}
                  />
                </View>
              }
          </View>
          <View style={tw`mb-4`}>
            <Text style={tw`text-2xl text-white font-bold`}>Услуги {selectedClient?.name}</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ gap: 10, marginBottom: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            {masterServis && <View >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleTabChange('vse')}
                style={[
                  styles.categoryCard,
                  selectedCategorys == 'vse' ? { backgroundColor: '#B9B9C9' } : { borderColor: '#828282', borderWidth: 1 }
                ]}
              >
                <Text style={[tw`text-white text-center`, { color: selectedCategorys == 'vse' ? '#000' : '#828282' }]}>Все</Text>
              </TouchableOpacity>
            </View>
            }
            {selectedService && selectedService.map((service: any) => (
              <View key={service.id}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleTabChange(service.id)}
                  style={[
                    styles.categoryCard,
                    selectedCategorys == service.id ? { backgroundColor: '#B9B9C9' } : { borderColor: '#828282', borderWidth: 1 }
                  ]}
                >
                  <Text style={[tw`text-white text-center`, { color: selectedCategorys !== service.id ? '#828282' : '#000' }]}>{service.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <FlatList
            data={masterServis}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={tw`mb-4`}>
                <ClientCardDetail item={item} />
              </View>
            )}
          />
          <View style={tw`mb-4 `}>
            <Buttons
              isDisebled={masterServis.length > 0}
              onPress={() => {
                navigate.navigate('(client)/(oreder)/order', { id: {} });
              }} title='Продолжить' />
          </View>
        </ScrollView>
      )}
      {activeTab === 'past' && <MasterInformationGalery/>}
      {activeTab === 'pastStart' && <ClientFeedback />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 5,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#828282'
  },

});

export default MasterInformation;
