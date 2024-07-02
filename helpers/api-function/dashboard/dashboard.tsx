import { dashboard_daily_time_orders, dashboard_edit_order_status, dashboard_main_statistic, dashboard_wait_order } from "@/helpers/api"
import { config } from "@/helpers/token";
import { DashboardDailyTimeOrders, DashboardMainStatistic, DashboardWaitingOrder } from "@/type/dashboard/dashboard";
import axios from "axios"

export const fetchDaylyOrderTimes = async (setDailyTimeData: (val: DashboardDailyTimeOrders[]) => void) => {
    try {
        const { data } = await axios.get(`${dashboard_daily_time_orders}/0e84b065-cf7e-4799-b0a3-43b3233d0ae6`, config);
        setDailyTimeData(data.body);
    } catch { }
}

export const fetchMainStatistic = async (setMainStatisticData: (val: DashboardMainStatistic) => void) => {
    try {
        const { data } = await axios.get(dashboard_main_statistic, config);
        setMainStatisticData(data.body);
    } catch { }
}

export const fetchWaitingOrders = async (setWaitingData: (val: DashboardWaitingOrder[]) => void) => {
    try {
        const { data } = await axios.get(dashboard_wait_order, config);
        setWaitingData(data.body);
        console.log(data.body);
    } catch { }
}

export const editOrderStatus = async (setWaitingData: (val: DashboardWaitingOrder[]) => void, orderId: string, status: string) => {
    console.log(orderId);
    
    try {
        const { data } = await axios.put(`${dashboard_edit_order_status}?orderId=${orderId}&status=${status}`, {}, config);
        if (data.success) {
            fetchWaitingOrders(setWaitingData);
            console.log(data.body);
        }
    } catch (error) {
        console.log(error);
        
     }
}