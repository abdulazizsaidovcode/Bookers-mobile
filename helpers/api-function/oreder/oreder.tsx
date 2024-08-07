import {
    master_order_confirm,
    master_order_confirmed,
    master_order_hall,
    master_order_wait,
    order_add,
    order_get_one,
    order_get_one_client,
    order_update
} from "@/helpers/api";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { getConfig } from "@/app/(tabs)/(master)/main";

interface OrderPost {
    data: any;
    status?: string;
    messageSatus?: (val: string) => void;
    setOrderId?: (val: string) => void;
    setLoading?: (val: boolean) => void;
    setStatus?: (val: string) => void; // Add setStatus to the interface
    navigation?: any; // Add navigation prop
}

export const postOrder = async (
    {
        data,
        status = "OTHER",
        messageSatus,
        setOrderId,
        setLoading,
        setStatus,
        navigation
    }: OrderPost) => {
    try {
        console.log(data);

        if (setLoading) setLoading(true);
        const config = await getConfig()
        const response = await axios.post(`${order_add}?status=${status}`, {}, config ? config : {});
        if (setLoading) setLoading(false);

        if (response.data.success) {
            Toast.show('Заказ на выбранное вами время успешно размещен.', Toast.LONG);
            if (setOrderId) setOrderId(response.data.body);
            if (setStatus) setStatus("success");
            if (navigation) navigation.goBack();
        } else {
            console.log(false);
            console.log(response.data);


            if (response.data.message == "Usta bugunga buyurtma qabul qilishni to'xtatdi") Toast.show("Мастер на сегодня прекратил принимать заказы", Toast.SHORT);
            if (messageSatus) messageSatus(response.data.message);
            if (setStatus) setStatus("error");
        }
    } catch (error: any) {
        if (setStatus) setStatus("error");
        console.log(error);
        if (error.response.data.date == "Date bo'sh bo'lmasligi kerak" || error.response.data.serviceIds == "Service ID bo'sh bo'lmasligi kerak") Toast.show('При заказе произошла ошибка во времени.', Toast.SHORT);
        if (error.response.status == "Date bo'sh bo'lmasligi kerak" || error.response.data.serviceIds == "Service ID bo'sh bo'lmasligi kerak") Toast.show('При заказе произошла ошибка во времени.', Toast.SHORT);
        if (error.response.status == 403 || error.response.status == 500) Toast.show('Во время заказа произошла ошибка.', Toast.SHORT);

        if (setLoading) setLoading(false);
    }
};

export const orderTimeEdit = async ({ data, setOrderId, setLoading, setResponse }: {
    data: any,
    setOrderId: (val: string) => void,
    setLoading: (val: boolean) => void
    setResponse?: (val: boolean) => void
}) => {
    console.log(data);
    try {
        setLoading(true);
        const config = await getConfig()
        const res = await axios.put(`${order_update}`, data, config ? config : {});
        setLoading(false);
        if (res.data.success) {
            Toast.show(res.data.message, Toast.LONG);
            setOrderId(data.orderId);
            if (setResponse) setResponse(true)
        } else {
            Toast.show(res.data.message, Toast.LONG)
            if (setResponse) setResponse(false)
        }

    } catch (error: any) {
        Toast.show(error.response.data.message, Toast.LONG);
        setLoading(false);
        if (setResponse) setResponse(false)
    }
};

// get order one
export const orderGetOne = async (orderID: string, setData: (val: any | null) => void) => {
    try {
        if (orderID) {
            const config = await getConfig()
            const response = await axios.get(`${order_get_one}${orderID}`, config ? config : {});

            if (response.data.success) setData(response.data.body)

            else setData(null)
            console.log(response.data);

        }
    } catch (error) {
        console.error(error);
        setData(null);
    }
};

export const orderClientGetOne = async (orderID: string, setData: (val: any | null) => void) => {
    try {
        if (orderID) {
            const config = await getConfig()
            const response = await axios.get(`${order_get_one_client}${orderID}`, config ? config : {});

            if (response.data.success) setData(response.data.body)
            else setData(null)
        }
    } catch (error) {
        console.error(error);
        setData(null);
    }
};

// master order confirmed holatdagilar
export const getMasterOrderConfirmed = async (setConfirmedData: any) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${master_order_confirmed}`, config ? config : {});

        if (response.data.success) setConfirmedData(response.data.body)
        else setConfirmedData([])
    } catch (error) {
        console.error(error);
        setConfirmedData([]);
    }
};

// master order wait holatdagilar
export const getMasterOrderWait = async (setWaitData: any) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${master_order_wait}`, config ? config : {});

        if (response.data.success) setWaitData(response.data.body)
        else setWaitData([])
    } catch (error) {
        console.error(error);
        setWaitData([]);
    }
};

// master order hall holatdagilar
export const getMasterOrderHall = async (setHallData: any) => {
    try {
        const config = await getConfig()
        const response = await axios.get(`${master_order_hall}`, config ? config : {});

        if (response.data.success) setHallData(response.data.body)
        else setHallData([])
    } catch (error) {
        console.error(error);
        setHallData([]);
    }
};

// master orderni confirm reject qilish
// status == CONFIRMED, REJECTED, COMPLETED
export const masterOrderConfirm = async (orderID: string, setLoading: any, status: string, resPonse: (val: boolean) => void) => {

    try {
        setLoading(true);
        const config = await getConfig()
        const response = await axios.put(`${master_order_confirm}?orderId=${orderID}&status=${status}`, {}, config ? config : {});
        if (response.data.success) resPonse(true)
        else resPonse(false)
        setLoading(false);
        if (response.data.success) console.log("Order set successfully", response.data)
    } catch (error) {
        setLoading(false);
        resPonse(false)
        console.error(error, 'wedc');
    }
};

