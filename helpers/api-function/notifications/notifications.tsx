import { getConfig } from "@/app/(tabs)/(master)/main";
import { notifications_all_data, notifications_appointment, notifications_appointment_edit, notifications_cancel_edit, notifications_changing_edit, notifications_feedback_edit, notifications_main_data, notifications_main_data_edit, notifications_messengers_edit, notifications_window_edit } from "@/helpers/api";
import { NotificationsAllData } from "@/type/notifications/notifications";
import axios from "axios"
import Toast from 'react-native-simple-toast'

export const fetchMainData = async (setMainData: (val: boolean) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(notifications_main_data, config ? config : {});
        if (data.success) {
            setMainData(data.body);
        }
    } catch (error) {
        console.log(error)
    }
}

export const editMainDataStatus = async (isActive: boolean) => {
    try {
        const config = await getConfig()
        const { data } = await axios.post(`${notifications_main_data_edit}?isActive=${isActive}`, {}, config ? config : {});
        if (data.success) {
            Toast.show('Все ваши уведомления обновлены.', Toast.LONG)
        }
    } catch (error: any) {
        console.log(error)
        Toast.show(error.response.data.text ? error.response.data.text: 'Пожалуйста, повторите попытку позже', Toast.LONG)
    }
}

export const fetchAllData = async (setOneData: (val: NotificationsAllData) => void, status: string) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(`${notifications_all_data}?status=${status}`, config ? config : {});
        if (data.success) {
            setOneData(data.body);
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchAppoinmentActiveData = async (setAppoinmentActiveData: (val: boolean) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(notifications_appointment, config ? config : {});
        if (data.success) {
            setAppoinmentActiveData(data.body)
        }
    } catch (error) {
        console.log(error)
    }
}

export const editMessenger = async (isMessage: boolean | undefined, goBack: () => void, setHasChanges: (val: boolean) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true)
    try {
        const config = await getConfig()
        const { data } = await axios.put(`${notifications_messengers_edit}?isMessage=${isMessage}`, {}, config ? config : {});
        if (data.success) {
            Toast.show('Ваш мессенджер успешно обновлен', Toast.LONG)
            goBack()
            setHasChanges(false);
            setIsLoading(false)
        } else setIsLoading(false);
    } catch (error: any) {
        console.log(error)
        setIsLoading(false)
        Toast.show(error.response.data.message ? error.response.data.message: 'Пожалуйста, повторите попытку позже', Toast.LONG)
    }
}

export const editCancelOrder = async (isActive: boolean | undefined, text: string | undefined, setHasChanges: (val: boolean) => void, goBack: () => void, setIsloading: (val: boolean) => void) => {
    if (text && !text.includes('(дата сеанса)')) {
        Toast.show('Поместите слово (дата сеанса) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(время сеанса)')) {
        Toast.show('Поместите слово (время сеанса) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(адрес)')) {
        Toast.show('Поместите слово (адреес) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(процедура)')) {
        Toast.show('Поместите слово (процедура) куда-нибудь', Toast.LONG)
        return
    }
    setIsloading(true)
    const payload = { isActive, text }
    try {
        const config = await getConfig()
        const { data } = await axios.put(notifications_cancel_edit, payload, config ? config : {});
        if (data.success) {
            setHasChanges(false);
            goBack()
            setIsloading(false)
            Toast.show('Запись отмены успешно обновлена.', Toast.LONG)
        } else setIsloading(false)
    } catch (error: any) {
        console.log(error)
        setIsloading(false)
        Toast.show(error.response.data.text ? error.response.data.text: 'Пожалуйста, повторите попытку позже', Toast.LONG)
    }
}

