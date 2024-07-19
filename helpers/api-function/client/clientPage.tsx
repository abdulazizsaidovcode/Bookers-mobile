import Toast from "react-native-simple-toast";
import {getConfig} from "@/app/(tabs)/(master)/main";
import axios from "axios";
import { client_profile_edit_url, getNotification_url } from "@/helpers/api";
import { getClientNotififcations } from "@/type/client/editClient";

export const updateClientProfile = async (datas: any, navigate?: () => void, getMe?: () => void, clearData?: () => void) => {
    try {
        if (datas) {
            const config = await getConfig()
            const {data} = await axios.put(`${client_profile_edit_url}`, datas, config ? config : {})
            if (data.success) {
                Toast.show('Successfully update', Toast.LONG)
                navigate ? navigate() : null
                getMe ? getMe() : null
                clearData ? clearData() : null
            } else {
                Toast.show('An error occurred on the server', Toast.LONG)
            }
        } else Toast.show('Something went wrong', Toast.LONG)
    } catch (err) {
        Toast.show('An error occurred on the server', Toast.LONG)
        console.log(err);
        
    }
}


// Profile notification function
export const clientNotification=async (setData: (val: getClientNotififcations[]) => void) => {
    const config = await getConfig()
    const ClientNotification= await axios.get(getNotification_url, config ? config : {})
    try{
        Toast.show('Notification client ishladi', Toast.LONG)
        if(ClientNotification.data.success) setData(ClientNotification.data.body)
        else setData([])
    }
    catch{
        Toast.show('Notification client ishlamadi', Toast.LONG)
        setData([])
    }
}