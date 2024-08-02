import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Auth from "./(auth)/auth";
import CheckPinOnCome from "./(auth)/(checkPinCode)/checkPinCode";
import InstallPin from "./(auth)/(setPinCode)/installPin";
import { useNavigation } from "expo-router";
import { Loading } from "@/components/loading/loading";
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from "@/components/splashScreen";

const Index: React.FC = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const number = await SecureStore.getItemAsync("number");
        const password = await SecureStore.getItemAsync("password");
        console.log(`Number: ${number}`);
        console.log(`Password: ${password}`);
        
        // Agar number yoki password mavjud bo'lmasa, isFirstLaunch true bo'ladi
        setIsFirstLaunch(number === null && password === null);
      } catch (error) {
        console.error("Error checking secure store:", error);
        // Xatolik yuz bersa, barcha saqlangan ma'lumotlarni o'chiring
        await SecureStore.deleteItemAsync("number");
        await SecureStore.deleteItemAsync("password");
      }
    };

    const hideSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();
    };

    hideSplashScreen();
    checkFirstLaunch();
  }, []);

  const handleSplashFinish = () => {
    setIsSplashScreenVisible(false);
  };

  if (isSplashScreenVisible) {
    return <SplashScreenComponent onFinish={handleSplashFinish} />;
  }

  if (isFirstLaunch === null) {
    return <Loading />;
  }

  if (isFirstLaunch) {
    return <Auth />;
  }

  return <CheckPinOnCome />;
};

export default Index;