export const editChangingOrder = async (isActive: boolean | undefined, text: string | undefined, setHasChanges: (val: boolean) => void, goBack: () => void, setIsloading: (val: boolean) => void) => {
    if (text && !text.includes('(дата сеанса)')) {
        Toast.show('Поместите слово (дата сеанса) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(время сеанса)')) {
        Toast.show('Поместите слово (время сеанса) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(процедура)')) {
        Toast.show('Поместите слово (процедура) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(адреес)')) {
        Toast.show('Поместите слово (адреес) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(дата новый сеанса)')) {
        Toast.show('Поместите слово (дата новый сеанса) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(время новый сеанса)')) {
        Toast.show('Поместите слово (время новый сеанса) куда-нибудь', Toast.LONG)
        return
    }
    setIsloading(true)
    const payload = { isActive, text }
    try {
        const config = await getConfig()
        const { data } = await axios.put(notifications_changing_edit, payload, config ? config : {});
        if (data.success) {
            setHasChanges(false);
            goBack()
            setIsloading(false)
            Toast.show('Изменение записи успешно обновлено.', Toast.LONG)
        } else setIsloading(false)
    } catch (error: any) {
        console.log(error)
        setIsloading(false)
        Toast.show(error.response.data.text ? error.response.data.text: 'Пожалуйста, повторите попытку позже', Toast.LONG)
    }
}

export const editFeedbeckOrder = async (text: string | undefined, setHasChanges: (val: boolean) => void, goBack: () => void, setIsloading: (val: boolean) => void) => {
    if (text && !text.includes('(линк на отзыв)')) {
        Toast.show('Поместите слово (линк на отзыв) куда-нибудь', Toast.LONG)
        return
    }
    setIsloading(true)
    try {
        const config = await getConfig()
        const { data } = await axios.put(notifications_feedback_edit, { text }, config ? config : {});
        if (data.success) {
            setHasChanges(false);
            goBack()
            setIsloading(false)
            Toast.show('Запрос отзыва успешно обновлено.', Toast.LONG)
        } else setIsloading(false)
    } catch (error: any) {
        console.log(error)
        setIsloading(false)
        Toast.show(error.response.data.text ? error.response.data.text: 'Пожалуйста, повторите попытку позже', Toast.LONG)
    }
}

export const editAppoinmentOrder = async (text: string | undefined, hour: number | undefined, minute: number | undefined, active: boolean | undefined, goBack: () => void, setHasChanges: (val: boolean) => void, setIsLoading: (val: boolean) => void) => {
    if (text && !text.includes('(дата сеанса)')) {
        Toast.show('Поместите слово (дата сеанса) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(время сеанса)')) {
        Toast.show('Поместите слово (время сеанса) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(адреес)')) {
        Toast.show('Поместите слово (адреес) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(процедура)')) {
        Toast.show('Поместите слово (процедура) куда-нибудь', Toast.LONG)
        return
    }
    setIsLoading(true)
    const payload = { hour, minute, text, active }
    try {
        const config = await getConfig()
        const { data } = await axios.put(`${notifications_appointment_edit}`, payload, config ? config : {});
        if (data.success) {
            Toast.show('Ваш напоминание о встрече успешно обновлено.', Toast.LONG)
            goBack()
            setHasChanges(false)
            setIsLoading(false)
        } else setIsLoading(false)
    } catch (error: any) {
        console.log(error)
        setIsLoading(false)
        Toast.show(error.response.data.text ? error.response.data.text: 'Пожалуйста, повторите попытку позже', Toast.LONG)
    }
}

export const editWindowOrder = async (text: string | undefined, setHasChanges: (val: boolean) => void, goBack: () => void, setIsloading: (val: boolean) => void) => {
    if (text && !text.includes('(дата сеанса)')) {
        Toast.show('Поместите слово (дата сеанса) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(время сеанса)')) {
        Toast.show('Поместите слово (время сеанса) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(адреес)')) {
        Toast.show('Поместите слово (адреес) куда-нибудь', Toast.LONG)
        return
    }
    if (text && !text.includes('(процедура)')) {
        Toast.show('Поместите слово (процедура) куда-нибудь', Toast.LONG)
        return
    }
    setIsloading(true)
    try {
        const config = await getConfig()
        const { data } = await axios.put(notifications_window_edit, { text }, config ? config : {});
        if (data.success) {
            Toast.show('Ваш запрос окошка успешно обновлено.', Toast.LONG)
            goBack()
            setIsloading(false)
            setHasChanges(false)
        } else setIsloading(false)
    } catch (error: any) {
        console.log(error)
        setIsloading(false)
        Toast.show(error.response.data.text ? error.response.data.text: 'Пожалуйста, повторите попытку позже', Toast.LONG)
    }
}