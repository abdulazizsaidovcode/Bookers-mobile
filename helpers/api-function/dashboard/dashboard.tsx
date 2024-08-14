import { getConfig } from "@/app/(tabs)/(master)/main";
import { dashboard_daily_time_orders, dashboard_edit_order_status, dashboard_hall_order, dashboard_main_statistic, dashboard_today_work_grafic, dashboard_wait_order } from "@/helpers/api"
import { DashboardDailyTimeOrders, DashboardHallingOrder, DashboardMainStatistic, DashboardWaitingOrder, TodayWorkGrafic } from "@/type/dashboard/dashboard";
import axios from "axios"
// import Toast from 'react-native-simple-toast'

export const fetchDaylyOrderTimes = async (setDailyTimeData: (val: DashboardDailyTimeOrders[]) => void, masterId: string, setWorkPending: (val: boolean) => void) => {
    setWorkPending(true)
    try {
        const config = await getConfig()
        const { data } = await axios.get(`${dashboard_daily_time_orders}/${masterId}`, config ? config : {});
        if (data.success) {
            setDailyTimeData(data.body.statusTimes);
            setWorkPending(false)
        } else {
            setDailyTimeData([])
            setWorkPending(false)
        }
    } catch (error) {
        console.log(error);
        setDailyTimeData([])
        setWorkPending(false)
    }
}

export const fetchMainStatistic = async (setMainStatisticData: (val: DashboardMainStatistic) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(dashboard_main_statistic, config ? config : {});
        if (data.success) {
            setMainStatisticData(data.body);
        }
    } catch { }
}

export const fetchWaitingOrders = async (setWaitingData: (val: DashboardWaitingOrder[]) => void, setIsLoading: (val: boolean) => void) => {
    setIsLoading(true)
    try {
        const config = await getConfig()
        const { data } = await axios.get(dashboard_wait_order, config ? config : {});
        if (data.success) {
            setWaitingData(data.body);
            setIsLoading(false)
        } else {
            setIsLoading(false)
            setWaitingData([])
        }
    } catch {
        setIsLoading(false)
        setWaitingData([])
    }
}

export const fetchHallingOrders = async (setHallData: (val: DashboardWaitingOrder[]) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(dashboard_hall_order, config ? config : {});
        if (data.success) {
            setHallData(data.body);
        } else setHallData([])
    } catch {
        setHallData([])
    }
}

export const fetchTodayWorkGrafic = async (setTodayGrafic: (val: TodayWorkGrafic) => void, masterId: string, setWorkPending: (val: boolean) => void) => {
    setWorkPending(true)
    try {
        const config = await getConfig()
        const { data } = await axios.get(`${dashboard_today_work_grafic}/${masterId}`, config ? config : {});
        if (data.success) {
            setTodayGrafic(data.body);
            setWorkPending(false)
        } else setWorkPending(false)
    } catch {
        setWorkPending(false)
    }
}

export const editOrderStatus = async (setWaitingData: (val: DashboardWaitingOrder[]) => void, setHallData: (val: DashboardHallingOrder[]) => void, orderId: string, status: string, toggleRejectModal: () => void, toggleConfirmModal: () => void, setIsLoading: (val: boolean) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.put(`${dashboard_edit_order_status}?orderId=${orderId}&status=${status}`, {}, config ? config : {});
        if (data.success) {
            await fetchWaitingOrders(setWaitingData, setIsLoading);
            await fetchHallingOrders(setHallData);
            if (status === 'CONFIRMED') {
                alert(`${data.message}`,)
                toggleConfirmModal();
            }
            else if (status === 'REJECTED') {
                toggleRejectModal();
                alert(`${data.message}`,)
            }
        }
    } catch (error) {
        console.log(error)
    }
}