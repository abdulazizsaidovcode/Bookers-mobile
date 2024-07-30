import Toast from "react-native-simple-toast";
import { getConfig } from "@/app/(tabs)/(master)/main";
import axios from "axios";
import { client_profile_delete_url, client_profile_edit_url, clientReadNotification_url, getNotification_url, getNotificationNotReady_url } from "@/helpers/api";
import { getClientNotififcations } from "@/type/client/editClient";

export const updateClientProfile = async (datas: any, navigate?: () => void, getMe?: () => void, clearData?: () => void) => {
    try {
        if (datas) {
            const config = await getConfig()
            const { data } = await axios.put(`${client_profile_edit_url}`, datas, config ? config : {})
            if (data.success) {
                Toast.show('Successfully update', Toast.LONG)
                navigate ? navigate() : null
                getMe ? getMe() : null
                clearData ? clearData() : null
            } else {
                Toast.show('An error occurred on the console', Toast.LONG)
            }
        } else Toast.show('Something went wrong', Toast.LONG)
    } catch (err) {
        Toast.show('An error occurred on the server', Toast.LONG)
        console.log(err);

    }
}

export const updateMasterProfile = async (datas: any, navigate?: () => void, getMe?: () => void, clearData?: () => void, setIsLoading?: (val: boolean) => void) => {
    setIsLoading ? setIsLoading(true) : () => {}
    try {
        if (datas) {
            const config = await getConfig()
            const { data } = await axios.put(`${client_profile_delete_url}`, datas, config ? config : {})
            if (data.success) {
    setIsLoading ? setIsLoading(false) : () => {}
    Toast.show(data.message, Toast.LONG)
                navigate ? navigate() : null
                getMe ? getMe() : null
                clearData ? clearData() : null
            } else {
    setIsLoading ? setIsLoading(false) : () => {}
    Toast.show(data.message, Toast.LONG)
            }
        } else {
    setIsLoading ? setIsLoading(false) : () => {}
    Toast.show('Something went wrong', Toast.LONG)
        }
    } catch (err) {
    setIsLoading ? setIsLoading(false) : () => {}
    Toast.show('An error occurred on the server', Toast.LONG)
        console.log(err);

    }
}


// Profile notification function
export const clientNotification = async (setData: (val: getClientNotififcations[]) => void) => {
    const config = await getConfig()
    const ClientNotification = await axios.get(getNotification_url, config ? config : {})
    try {
        if (ClientNotification.data.success) setData(ClientNotification.data.body)
        else setData([])
    }
    catch {
        Toast.show('Notification client ishlamadi', Toast.LONG)
        setData([])
    }
}
export const deleteClientProfile = async () => {
    try {
        const config = await getConfig();
        const { data } = await axios.delete(client_profile_delete_url, config ? config : {});
        if (data.success) {
            Toast.show('Successfully deleted', Toast.LONG);
        } else {
            Toast.show('An error occurred on the server', Toast.LONG);
            console.log(data);
        }
    } catch (err) {
        Toast.show('An error occurred on the server', Toast.LONG);
        console.log(err);
    }
};

export const clientNotificationDelete = async (datas: any, getData: () => void) => {
    const config = await getConfig()
    console.log(datas);

    const clientNotificationDel = await axios.post(`${getNotification_url}/delete`, datas, config ? config : {});
    try {
        if (clientNotificationDel.data.success) {
            Toast.show('Successfully deleted', Toast.LONG);
            getData();
        } else {
            Toast.show('An error occurred on the server', Toast.LONG);
        }
    }
    catch {
        Toast.show('An error occurred on the server', Toast.LONG);

    }
}
//client notification not ready or ready
export const clientPostReadyORnotReady = async (datas: any, getData: () => void) => {
    const config = await getConfig() 
    
    const res = await axios.post(clientReadNotification_url, datas, config ? config : {})
    console.log(res.data);
    
    try{
        if(res.data.success){
            getData()
        }else{
            Toast.show('An error occurred on the server', Toast.LONG)
        }
    }
    catch{
        Toast.show('An error occurred on the server', Toast.LONG)
    }
}
// client notification not ready
export const getNotificationNor_ReadyClient = async (setNotification: (val: any) => void) => {
    const config = await getConfig()
    const res= await axios.get(getNotificationNotReady_url, config ? config : {})
    try{
        if(res.data.success){
            setNotification(res.data.body)
        }else{
            setNotification([])
        }
    }
    catch{
        Toast.show("Not ready yulida catchga utkazildi", Toast.LONG)
    }
}