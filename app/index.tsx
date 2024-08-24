import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, AppState, AppStateStatus } from "react-native";
import CheckPinCode from "./(auth)/(checkPinCode)/checkPinCodeAbsolute";
import CheckPinOnCome from "./(auth)/(checkPinCode)/checkPinCode";
import Auth from "./(auth)/auth";
import { useNavigation } from "expo-router";
import { Loading } from "@/components/loading/loading";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from 'expo-splash-screen';

const Index: React.FC = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);
  const navigation = useNavigation<any>();
  const [showPinScreen, setShowPinScreen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    }

    prepare();
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

    checkFirstLaunch();
  }, []);


  const resetTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setShowPinScreen(true);
    }, 1000); // 1 daqiqadan so'ng parol oynasini ko'rsatish
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      resetTimer(); // Foydalanuvchi ilovaga qaytsa timerni qayta boshlash
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    resetTimer();

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    console.log(subscription);
    
    return () => {
      if (timer.current) clearTimeout(timer.current);
      subscription.remove();
    };
  }, [resetTimer]);
  

  if (isFirstLaunch === null) {
    return <Loading />;
  }

  if (isFirstLaunch) {
    return <Auth />;
  }
  // if (showPinScreen) {
  //   return <CheckPinCode onSuccess={() => setShowPinScreen(false)} />;
  // }
  return <CheckPinOnCome />;
};

export default Index;