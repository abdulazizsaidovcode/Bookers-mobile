import { Text, View } from "@/components/Themed";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import numberSettingStore from "@/helpers/state_managment/numberSetting/numberSetting";
import {
  getNumbers,
  putNumbers,
} from "@/helpers/api-function/numberSittings/numbersetting";

const Welcome = () => {
  const { number, setNumber } = numberSettingStore();

  useEffect(() => {
    if (number.length === 0) {
      putNumbers(1);
    }
    getNumbers(setNumber);
  }, []);


  const data = [
    {
      title: "Услуги",
      description: "Ваша специализация и услуги",
      icon: <Feather name="check-circle" size={24} color="white" />,
      onPress: () =>
        router.push("../(standart)/(services)/(myServices)/myServices"),
    },
    {
      title: "График работы",
      description: "Планируйте своё рабочее время",
      icon: <FontAwesome5 name="calendar" size={24} color="white" />,
      onPress: () => router.push("../(work-grafic)/workMain"),
    },
    {
      title: "Локация",
      description: "Ваше мето работы",
      icon: <Entypo name="location" size={24} color="white" />,
      onPress: () => router.push("../(location)/Location"),
    },
    {
      title: "Галерея",
      description: "Создавайте фото и видео галереи своих работ",
      icon: <MaterialIcons name="photo" size={24} color="white" />,
      onPress: () =>
        router.push("../(settings)/(settings-gallery)/settings-gallery-main"),
    },
    {
      title: "Онлайн бронирование",
      description: "Настройте записи на Ваши услуги",
      icon: <FontAwesome6 name="calendar-plus" size={24} color="white" />,
      onPress: () => router.push("../(standart)/(onlineBooking)/onlineBooking"),
    },
    {
      title: "Уведомления",
      description: "Настройте уведомления",
      icon: <Ionicons name="notifications-outline" size={24} color="white" />,
      onPress: () => router.push("../(profile)/(notification)"),
    },
    {
      title: "Клиенты",
      description: "Добавьте своих клинетов",
      icon: <Fontisto name="persons" size={24} color="white" />,
      onPress: () => router.push("../(free)/(client)/main"),
    },
    {
      title: "Помощь",
      description: "Ознакомьтесь с документацией сервиса",
      icon: <AntDesign name="questioncircleo" size={24} color="white" />,
      onPress: () => router.push("(free)/(help)/help"),
    },
  ];

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: "#21212E" }]}>
      <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          flexGrow: 1,
          justifyContent: "flex-start",
          backgroundColor: "#21212E",
        }}
      >
        {/* <View style={styles.topSection}> */}
          <View style={styles.progressBar}>
            {[...Array(8)].map((_, index) => (
              <View
                key={index}
                style={
                  number.includes(index + 1)
                    ? styles.progressIndicator
                    : styles.progressSegment
                }
              />
            ))}
          </View>
        {/* </View> */}
        <View style={[tw`items-center`, { backgroundColor: "#21212E" }]}>
          <Text style={tw`text-2xl font-bold text-white`}>
            Добро пожаловать!
          </Text>
          <View style={tw`bg-transparent text-center mt-5 relative`}>
            <Image
              style={tw`w-24 h-24 rounded-full`}
              source={require("../../assets/images/866-536x354.jpg")}
            />
            <View
              style={[
                tw`w-10 h-10 rounded-full items-center justify-center absolute -bottom-3 -right-2 border-4`,
                { backgroundColor: "#9c0935", borderColor: "#21212E" },
              ]}
            >
              <MaterialIcons name="edit" size={24} color="white" />
            </View>
          </View>
          <Text style={tw`text-2xl mt-4 font-bold text-white`}>
            Гузаль Шерматова
          </Text>
          <View
            style={[
              tw`p-4 w-full mt-5 rounded-3xl`,
              { backgroundColor: "#b9b9c9" },
            ]}
          >
            <Text style={tw`text-base text-center text-gray-500 p-2`}>
              А теперь мы поможем Вам настроить приложение что бы клиенты могли
              начать бронировать Ваши услуги.
            </Text>
          </View>
        </View>
        <View
          style={[
            tw`flex-1 w-full flex-row flex-wrap mt-6`,
            { backgroundColor: "#21212e" },
          ]}
        >
          {data.map((item, index) => {
            const isEnabled = number.includes(index + 1);
            return (
              <Pressable
                onPress={item.onPress}
                key={index}
                disabled={!isEnabled}
                style={({ pressed }) => [
                  tw`w-1/2 p-2`,
                  {
                    opacity: pressed ? 0.8 : isEnabled ? 1 : 0.5,
                  },
                ]}
              >
                <View
                  style={[
                    tw`flex rounded-3xl h-52 items-center py-5 px-2`,
                    { backgroundColor: "#b9b9c9" },
                  ]}
                >
                  <View style={[tw`w-full bg-transparent flex items-center`]}>
                    <View
                      style={[
                        tw`p-5 rounded-full flex items-center justify-center`,
                        { backgroundColor: "#9C0A35" },
                      ]}
                    >
                      {item.icon}
                    </View>
                  </View>
                  <Text
                    style={[
                      tw`text-lg text-black mt-3 font-bold text-center`,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={[tw`text-sm text-gray-600 text-center`]}>
                    {item.description}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  topSection: {
    flex: 1,
  },
  progressBar: {
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
    height: 5,
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 5,
  },
  progressIndicator: {
    flex: 1,
    backgroundColor: "#9C0A35",
    borderRadius: 5,
    marginHorizontal: 1,
  },
  progressSegment: {
    flex: 1,
    backgroundColor: "#8A8A8A",
    borderRadius: 5,
    marginHorizontal: 1,
  },
});
