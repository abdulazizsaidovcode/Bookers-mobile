import { onlineBookingAllowClient_url, onlineBookingUgly_url } from "@/helpers/api";
import axios from "axios";
import { config } from "@/helpers/token"
import { Alert } from "react-native"



export const onlineBookingAllowClient = (isEnabled: boolean) => {
    if (isEnabled == true || isEnabled == false) {
        axios.put(`${onlineBookingAllowClient_url}?allowClient=${isEnabled}`, {}, config)
            .then(res => {
                if (res.data.success) {
                    Alert.alert("Изменены разрешения для клиентов")
                }
                else {
                    Alert.alert("Во время конвертации произошла ошибка")
                }
            })
            .catch(() => {
                Alert.alert("Во время конвертации произошла ошибка")
            })
    }
}

export const getOnlineBookingAllowClient = (setData: (val: boolean) => void) => {
    axios.get(`${onlineBookingAllowClient_url}`, config)
        .then(res => {
            if (res.data.success) {
                setData(res.data.body)
            }
            else {
                setData(false)
            }
        })
        .catch(() => {
            setData(false)
        })
}

export const onlineBookingSettingsUrgently = (isEnabled: boolean) => {
    if (isEnabled == true || isEnabled == false) {
        console.log(isEnabled,"a");
        
        axios.post(`${onlineBookingUgly_url}?isUrgent=${isEnabled}`, {}, config)
            .then(res => {
                console.log(res.data);
                
                if (res.data.success) {
                    Alert.alert("успешно изменено")
                }
                else {
                    Alert.alert("Произошла ошибка при конвертации")
                }
            })
            .catch(() => {
                Alert.alert("Произошла ошибка при конвертации")
            })
    }
}

export const GetOnlineBookingSettingsUrgently = (setStatus: any) => {
    axios.get(onlineBookingUgly_url)
        .then(res => {
            setStatus(res.data.body)
        })
}

