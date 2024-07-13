import { onlineBookingAllowClient_url, onlineBookingHallWaitin_url, onlineBookingUgly_url, onlineBookingUserviceTimeAll_url, onlineBookingUserviceTimeservice_url, onlineConfirmationServices_url } from "@/helpers/api";
import axios from "axios";
import { Alert } from "react-native"
import { IsActive } from "@/helpers/state_managment/onlinBooking/onlineBooking";
import { getConfig } from '@/app/(tabs)/main'


export const onlineBookingAllowClient = async (isEnabled: boolean) => {
    try {
        if (isEnabled === true || isEnabled === false) {
            const config = await getConfig();
            const res = await axios.put(`${onlineBookingAllowClient_url}?allowClient=${isEnabled}`, {}, config);
            if (res.data.success) {
                Alert.alert("Изменены разрешения для клиентов");
            } else {
                Alert.alert("Во время конвертации произошла ошибка");
            }
        }
    } catch (error) {
        Alert.alert("Во время конвертации произошла ошибка");
    }
};

export const getOnlineBookingAllowClient = async (setData: (val: boolean) => void) => {
    try {
        const config = await getConfig();
        const res = await axios.get(`${onlineBookingAllowClient_url}`, config);
        if (res.data.success) {
            setData(res.data.body);
        } else {
            setData(false);
        }
    } catch (error) {
        setData(false);
    }
};

export const onlineBookingSettingsUrgently = async (isEnabled: boolean) => {
    try {
        if (isEnabled === true || isEnabled === false) {
            const config = await getConfig();
            const res = await axios.post(`${onlineBookingUgly_url}?isUrgent=${isEnabled}`, {}, config);
            console.log(res.data);

            if (res.data.success) {
                Alert.alert("успешно изменено");
            } else {
                Alert.alert("Произошла ошибка при конвертации");
            }
        }
    } catch (error) {
        Alert.alert("Произошла ошибка при конвертации");
    }
};

export const GetOnlineBookingSettingsUrgently = async (setStatus: any) => {
    try {
        const config= await getConfig()
        const res = await axios.get(onlineBookingUgly_url,config);
        setStatus(res.data.body);
    } catch (error) {
        console.log(error);
        // Handle errors as needed
    }
};

export const OnlineBookingUserviceTimeAll = async (val: object) => {
    try {
        if (val) {
            const config = await getConfig();
            const res = await axios.post(`${onlineBookingUserviceTimeAll_url}`, val, config);

            if (res.data.success) {
                Alert.alert("Изменения сохранены");
            } else {
                Alert.alert("Произошла ошибка при конвертации");
            }
        }
    } catch (error) {
        Alert.alert("Произошла ошибка при конвертации");
    }
};

export const OnlineBookingUserviceTimeService = async (val: object) => {
    try {
        if (val) {
            const config = await getConfig();
            let data = [
                { ...val }
            ];
            const res = await axios.post(`${onlineBookingUserviceTimeservice_url}`, data, config);

            if (res.data.success) {
                Alert.alert("Изменения сохранены");
            } else {
                Alert.alert("Произошла ошибка при конвертации");
            }
        }
    } catch (error) {
        console.log(error);
        Alert.alert("Произошла ошибка при конвертации");
    }
};

export const onlineConfirmationServices = async (isEnabled: boolean, isEnabled2: boolean, isEnabled3: boolean) => {
    try {
        const data = {
            "allClient": isEnabled,
            "newClient": isEnabled2,
            "notConfirm": isEnabled3
        };
        const config = await getConfig();
        const res = await axios.post(`${onlineConfirmationServices_url}`, data, config);

        Alert.alert("Настройки онлайн-бронирования подтвердили разрешение");
    } catch (error) {
        console.log(error);
        Alert.alert("Произошла ошибка при проверке настроек онлайн-бронирования.");
    }
};

export const getOnlineConfirmationServices = async (setData: (val: IsActive | null) => void) => {
    try {
        const config = await getConfig();
        const res = await axios.get(`${onlineConfirmationServices_url}`, config);

        if (res.data.success) {
            setData(res.data.body);
        } else {
            setData(null);
        }
    } catch (error) {
        console.log(error);
        setData(null);
    }
};

// hall waiting post API function 

export const onlineBookingHallWaiting = async (isEnabled: boolean, isEnabled2: boolean) => {
    try {
        const data = {
            allClient: isEnabled,
            regularClient: isEnabled2
        };
        const config = await getConfig();
        const res = await axios.post(`${onlineBookingHallWaitin_url}`, data, config);

        Alert.alert("Success hall");
    } catch (error) {
        console.log(error);
        Alert.alert("Not success hall");
    }
};


//hall waiting get API function
export const getOnlineBookingHallWaiting = async (setData: (val: any | null) => void) => {
    try {
        const config = await getConfig();
        const res = await axios.get(`${onlineBookingHallWaitin_url}`, config);

        setData(res.data.body);
    } catch (error) {
        console.log(error);
        // Handle errors as needed
    }
};