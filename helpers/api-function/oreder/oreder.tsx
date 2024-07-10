import {
    master_order_confirm,
    master_order_confirmed,
    master_order_hall,
    master_order_wait,
    order_add,
    order_get_one,
    order_update
} from "@/helpers/api";
import { useOrderPosdData } from "@/helpers/state_managment/order/order";
import { config } from "@/helpers/token";
import axios from "axios";
import Toast from "react-native-simple-toast";

interface OrderPost {
    data: any;
    status?: string;
    messageSatus?: (val: string) => void;
    setOrderId?: (val: string) => void;
    setLoading?: (val: boolean) => void;
    setStatus?: (val: string) => void; // Add setStatus to the interface
    navigation?: any; // Add navigation prop
}

export const postOrder = ({ data, status = "OTHER", messageSatus, setOrderId, setLoading, setStatus, navigation }: OrderPost) => {
    setLoading && setLoading(true);
    axios.post(`${order_add}?status=${status}`, data, config)
        .then((response) => {
            setLoading && setLoading(false);
            if (response.data.success) {
                Toast.show('Successfully saved order', Toast.LONG)
                setOrderId?.(response.data.body);
                setStatus?.("success");
                if (navigation) navigation.goBack()
            }
        })
        .catch(error => {
            Toast.show(error.response.data.message, Toast.LONG)
            messageSatus?.(error.response.data.message);
            setStatus?.("error");
            console.log(error);
            setLoading && setLoading(false);
        });
};

export const orderTimeEdit = ({ data, setOrderId, setLoading }: {data: any, setOrderId: (val: string) => void, setLoading: (val: boolean) => void}) => {
    setLoading(true);
    axios.put(`${order_update}`, data, config)
        .then((res) => {
            setLoading(false);
            if (res.data.success) {
                Toast.show('Successfully update order time', Toast.LONG)
                setOrderId(data.orderId);
            } else Toast.show('An error occurred on the server', Toast.LONG)
        })
        .catch(error => {
            Toast.show(error.response.data.message, Toast.LONG)
            console.log(error);
            setLoading(false);
        });
};

// get order one
export const orderGetOne = (orderID: string, setData: (val: any | null) => void) => {
    if (orderID) {
        axios.get(`${order_get_one}${orderID}`, config)
            .then((response) => {
                if (response.data.success) setData(response.data.body);
                else setData(null)
            })
            .catch(err => {
                console.error(err)
                setData(null)
            })
    }
}

// master order confirmed holatdagilar
export const getMasterOrderConfirmed = (setConfirmedData: any) => {
    axios.get(`${master_order_confirmed}`, config)
        .then((response) => {
            if (response.data.success) { 
                setConfirmedData(response.data.body)
            }
            else { 
                setConfirmedData([])
            }
        })
        .catch(err => {
            console.error(err)
            setConfirmedData([])
        })
}

// master order wait holatdagilar
export const getMasterOrderWait = (setWaitData: any) => {
    axios.get(`${master_order_wait}`, config)
        .then((response) => {
            if (response.data.success) { 
                setWaitData(response.data.body)
            }
            else { 
                setWaitData([])
            }
        })
        .catch(() => {
            setWaitData([])
        })
}

// master order hall holatdagilar
export const getMasterOrderHall = (setHallData: any) => {
    axios.get(`${master_order_hall}`, config)
        .then((response) => {
            if (response.data.success) { 
                setHallData(response.data.body)
            }
            else { 
                setHallData([])
            }
        })
        .catch(err => {
            console.error(err)
            setHallData([])
        })
}

// master orderni confirm reject qilish

// status == CONFIRMED, REJECTED, COMPLETED

export const masterOrderConfirm = (orderID: string, setLoading: any, status: string) => {
    
    setLoading(true)
    axios.put(`${master_order_confirm}?orderId=${orderID}&status=${status}`, {},config)
       .then((response) => {
            setLoading(false)
            if (response.data.success) {
                console.log("Order set successfully", response.data);
            }
        })
       .catch(error => {
            setLoading(false)
            console.log(error);
        });
}


