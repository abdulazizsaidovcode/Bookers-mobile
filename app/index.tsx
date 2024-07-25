import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import Auth from "./(auth)/auth";
import CheckPinOnCome from "./(auth)/(checkPinCode)/checkPinCode";
import InstallPin from "./(auth)/(setPinCode)/installPin";
import { useNavigation } from "expo-router";

const Index: React.FC = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await SecureStore.getItemAsync("number");
        setIsFirstLaunch(value === null);
      } catch (error) {
        await SecureStore.deleteItemAsync("number");
        console.log(error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"#9C0A35"} />
      </View>
    );
  }


  if (!isFirstLaunch) {
    return <Auth />;
  }

  return <CheckPinOnCome />;
};

export default Index;
