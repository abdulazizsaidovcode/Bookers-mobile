import { getConfig } from "@/app/(tabs)/main";
import { notifications_all_data, notifications_appointment, notifications_appointment_edit, notifications_cancel_edit, notifications_changing_edit, notifications_feedback_edit, notifications_main_data, notifications_main_data_edit, notifications_messengers_edit, notifications_window_edit } from "@/helpers/api";
import { NotificationsAllData } from "@/type/notifications/notifications";
import axios from "axios"
import Toast from 'react-native-simple-toast'

export const fetchMainData = async (setMainData: (val: boolean) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(notifications_main_data, config);
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
        const { data } = await axios.post(`${notifications_main_data_edit}?isActive=${isActive}`, {}, config);
        if (data.success) {
            Toast.show('Все ваши уведомления обновлены.', Toast.LONG)
        }
    } catch (error) {
        console.log(error)
        Toast.show('Произошла ошибка, попробуйте позже', Toast.LONG)
    }
}

export const fetchAllData = async (setOneData: (val: NotificationsAllData) => void, status: string) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(`${notifications_all_data}?status=${status}`, config);
        if (data.success) {
            setOneData(data.body);
        }
    } catch (error) {
        console.log(error)
        Toast.show('Произошла ошибка, попробуйте позже', Toast.LONG)
    }
}

export const fetchAppoinmentActiveData = async (setAppoinmentActiveData: (val: boolean) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(notifications_appointment, config);
        if (data.success) {
            setAppoinmentActiveData(data.body)
        }
    } catch (error) {
        console.log(error)
    }
}

export const editMessenger = async (isMessage: boolean, goBack: void, setHasChanges: (val: boolean) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.put(`${notifications_messengers_edit}?isMessage=${isMessage}`, {}, config);
        if (data.success) {
            Toast.show('Ваш мессенджер успешно обновлен', Toast.LONG)
            goBack
            setHasChanges(false);
        }
    } catch (error) {
        console.log(error)
        Toast.show('Произошла ошибка, попробуйте позже', Toast.LONG)
    }
}

export const editCancelOrder = async (isActive: boolean | undefined, text: string | undefined, setHasChanges: (val: boolean) => void, goBack: void) => {
    const payload = { isActive, text }
    try {
        const config = await getConfig()
        const { data } = await axios.put(notifications_cancel_edit, payload, config);
        if (data.success) {
            setHasChanges(false);
            goBack
            Toast.show('Запись отмены успешно обновлена.', Toast.LONG)
        }
    } catch (error) {
        console.log(error)
        Toast.show('Произошла ошибка, попробуйте позже', Toast.LONG)
    }
}

export const editChangingOrder = async (isActive: boolean | undefined, text: string | undefined, setHasChanges: (val: boolean) => void, goBack: void) => {
    const payload = { isActive, text }
    try {
        const config = await getConfig()
        const { data } = await axios.put(notifications_changing_edit, payload, config);
        if (data.success) {
            setHasChanges(false);
            goBack
            Toast.show('Изменение записи успешно обновлено.', Toast.LONG)
        }
    } catch (error) {
        console.log(error)
        Toast.show('Произошла ошибка, попробуйте позже', Toast.LONG)
    }
}

export const editFeedbeckOrder = async (text: string | undefined, setHasChanges: (val: boolean) => void, goBack: void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.put(notifications_feedback_edit, { text }, config);
        if (data.success) {
            setHasChanges(false);
            goBack
            Toast.show('Запрос отзыва успешно обновлено.', Toast.LONG)
        }
    } catch (error) {
        console.log(error)
        Toast.show('Произошла ошибка, попробуйте позже', Toast.LONG)
    }
}

export const editAppoinmentOrder = async (text: string | undefined, hour: number | undefined, minute: number | undefined, isActive: boolean | undefined, goBack: void, setHasChanges: (val: boolean) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.put(`${notifications_appointment_edit}?hour=${hour}&minute=${minute}&text=${text}&active=${isActive}`, {}, config);
        if (data.success) {
            Toast.show('Ваш напоминание о встрече успешно обновлено.', Toast.LONG)
            goBack
            setHasChanges(false)
        }
    } catch (error) {
        console.log(error)
        Toast.show('Произошла ошибка, попробуйте позже', Toast.LONG)
    }
}

export const editWindowOrder = async (text: string | undefined, setHasChanges: (val: boolean) => void, goBack: void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.put(notifications_window_edit, { text }, config);
        if (data.success) {
            Toast.show('Ваш запрос окошка успешно обновлено.', Toast.LONG)
            goBack
            setHasChanges(false)
        }
    } catch (error) {
        console.log(error)
        Toast.show('Произошла ошибка, попробуйте позже', Toast.LONG)
    }
}