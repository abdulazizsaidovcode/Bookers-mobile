import AsyncStorage from "@react-native-async-storage/async-storage";

export const clientIdStore = async (data: string) => {
    try {
        await AsyncStorage.setItem('clientID', data);
    } catch (e) {
        console.error(e);
    }
};

export const getClientIdStore = async (setData: (val: string) => void) => {
    try {
        const value = await AsyncStorage.getItem('clientID');
        if (value !== null) setData(value)
    } catch (e) {
        console.error(e);
    }
};

//auth
export const authStorage = async (token: string) => {
    try {
        await AsyncStorage.setItem('registerToken', token);
    } catch (e) {
        console.error(e);
    }
};