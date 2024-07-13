import {
    master_order_confirm,
    master_order_confirmed,
    master_order_hall,
    master_order_wait,
    order_add,
    order_get_one,
    order_update
} from "@/helpers/api";
import axios from "axios";
import Toast from "react-native-simple-toast";
import {getConfig} from "@/app/(tabs)/main";

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
        if (setLoading) setLoading(true);
        const config = await getConfig()
        const response = await axios.post(`${order_add}?status=${status}`, data, config);
        if (setLoading) setLoading(false);
        if (response.data.success) {
            Toast.show('Successfully saved order', Toast.LONG);
            if (setOrderId) setOrderId(response.data.body);
            if (setStatus) setStatus("success");
            if (navigation) navigation.goBack();
        } else {
            Toast.show(response.data.message, Toast.LONG);
            if (messageSatus) messageSatus(response.data.message);
            if (setStatus) setStatus("error");
        }
    } catch (error: any) {
        Toast.show('Error: ' + error.message, Toast.LONG);
        if (setStatus) setStatus("error");
        console.log(error);
        if (setLoading) setLoading(false);
    }
};

export const orderTimeEdit = async ({data, setOrderId, setLoading}: {
    data: any,
    setOrderId: (val: string) => void,
    setLoading: (val: boolean) => void
}) => {
    try {
        setLoading(true);
        const config = await getConfig()
        const res = await axios.put(`${order_update}`, data, config);
        setLoading(false);
        if (res.data.success) {
            Toast.show('Successfully update order time', Toast.LONG);
            setOrderId(data.orderId);
        } else Toast.show('An error occurred on the server', Toast.LONG)
    } catch (error: any) {
        Toast.show('Error: ' + error.message, Toast.LONG);
        console.log(error);
        setLoading(false);
    }
};

// get order one
export const orderGetOne = async (orderID: string, setData: (val: any | null) => void) => {
    try {
        if (orderID) {
            const config = await getConfig()
            const response = await axios.get(`${order_get_one}${orderID}`, config);

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
        const response = await axios.get(`${master_order_confirmed}`, config);

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
        const response = await axios.get(`${master_order_wait}`, config);

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
        const response = await axios.get(`${master_order_hall}`, config);

        if (response.data.success) setHallData(response.data.body)
        else setHallData([])
    } catch (error) {
        console.error(error);
        setHallData([]);
    }
};

// master orderni confirm reject qilish
// status == CONFIRMED, REJECTED, COMPLETED
export const masterOrderConfirm = async (orderID: string, setLoading: any, status: string) => {
    try {
        setLoading(true);
        const config = await getConfig()
        const response = await axios.put(`${master_order_confirm}?orderId=${orderID}&status=${status}`, {}, config);
        setLoading(false);
        if (response.data.success) console.log("Order set successfully", response.data)
    } catch (error) {
        setLoading(false);
        console.error(error);
    }
};

