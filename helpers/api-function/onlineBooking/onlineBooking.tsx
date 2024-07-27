import { onlineBookingAllowClient_url, onlineBookingHallWaitin_url, onlineBookingRecordDay_url, onlineBookingUgly_url, onlineBookingUserviceTimeAll_url, onlineBookingUserviceTimeservice_url, onlineConfirmationServices_url } from "@/helpers/api";
import axios from "axios";
import { Alert } from "react-native"
import Toast from "react-native-simple-toast"
import { IsActive } from "@/helpers/state_managment/onlinBooking/onlineBooking";
import { getConfig } from '@/app/(tabs)/(master)/main'


export const onlineBookingAllowClient = async (isEnabled: boolean) => {
    try {
        if (isEnabled === true || isEnabled === false) {
            const config = await getConfig();
            const res = await axios.put(`${onlineBookingAllowClient_url}?allowClient=${isEnabled}`, {}, config ? config : {});
            if (res.data.success) {
                Toast.show(res.data.message, Toast.SHORT);
            }
        }
    } catch (error: any) {
        Toast.show(error.response.data.message, Toast.SHORT);

    }
};

export const getOnlineBookingAllowClient = async (setData: (val: boolean) => void) => {
    try {
        const config = await getConfig();
        const res = await axios.get(`${onlineBookingAllowClient_url}`, config ? config : {});
        if (res.data.success) {
            setData(res.data.body);
        } else {
            setData(false);
        }
    } catch (error) {
        setData(false);
    }
};

export const onlineBookingSettingsUrgently = async (isEnabled: boolean, setIsEnabled: (data: boolean) => void) => {
    try {
        if (isEnabled === true || isEnabled === false) {
            const config = await getConfig();
            const res = await axios.post(`${onlineBookingUgly_url}?isUrgent=${isEnabled}`, {}, config ? config : {});

            if (res.data.success) {
                Toast.show(res.data.message, Toast.SHORT);
                setIsEnabled(isEnabled)
            } else {
                Toast.show(res.data.message, Toast.SHORT);
            }
        }
    } catch (error) {
        Alert.alert(`${error}`);        
    }
};

export const GetOnlineBookingSettingsUrgently = async (setStatus: any) => {
    try {
        const config = await getConfig()
        const res = await axios.get(onlineBookingUgly_url, config ? config : {});
        setStatus(res.data.body);
    } catch (error) {
        console.log(error);
        setStatus(false);
    }
};

export const OnlineBookingUserviceTimeAll = async (val: object) => {
    try {
        if (val) {
            const config = await getConfig();
            const res: any = await axios.post(`${onlineBookingUserviceTimeAll_url}`, val, config ? config : {});

            if (res.data.success) {
                Toast.show(res.data.message, Toast.SHORT);
            }
        }
    } catch (error: any) {
        Toast.show(error.response.data.message, Toast.SHORT);
    }
};

export const OnlineBookingUserviceTimeService = async (val: object) => {
    try {
        if (val) {
            const config = await getConfig();
            let data = [
                { ...val }
            ];
            const res: any = await axios.post(`${onlineBookingUserviceTimeservice_url}`, data, config ? config : {});

            if (res.data.success) {
                Toast.show(res.message, Toast.SHORT);
            }
        }
    } catch (error: any) {
        Toast.show(error.response.data.message, Toast.SHORT);
    }
};

export const onlineConfirmationServices = async (isEnabled: boolean, isEnabled2: boolean, isEnabled3: boolean) => {
    try {
        const data = {
            "allClient": isEnabled,
            "newClient": isEnabled2,
            "notConfirm": isEnabled3
        };
        console.log(data);

        const config = await getConfig();
        const res = await axios.post(`${onlineConfirmationServices_url}`, data, config ? config : {});
        Toast.show(res.data.message, Toast.SHORT);
    } catch (error: any) {
        Toast.show(error.response.data.message, Toast.SHORT);

    }
};

export const getOnlineConfirmationServices = async (setData: (val: IsActive | null) => void) => {
    try {
        const config = await getConfig();
        const res = await axios.get(`${onlineConfirmationServices_url}`, config ? config : {});

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
        const res = await axios.post(`${onlineBookingHallWaitin_url}`, data, config ? config : {});

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
        const res = await axios.get(`${onlineBookingHallWaitin_url}`, config ? config : {});
        if(res.data.success){
            Toast.show(res.data.message, Toast.SHORT);
        }
        setData(res.data.body);
    } catch (error: any) {
        console.log(error);
        Toast.show(error.response.data.message, Toast.SHORT);
    }
};

export const getOnlineBookingRecordDay = async (setData: (val: any) => void, status?: "DAY" | "PERIOD") => {
    try {
        const config = await getConfig();
        const res = await axios.get(`${onlineBookingRecordDay_url}?status=${status ? status : "DAY"}`, config ? config : {});
        if(res.data.success){
            console.log(res.data.body);
            
        }
        setData(res.data.body);
    } catch (error: any) {
        console.log(error);
        
    }
};