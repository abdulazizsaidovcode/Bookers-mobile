import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import { getUserLocation } from '@/helpers/api-function/getMe/getMee';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import { getAllCategory } from '@/helpers/api-function/uslugi/uslugi';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';

interface Service {
  id: any;
  name: any;
  distanceMasterCount: number;
  icon?: string;
  onPress: () => void;
}

const ServiceCard: React.FC<Service> = ({ id, name, distanceMasterCount, onPress }) => {
  const staticIcon: any = "eye";
  return (
    <TouchableOpacity style={tw`w-1/2 px-2 py-2`} activeOpacity={0.8} onPress={onPress}>
      <View style={[tw`flex flex-col items-center rounded-3xl p-4 w-full h-50`, { backgroundColor: '#B9B9C9' }]}>
        <View style={[tw`rounded-full p-6 mb-2`, { backgroundColor: '#9C0A35' }]}>
          <MaterialCommunityIcons name={staticIcon} size={36} color="white" />
        </View>
        <Text style={[tw`text-lg font-bold text-center`]}>{name}</Text>
        <Text>Рядом с тобой {distanceMasterCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Uslugi = () => {
  const { userLocation, setUserLocation } = useGetMeeStore();
  const { allCategory, setSelectedServiceId } = ClientStory();
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      getUserLocation(setUserLocation);
      return () => {};
    }, [])
  );

  console.log(allCategory);

  useFocusEffect(
    React.useCallback(() => {
      getAllCategory();
      return () => {};
    }, [userLocation])
  );

  const renderItem = ({ item }: { item: Service }) => (
    <ServiceCard
      key={item.id}
      id={item.id}
      name={item.name}
      distanceMasterCount={item.distanceMasterCount}
      onPress={() => {
        setSelectedServiceId(item.id);
        router.push(`/(hairHealth)/hair`);
      }}
    />
  );

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <View style={[tw`flex-1 mt-10`, { backgroundColor: '#21212E' }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
          <View>
            <Text style={tw`text-white text-2xl mb-4 px-4`}>Uslugi</Text>
          </View>
          <FlatList
            data={allCategory}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Uslugi;
