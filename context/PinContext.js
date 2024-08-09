import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from 'expo-splash-screen';
import CheckPinCode from "@/app/(auth)/(checkPinCode)/checkPinCodeAbsolute";
import { useFocusEffect } from "expo-router";

const PinCodeContext = createContext(null);

export const usePinCode = () => {
  return useContext(PinCodeContext);
};

export const PinCodeProvider = ({ children }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [showPinScreen, setShowPinScreen] = useState(false);
  const timer = useRef(null);
  const appState = useRef(AppState.currentState);

  

  const resetTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setShowPinScreen(true);
    }, 5000); // 1 daqiqadan so'ng parol oynasini ko'rsatish
  }, []);

  const handleAppStateChange = useCallback((nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      resetTimer(); // Foydalanuvchi ilovaga qaytsa timerni qayta boshlash
    }

    appState.current = nextAppState;
  }, [resetTimer]);

  useFocusEffect(
    useCallback(() => {
      async function prepare() {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await SplashScreen.hideAsync();
      }

      prepare();

      const checkFirstLaunch = async () => {
        try {
          const number = await SecureStore.getItemAsync("number");
          const password = await SecureStore.getItemAsync("password");

          setIsFirstLaunch(number === null && password === null);
        } catch (error) {
          console.error("Error checking secure store:", error);
          await SecureStore.deleteItemAsync("number");
          await SecureStore.deleteItemAsync("password");
        }
      };

      checkFirstLaunch();
      resetTimer(); // App holatini o'zgartirishdan oldin timerni yoqish

      const subscription = AppState.addEventListener("change", handleAppStateChange);
      return () => {
        if (timer.current) clearTimeout(timer.current);
        subscription.remove();
      };
    }, [handleAppStateChange, resetTimer])
  )

  return (
    <PinCodeContext.Provider value={{ showPinScreen, setShowPinScreen }}>
      {showPinScreen ? <CheckPinCode onSuccess={() => setShowPinScreen(false)} /> : children}
    </PinCodeContext.Provider>
  );
};
