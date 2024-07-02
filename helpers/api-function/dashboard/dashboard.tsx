import { dashboard_daily_time_orders, dashboard_edit_order_status, dashboard_hall_order, dashboard_main_statistic, dashboard_wait_order } from "@/helpers/api"
import { config } from "@/helpers/token";
import { DashboardDailyTimeOrders, DashboardHallingOrder, DashboardMainStatistic, DashboardWaitingOrder } from "@/type/dashboard/dashboard";
import axios from "axios"


export const fetchDaylyOrderTimes = async (setDailyTimeData: (val: DashboardDailyTimeOrders[]) => void, masterId: string) => {
    try {
        const { data } = await axios.get(`${dashboard_daily_time_orders}/${masterId}`, config);
        setDailyTimeData(data.body);
    } catch { }
}

export const fetchMainStatistic = async (setMainStatisticData: (val: DashboardMainStatistic) => void) => {
    try {
        const { data } = await axios.get(dashboard_main_statistic, config);
        setMainStatisticData(data.body);
    } catch { }
}

export const fetchWaitingOrders = async (setWaitingData: (val: DashboardHallingOrder[]) => void) => {
    try {
        const { data } = await axios.get(dashboard_wait_order, config);
        setWaitingData(data.body);
    } catch { }
}

export const fetchHallingOrders = async (setHallData: (val: DashboardWaitingOrder[]) => void) => {
    try {
        const { data } = await axios.get(dashboard_hall_order, config);
        setHallData(data.body);
    } catch { }
}

export const editOrderStatus = async (setWaitingData: (val: DashboardWaitingOrder[]) => void, orderId: string, status: string, toggleModal: () => void) => {
    console.log(orderId);

    try {
        const { data } = await
            axios.put(`${dashboard_edit_order_status}?orderId=${orderId}&status=${status}`, {}, config);
        if (data.success) {
            fetchWaitingOrders(setWaitingData);
            toggleModal();
        }
    } catch (error) {
        console.log(error);

    }
}