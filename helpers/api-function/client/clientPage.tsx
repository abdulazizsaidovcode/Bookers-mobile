import Toast from "react-native-simple-toast";
import {getConfig} from "@/app/(tabs)/(master)/main";
import axios from "axios";
import { client_profile_edit_url } from "@/helpers/api";

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