import {finance_day, finance_month, finance_top_client} from "@/helpers/api"
import {FinanceDay, FinanceMonth, FinanceTopClients} from "@/type/finance/finance";
import axios from "axios"
import {getConfig} from "@/app/(tabs)/(master)/main";

export const getFinanceDay = async (setData: (val: FinanceDay | null) => void, date: string | null) => {
    if (date) {
        const config = await getConfig()
        await axios.get(`${finance_day}?localDate=${date}`, config ? config : {})
            .then(res => {
                if (res.data.success) setData(res.data.body)
                else setData(null)
            })
            .catch(() => setData(null));
    } else {
        setData(null)
        console.log('date mavjud emas!!!')
    }
}

export const getFinanceMonth = async (setData: (val: FinanceMonth[] | null) => void, startDate: string | null, endDate: string | null) => {
    if (startDate && endDate && (startDate !== endDate)) {
        const config = await getConfig()
        await axios.get(`${finance_month}?startDate=${startDate}&finishDate=${endDate}`, config ? config : {})
            .then(res => {
                if (res.data.success) setData(res.data.body)
                else setData(null)
            })
            .catch(() => setData(null));
    } else {
        setData(null)
        console.log('start date va end date mavjud emas!!!')
    }
}

export const getTopClients = async (setData: (val: FinanceTopClients[] | null) => void) => {
    const config = await getConfig()
    await axios.get(`${finance_top_client}`, config ? config : {})
        .then(res => {
            if (res.data.success) setData(res.data.body)
            else setData(null)
        })
        .catch(() => setData(null));
}