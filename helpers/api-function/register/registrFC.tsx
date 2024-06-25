import { register_page } from "@/helpers/api";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

export const registerFunction = (phoneNumber: string, setCode: (value: any) => void) => {
    const sentData = {
        phoneNumber: phoneNumber
    }
    axios.post(`${register_page}sendCode?purpose=true`, sentData)
        .then(res => {
            console.log(res.data.body); // Javobni konsolga chiqarish
            setCode(res.data.body);
        })
        .catch(err => {
            console.log(err);
        })
}

export const checkCode = (phoneNumber: string, otp: string, setOtpErr: (value: boolean) => void) => {
    const setData = {
        phoneNumber: phoneNumber
    }
    axios.post(`${register_page}checkCode?code=${otp}`, setData)
        .then(res => {
            Alert.alert("Muvaffaqiyatli ro'yxatdan o'tdingiz")
            router.push("(auth)/authPage1")
            setOtpErr(false)
        })
        .catch(r => {
            setOtpErr(true)
        })

}
