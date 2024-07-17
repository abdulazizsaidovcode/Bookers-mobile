import axios from "axios";
import { getMe } from "../../api";
import { GetMee, UserLocation } from "@/type/getMee";
import { getConfig } from "@/app/(tabs)/(master)/main";
import * as Location from 'expo-location'
import { Alert } from "react-native";

export const getUser = async (setGetMee: (val: GetMee) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(getMe, config);
        if (data.success) {
            setGetMee(data.body);
        }
    } catch { }
}

export const getUserLocation = async (setLocation: (val: UserLocation) => void) => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
        Alert.alert('Please grant location permissions');
        return
    }

    let currentLocation = await Location.getCurrentPositionAsync({})
    setLocation(currentLocation)
    console.log('Location', currentLocation);
    
}
