import axios from "axios";
import { getMe } from "../../api";
import { GetMee } from "@/type/getMee";
import { getConfig } from "@/app/(tabs)/(master)/main";
import * as Location from "expo-location";
import { Alert } from "react-native";

export const getUser = async (
  setGetMee: (val: GetMee) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    const config = await getConfig();
    const { data } = await axios.get(getMe, config ? config : {});
    if (data.success) {
      setIsLoading ? setIsLoading(false) : () => {};
      setGetMee(data.body);
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
    }
  } catch {
    setIsLoading ? setIsLoading(false) : () => {};
  }
};

export const getUserLocation = async (setLocation: (val: any) => void) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Please grant location permissions");
    return;
  }
  let currentLocation = await Location.getCurrentPositionAsync({});
  setLocation(currentLocation);
};
