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
            setCode(res.data.body);
        })
        .catch(err => {
            console.log(err);
        })
}

export const checkCode = (phoneNumber: string, otpValue: string,) => {
    const setData = {
        phoneNumber: phoneNumber
    }
    axios.post(`${register_page}checkCode?code=${otpValue}`, setData)
        .then(res => {
            Alert.alert("Muvaffaqiyatli ro'yxatdan o'tdingiz")
            router.push("(auth)/authPage1")
        })
        .catch(r => {
        })

}

export const masterData = (role: string) => {
    const master_data = {
        firstName: "",
        lastName: "",
        nickname: "",
        phoneNumber: "",
        ROLE: role,
    }
    axios.post(`${register_page}master?firstName=Sardorbek&lastName=Sayfullayev&nickname=Sardor&phoneNumber=%2B998942939447&ROLE=ROLE_MASTER`, master_data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
