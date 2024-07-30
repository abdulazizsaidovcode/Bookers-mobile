import Buttons from "@/components/(buttons)/button";
import { router, useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView, BackHandler } from "react-native";
import { useTranslation } from "react-i18next";
import "../../i18next";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
import { langstore } from "@/helpers/state_managment/lang/lang";
import Toast from "react-native-simple-toast";
import * as SecureStore from "expo-secure-store";

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "(auth)/auth"
>;

const Auth: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { language, setLanguage } = langstore();
  const [backPressCount, setBackPressCount] = useState(0);


  const changeLanguage = async (lng: string) => {
    i18n.changeLanguage(lng);
    await SecureStore.setItemAsync("selectedLanguage", lng);
    setLanguage(lng);
  };

  // navigatsiyani login registratsiyadan o'tganda bloklash
// useEffect(() => {
//   const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
//     e.preventDefault();
//   });

//   return unsubscribe;
// }, [navigation]);

// 2 marta orqaga qaytishni bosganda ilovadan chiqaradi
useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      if (backPressCount === 0) {
        setBackPressCount(backPressCount + 1);
        Toast.show('Orqaga qaytish uchun yana bir marta bosing', Toast.SHORT);
        setTimeout(() => {
          setBackPressCount(0);
        }, 2000); // 2 soniya ichida ikkinchi marta bosilmasa, holatni qayta boshlaydi
        return true; // Orqaga qaytishni bloklaydi
      } else {
        BackHandler.exitApp(); // Ilovadan chiqish
        return false;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [backPressCount])
);

  return (
    <SafeAreaView style={styles.container}>
      {/* <NavigationMenu name="" deleteIcon={false} key={1} /> */}
      <View style={styles.logo}>
        <Image source={require("../../assets/images/auth/logo.png")} />
      </View>
      <Text style={styles.title}>Bookers Beauty</Text>
      <Text style={styles.welcome}> </Text>
      <Text style={styles.selectLanguage}>Выберите язык</Text>
      <View style={styles.button}>
        <Buttons
          title="Русский"
          backgroundColor="#9C0A35"
          onPress={() => {
            router.push("(auth)/(login)/number-create");
            changeLanguage("ru");
          }}
        />
        <Buttons
          title="O‘zbek"
          backgroundColor="#9C0A35"
          onPress={() => {
            router.push("(auth)/(login)/number-create");
            changeLanguage("uz");
          }}
        />
        <Buttons
          title="English"
          backgroundColor="#9C0A35"
          onPress={() => {
            router.push("(auth)/(login)/number-create");
            changeLanguage("en");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 10,
  },
  welcome: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 5,
  },
  selectLanguage: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 15,
  },
});

export default Auth;
