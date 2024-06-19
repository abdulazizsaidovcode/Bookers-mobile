import { finance_top_client } from "@/helpers/api"
import { config } from "@/helpers/token"
import { FinanceTopClients } from "@/type/finance/finance";
import axios from "axios"

export const getTopClients = (setData: (val: FinanceTopClients[] | null) => void) => {    
    axios.get(`${finance_top_client}`, config)
        .then(res => {
            if(res.data.success) setData(res.data.body)
            else setData(null)
        })
        .catch(() => setData(null));
}