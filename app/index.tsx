import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import Auth from "./(auth)/auth";
import CheckPinOnCome from "./(auth)/(checkPinCode)/checkPinCode";
import InstallPin from "./(auth)/(setPinCode)/installPin";
import { useNavigation } from "expo-router";
import { Loading } from "@/components/loading/loading";
import * as SplashScreen from 'expo-splash-screen';
import { Video } from 'expo-av';

const Index: React.FC = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);
  const navigation = useNavigation<any>();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    // Splash screen remains visible while we load our video
    SplashScreen.preventAutoHideAsync();

    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    };

    

    
    // Check if it's the first launch
    const checkFirstLaunch = async () => {
      try {
        const number = await SecureStore.getItemAsync("number");
        const password = await SecureStore.getItemAsync("password");
        console.log(`Number: ${number}`);
        console.log(`Password: ${password}`);
        
        // If number or password are missing, set isFirstLaunch to true
        setIsFirstLaunch(number === null && password === null);
      } catch (error) {
        console.error("Error checking secure store:", error);
        // On error, clear all stored data
        await SecureStore.deleteItemAsync("number");
        await SecureStore.deleteItemAsync("password");
      }
    };

    prepare();
    checkFirstLaunch();
  }, []);
  
  // Function to handle video load
  const handleVideoLoad = () => {
    setIsVideoReady(true);
  };

  // Function to handle video end
  const handleVideoEnd = async () => {
    await SplashScreen.hideAsync();
    setIsVideoReady(false);
  };
  // Determine if the device is a tablet
  const isTablet = () => {
    const { height, width } = Dimensions.get('window');
    return Math.min(height, width) >= 600;
  };

  if (!isVideoReady) {
    const videoUri = isTablet() ? "../assets/onCome.mp4" : "../assets/onCome.mp4";
    return (
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        resizeMode={'contain'}
        shouldPlay
        onLoad={handleVideoLoad}
        onEnd={handleVideoEnd}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }

  if (isFirstLaunch === null) {
    return (
      <Loading />
    );
  }

  if (isFirstLaunch) {
    return <Auth />;
  }

  return <CheckPinOnCome />;
};

export default Index;
