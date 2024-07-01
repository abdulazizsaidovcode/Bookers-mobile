import {order_add, order_get_one} from "@/helpers/api";
import {useOrderPosdData} from "@/helpers/state_managment/order/order";
import {config} from "@/helpers/token";
import axios from "axios";

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
            console.log("Order set successfully", response);
            if (response.data.success) {
                setOrderId?.(response.data.body);
                setStatus?.("success"); // Update status in the store
                if(navigation){
                    navigation.goBack()
                } // Navigate back on success
            }
        })
        .catch(error => {
            messageSatus?.(error.response.data.message);
            setStatus?.("error"); // Update status in the store
            console.log(error);
            setLoading && setLoading(false);
        });
};

// get order one
export const orderGetOne = (orderID: string) => {
    if (orderID) {
        axios.get(`${order_get_one}${orderID}`, config)
            .then((response) => {
                if (response.data.success) {}
                else {}
            })
            .catch(err => {
                console.error(err)
            })
    }
}
