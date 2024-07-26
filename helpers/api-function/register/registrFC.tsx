import { base_url, register_page } from "@/helpers/api";
import axios from "axios";
import { router } from "expo-router";
import Toast from "react-native-simple-toast";
import { authStorage, setClientOrMaster } from "@/constants/storage";
import * as SecureStore from 'expo-secure-store';

export const checkNumberFunction = async (phoneNumber: string, setCode: (value: any) => void, pending: (val: boolean) => void, setStatus: (val: boolean) => void) => {
    const sentData = { phoneNumber: phoneNumber }
    let status: null | boolean = null

    await axios.post(`${base_url}user/checking/phone`, sentData)
        .then(res => {
            status = res.data.success
            setStatus(res.data.success)
        })
        .catch(err => {
            if (err.response.data.success === false) Toast.show(err.response.data.message, Toast.LONG)
        })


    if (status === true || status === false) {
        await axios.post(`${register_page}sendCode?purpose=${status}`, sentData)
            .then(res => {
                setCode(res.data.body);
                router.push('(auth)/(login)/checkSendMessage')
                pending(false)
            })
            .catch(err => {
                pending(false)
                if (err.response.data.success === false) Toast.show(err.response.data.message, Toast.LONG)
            })
    }



}

export const checkCode = (phoneNumber: string, otpValue: string, setRespone: any, isRegtered: boolean) => {
    const setData = { phoneNumber: phoneNumber }

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

export const authLogin = async (phoneNumber: string, otpValue: string, setRespone: any, setRole: any) => {
    const authData = {
        phone: phoneNumber,
        code: otpValue
    }
    
    if (phoneNumber) {
        axios.post(`${base_url}auth/login`, authData)
            .then(res => {
                if (res?.data?.success) {
                    setRespone(true)
                    authStorage(res.data.body)
                    setClientOrMaster(res.data.message)
                    setRole(res.data.message)
                    Toast.show("siz logindan o'tdingiz", Toast.LONG)
                } else {
                    setRespone(null)
                    Toast.show(res.data.message, Toast.LONG)
                }
            })
            .catch(err => {
                setRespone(null)
                Toast.show(err?.response?.data?.message, Toast.LONG)
            })
    } else Toast.show('Номер телефона обязателен', Toast.SHORT)
}

interface IRegister {
    phoneNumber: string
    firstName: string
    lastName: string
    nickname?: string
    img?: any
    role: string;
    setData: (val: any) => void
    password: string;
    language: string;
}

export const registerMaster = async (
    {
        role,
        firstName,
        lastName,
        nickname,
        phoneNumber,
        img,
        setData,
        password,
        language
    }: IRegister) => {
    let files: any
    const formData = new FormData();
    if (img) {
        files = {
            uri: img.uri,
            name: img.fileName,
            type: img.mimeType,
        };
    }
    formData.append("image", img ? files : null);

    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.replace('+', '%2B') : phoneNumber;
    const url = `${register_page}master?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}${nickname ? `&nickname=${encodeURIComponent(nickname)}` : ''}&phoneNumber=${formattedPhoneNumber}&ROLE=${encodeURIComponent(role)}&lang=${language}`;

    await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(res => {
        if (res.data.success) {
            setData(res.data.body)
            Toast.show("Вы успешно зарегистрировались ):", Toast.SHORT);
            SecureStore.setItemAsync('number', phoneNumber)
            SecureStore.setItemAsync('password', password)
        } else {
            Toast.show("Произошла ошибка при регистрации", Toast.SHORT);
            setData(null)
        }
    }).catch(err => {
        console.log(err);
        setData(null)
        Toast.show("Произошла ошибка при регистрации", Toast.SHORT);
    });
}

export const registerClient = async ({ firstName, lastName, phoneNumber, img, setData, password, language }: any) => {
    let files: any
    const formData = new FormData();
    if (img) {
        files = {
            uri: img.uri,
            name: img.fileName,
            type: img.mimeType,
        };
    }
    formData.append("image", img ? files : null);

    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.replace('+', '%2B') : phoneNumber;
    const url = `${register_page}client?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}${`&lang=${language}`}&phoneNumber=${formattedPhoneNumber}`;

    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(res => {
        if (res.data.success) {
            setData(res.data.body)
            Toast.show("Вы успешно зарегистрировались ):", Toast.SHORT);
            SecureStore.setItemAsync('password', password)
            SecureStore.setItemAsync('number', phoneNumber)
        } else {
            Toast.show("Произошла ошибка при регистрации", Toast.SHORT);
            setData(null)
        }
    }).catch(err => {
        console.log(err);
        setData(null)
        Toast.show("Произошла ошибка при регистрации", Toast.SHORT);
    });
}