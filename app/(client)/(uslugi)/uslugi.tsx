import NavigationMenu from '@/components/navigation/navigation-menu';
import { handleRefresh } from '@/constants/refresh';
import { AntDesign } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router'; // Import the useRouter hook

import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Hair from './(hairHealth)/hair';

interface Service {
    id: any;
    title: string;
    distance: string;
    icon: any;
    onPress:any;
  }


const services = [
  { id: 1, title: "Здоровье и красота волос", distance: "450", icon: "rightcircleo",  onPress: () => router.push("(hairHealth)/hair" ) },
  { id: 2, title: "Ногтевой сервис", distance: "75", icon: "rightcircleo", onPress: () => router.push("./(location)/Location" ) },
  { id: 3, title: "Ресницы и брови", distance: "322", icon: "eyeo", onPress: () => router.push("../(location)/Location" ) },
  { id: 4, title: "Уход за телом", distance: "456", icon: "rightcircleo", onPress: () => router.push("../(location)/Location" ) },
  { id: 5, title: "Уход за лицом", distance: "210", icon: "rightcircleo" , onPress: () => router.push("../(location)/Location" )},
  { id: 6, title: "Наращивание волосных прядей", distance: "120", icon: "rightcircleo", onPress: () => router.push("../(location)/Location" ) },
  { id: 7, title: "Маникюр и педикюр", distance: "180", icon: "rightcircleo", onPress: () => router.push("../(location)/Location" ) },
  { id: 8, title: "Массаж", distance: "300", icon: "rightcircleo", onPress: () => router.push("../(location)/Location" ) }
];

const ServiceCard: React.FC<Service> = ({ title, distance, icon, onPress }) => {
  const router = useRouter(); // Initialize the useRouter hook

  return (
    <TouchableOpacity style={tw`w-1/2 px-2 py-2`} activeOpacity={0.8} onPress={onPress}>
      <View style={[tw`flex flex-col items-center rounded-2xl p-4 w-full h-56`, { backgroundColor: '#B9B9C9' }]}>
        <View style={[tw`rounded-full p-6 mb-2`, { backgroundColor: '#9C0A35' }]}>
          <AntDesign name={icon} size={36} color="white" />
        </View>
        <Text style={[tw`text-lg font-bold text-center`]}>{title}</Text>
        <Text>Рядом с тобой {distance}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Uslugi = () => {
  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <View style={[tw`flex-1 mt-10`, { backgroundColor: '#21212E' }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[tw`px-4 flex-grow`, { backgroundColor: '#21212E' }]}>
          <Text style={[tw`font-bold text-2xl text-white mb-6`]}>Услуги</Text>
          <View style={tw`w-full flex flex-row flex-wrap mb-4`}>
            {services.map(service => (
               <ServiceCard key={service.id} title={service.title} distance={service.distance} icon={service.icon} onPress={service.onPress}  />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Uslugi;
