import { getConfig } from "@/app/(tabs)/main";
import { dashboard_daily_time_orders, dashboard_edit_order_status, dashboard_hall_order, dashboard_main_statistic, dashboard_today_work_grafic, dashboard_wait_order } from "@/helpers/api"
import { DashboardDailyTimeOrders, DashboardHallingOrder, DashboardMainStatistic, DashboardWaitingOrder, TodayWorkGrafic } from "@/type/dashboard/dashboard";
import axios from "axios"


export const fetchDaylyOrderTimes = async (setDailyTimeData: (val: DashboardDailyTimeOrders[]) => void, masterId: string) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(`${dashboard_daily_time_orders}/${masterId}`, config);
        if (data.success) {
            setDailyTimeData(data.body);
        }
    } catch { }
}

export const fetchMainStatistic = async (setMainStatisticData: (val: DashboardMainStatistic) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(dashboard_main_statistic, config);
        if (data.success) {
            setMainStatisticData(data.body);
        }
    } catch { }
}

export const fetchWaitingOrders = async (setWaitingData: (val: DashboardHallingOrder[]) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(dashboard_wait_order, config);
        if (data.success) {
            setWaitingData(data.body);
        }
    } catch { }
}

export const fetchHallingOrders = async (setHallData: (val: DashboardWaitingOrder[]) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(dashboard_hall_order, config);
        if (data.success) {
            setHallData(data.body);
        }
    } catch { }
}

export const fetchTodayWorkGrafic = async (setTodayGrafic: (val: TodayWorkGrafic) => void, masterId: string) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(`${dashboard_today_work_grafic}/${masterId}`, config);
        if (data.success) {
            setTodayGrafic(data.body);
        }
    } catch { }
}

export const editOrderStatus = async (setWaitingData: (val: DashboardWaitingOrder[]) => void, orderId: string, status: string, toggleModal: () => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.put(`${dashboard_edit_order_status}?orderId=${orderId}&status=${status}`, {}, config);
        if (data.success) {
            fetchWaitingOrders(setWaitingData);
            toggleModal();
        }
    } catch { }
}