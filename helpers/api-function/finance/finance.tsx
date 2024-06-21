import {finance_day, finance_month, finance_top_client} from "@/helpers/api"
import {config} from "@/helpers/token"
import {FinanceDay, FinanceMonth, FinanceTopClients} from "@/type/finance/finance";
import axios from "axios"

export const getFinanceDay = (setData: (val: FinanceDay | null) => void, date: string | null) => {
    if (date) {
        axios.get(`${finance_day}?localDate=${date}`, config)
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

export const getFinanceMonth = (setData: (val: FinanceMonth[] | null) => void, startDate: string | null, endDate: string | null) => {
    if (startDate && endDate && (startDate !== endDate)) {
        axios.get(`${finance_month}?startDate=${startDate}&finishDate=${endDate}`, config)
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

export const getTopClients = (setData: (val: FinanceTopClients[] | null) => void) => {
    axios.get(`${finance_top_client}`, config)
        .then(res => {
            if (res.data.success) setData(res.data.body)
            else setData(null)
        })
        .catch(() => setData(null));
}