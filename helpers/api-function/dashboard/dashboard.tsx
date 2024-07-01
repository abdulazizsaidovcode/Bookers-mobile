import { dashboard_daily_time_orders, dashboard_main_statistic } from "@/helpers/api"
import { config } from "@/helpers/token";
import { DashboardDailyTimeOrders, DashboardMainStatistic } from "@/type/dashboard/dashboard";
import axios from "axios"

export const fetchDaylyOrderTimes = async (setData: (val: DashboardDailyTimeOrders[]) => void) => {
    try {
        const { data } = await axios.get(`${dashboard_daily_time_orders}/0e84b065-cf7e-4799-b0a3-43b3233d0ae6`, config);
        setData(data.body);        
    } catch (error) {
        console.log(error)
    }
}

export const fetchMainStatistic = async (setMainStatisticData: (val: DashboardMainStatistic) => void) => {
    try {
        const { data } = await axios.get(dashboard_main_statistic, config);
        setMainStatisticData(data.body);        
        console.log(data.body);        
    } catch (error) {
        console.log(error)
    }
}