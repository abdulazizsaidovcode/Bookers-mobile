import {register_page} from "@/helpers/api";
import axios from "axios";
import {router} from "expo-router";
import {Alert} from "react-native";

export const registerFunction = (phoneNumber: string, setCode: (value: any) => void) => {
    const sentData = {
        phoneNumber: phoneNumber
    }
    axios.post(`${register_page}sendCode?purpose=true`, sentData)
        .then(res => {
            setCode(res.data.body);
            console.log(res.data.body);

        })
        .catch(err => {
            console.log(err);
        })
}

export const checkCode = (phoneNumber: string, otpValue: string, setRespone: any) => {
    const setData = {
        phoneNumber: phoneNumber
    }
    axios.post(`${register_page}checkCode?code=${otpValue}`, setData)
        .then(res => {
            Alert.alert("Muvaffaqiyatli ro'yxatdan o'tdingiz")
            router.push("(auth)/authPage1")
        })
        .catch(err => {
            setRespone(true);
        })
}

interface IRegister {
    phoneNumber: string
    firstName: string
    lastName: string
    nickname?: string
    img?: any
    role: string;
    setData: (val: any) => void
}

export const masterData = ({role, firstName, lastName, nickname, phoneNumber, img, setData}: IRegister) => {
    const formData = new FormData();
    formData.append('image', img ? img : null)

    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.replace('+', '%2B') : phoneNumber;
    const url = `${register_page}master?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}${nickname ? `&nickname=${encodeURIComponent(nickname)}` : ''}&phoneNumber=${formattedPhoneNumber}&ROLE=${encodeURIComponent(role)}`;
    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(res => {
            if (res.data.success) {
                setData(res.data.body)
                Alert.alert("Muvaffaqiyatli ro'yxatdan o'tdingiz😍🤣😂❤️");
            } else {
                Alert.alert("Xatolik yuz berdi");
                setData(null)
            }
        })
        .catch(err => {
            console.log(err);
            setData(null)
            Alert.alert("Xatolik yuz berdi");
        });
}