import { Text, View } from "@/components/Themed";
import React, { useCallback } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import {
  getNumbers,
  putNumbers,
} from "@/helpers/api-function/numberSittings/numbersetting";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import Buttons from "@/components/(buttons)/button";
import * as SecureStore from "expo-secure-store";
import {getUser} from "@/helpers/api-function/getMe/getMee";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import {getFile} from "@/helpers/api";
import {postTariff} from "@/app/(profile)/(tariff)/tariff";

const Uslugi = () => {
  const { number, setNumber } = numberSettingStore();
  const {getMee, setGetMee} = useGetMeeStore()

  useFocusEffect(
    useCallback(() => {
      getNumbers(setNumber);
      if (number.length === 0) {
        putNumbers(1);
      }
      getUser(setGetMee)
      return () => {}
    }, [number])
  )
  

  const removeDuplicates = (array: any) => {
    return [...new Set(array)];
  };

  const uniqueNumbers = removeDuplicates(number);

  const containsAllNumbers = (array: any) => {
    const requiredNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    return requiredNumbers.every(num => array.includes(num));
  };

  async function registered() {
    await SecureStore.setItemAsync('isCreate', 'true')
    await SecureStore.setItemAsync("tariff", 'all');
  }

  const data = [
    {
      title: "Услуги",
      description: "Ваша специализация и услуги",
      icon: <Feather name="check-circle" size={24} color="white" />,
    },
    {
      title: "График работы",
      description: "Планируйте своё рабочее время",
      icon: <FontAwesome5 name="calendar" size={24} color="white" />,
     
    },
    {
      title: "Локация",
      description: "Ваше мето работы",
      icon: <Entypo name="location" size={24} color="white" />,
      
    },
    {
      title: "Галерея",
      description: "Создавайте фото и видео галереи своих работ",
      icon: <MaterialIcons name="photo" size={24} color="white" />,
     
    },
    {
      title: "Онлайн бронирование",
      description: "Настройте записи на Ваши услуги",
      icon: <FontAwesome6 name="calendar-plus" size={24} color="white" />,
    },
    {
      title: "Уведомления",
      description: "Настройте уведомления",
      icon: <Ionicons name="notifications-outline" size={24} color="white" />,
      
    },
    {
      title: "Клиенты",
      description: "Добавьте своих клинетов",
      icon: <Fontisto name="persons" size={24} color="white" />,
   
    },
    {
      title: "Помощь",
      description: "Ознакомьтесь с документацией сервиса",
      icon: <AntDesign name="questioncircleo" size={24} color="white" />,
      
    },
  ];

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        
      > 
      <View>
        <Text>Hello</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Uslugi;

