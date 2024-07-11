import {base_url, register_page} from "@/helpers/api";
import axios from "axios";
import { router, useNavigation } from "expo-router";
import { Alert } from "react-native";
import Toast from "react-native-simple-toast";
import {authStorage} from "@/constants/storage";



export const registerFunction = (phoneNumber: string, setCode: (value: any) => void, status: boolean) => {
    const sentData = {
        phoneNumber: phoneNumber
    }

    axios.post(`${register_page}sendCode?purpose=${status}`, sentData)
        .then(res => {
            setCode(res.data.body);
            router.push('(auth)/checkSendMessage')
        })
        .catch(err => {
            if (err.response.data.success === false) {
                if (err.response.data.message === "Phone number already exists") {
                    Toast.show("этот номер уже зарегистрирован", Toast.LONG)
                } else {
                    Toast.show("этот номер еще не зарегистрирован", Toast.LONG)
                }
            }
        })
}

export const checkCode = (phoneNumber: string, otpValue: string, setRespone: any, isRegtered: boolean) => {
    const setData = {
        phoneNumber: phoneNumber
    }

    axios.post(`${register_page}checkCode?code=${otpValue}`, setData)
        .then(() => {
            Toast.show("Вы успешно зарегистрировались", Toast.LONG)
            setRespone(true)
        })
        .catch(err => {
            Toast.show("Вы ввели неправильный пароль", Toast.LONG)

            setRespone(false);
        })
}

export const authLogin = async (phoneNumber: string, otpValue: string, setRespone: any, isRegtered: boolean) => {
    const authData = {
        phone: phoneNumber,
        code: otpValue
    }
    axios.post(`${base_url}auth/login`, authData)
        .then(res => {
            if (res.data.success) {
                setRespone(true)
                authStorage(res.data.body)
            } else setRespone(false)
        })
        .catch(err => {
            setRespone(false)
            console.log(err)
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

export const masterData = ({ role, firstName, lastName, nickname, phoneNumber, img, setData }: IRegister) => {
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
                Alert.alert("Muvaffaqiyatli ro'yxatdan o'tdingiz");
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