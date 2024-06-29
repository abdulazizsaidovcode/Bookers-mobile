import { order_add } from "@/helpers/api";
import { useOrderPosdData } from "@/helpers/state_managment/order/order";
import { config } from "@/helpers/token";
import axios from "axios";

export const postOder = ({ data, status = "OTHER" }: any) => {
    const { setStatus } = useOrderPosdData();
    
    axios.post(`${order_add}?status=${status}`, data, config)
        .then(response => {
            console.log("Order set successfully", response);
            setStatus(response.data.message);
        })
        .catch(error => {
            setStatus(error.response.data.message)
        });
}