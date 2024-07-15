import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Buttons from '@/components/(buttons)/button'; // Importing the Buttons component
import NavigationMenu from '@/components/navigation/navigation-menu';

const Specialist = () => {
  const onPress = () => {
    // Handle onPress functionality here
    console.log('Button pressed');
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <NavigationMenu name={`Здоровье и красота волос`} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
        <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
          <View style={[tw`flex flex-row items-center justify-between mb-4`]}>
            <Buttons title='Фильтр' onPress={onPress} /> {/* Using the Buttons component */}
            <Text style={tw`text-white`}>Запись на сегодня</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Specialist;
