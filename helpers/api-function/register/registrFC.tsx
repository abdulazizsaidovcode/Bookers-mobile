import {base_url, register_page} from "@/helpers/api";
import axios from "axios";
import {router} from "expo-router";
import {Alert} from "react-native";
import Toast from "react-native-simple-toast";
import {authStorage, setClientOrMaster} from "@/constants/storage";
import * as SecureStore from 'expo-secure-store';

export const checkNumberFunction = (phoneNumber: string, setCode: (value: any) => void, status: boolean) => {
    const sentData = {phoneNumber: phoneNumber}

    axios.post(`${register_page}sendCode?purpose=${status}`, sentData)
        .then(res => {
            setCode(res.data.body);
            router.push('(auth)/(login)/checkSendMessage')
        })
        .catch(err => {
            console.log(err, "dec");
            if (err.response.data.success === false) Toast.show(err.response.data.message, Toast.LONG)
        })
}

export const checkCode = (phoneNumber: string, otpValue: string, setRespone: any, isRegtered: boolean) => {
    const setData = {phoneNumber: phoneNumber}

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

export const authLogin = async (phoneNumber: string, otpValue: string, setRespone: any, isRegtered: boolean, setRole: any) => {
    const authData = {
        phone: phoneNumber,
        code: otpValue
    }

    if (phoneNumber) {
        axios.post(`${base_url}auth/login`, authData)
            .then(res => {
                if (res.data.success) {
                    setRespone(true)
                    authStorage(res.data.body)
                    setClientOrMaster(res.data.message)
                    setRole(res.data.message)
                    SecureStore.setItemAsync('number', phoneNumber)
                } else setRespone(false)
            })
            .catch(err => {
                setRespone(false)
                console.log(err)
            })
    } else Alert.alert('Номер телефона обязателен')
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
    const formData = new FormData();
    formData.append('image', img ? img : null)

    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.replace('+', '%2B') : phoneNumber;
    const url = `${register_page}master?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}${nickname ? `&nickname=${encodeURIComponent(nickname)}&lang=${language}` : ''}&phoneNumber=${formattedPhoneNumber}&ROLE=${encodeURIComponent(role)}`;

    await axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(res => {
        if (res.data.success) {
            setData(res.data.body)
            Alert.alert("Вы успешно зарегистрировались");
            SecureStore.setItemAsync('number', phoneNumber)
            SecureStore.setItemAsync('password', password)
        } else {
            Alert.alert("Произошла ошибка при регистрации");
            setData(null)
        }
    }).catch(err => {
        console.log(err);
        setData(null)
        Alert.alert("Произошла ошибка при регистрации");
    });
}

export const registerClient = async ({firstName, lastName, phoneNumber, img, setData, password, language}: any) => {
    const formData = new FormData();
    formData.append('image', img ? img : null)

    const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber.replace('+', '%2B') : phoneNumber;
    const url = `${register_page}client?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}${`&lang=${language}`}&phoneNumber=${formattedPhoneNumber}`;

    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(res => {
        if (res.data.success) {
            setData(res.data.body)
            Alert.alert("Вы успешно зарегистрировались");
            SecureStore.setItemAsync('password', password)
            SecureStore.setItemAsync('number', phoneNumber)
        } else {
            Alert.alert("Произошла ошибка при регистрации");
            setData(null)
        }
    }).catch(err => {
        console.log(err);
        setData(null)
        Alert.alert("Произошла ошибка при регистрации");
    });
}