import { free_time_list } from "@/helpers/api";
import { config } from "@/helpers/token";
import axios from "axios";


export function getFreeTime(date:any, setData: (val: any) => void) {
    axios
        .get(`${free_time_list}${date ? `?date=${date}` : '&masterId=0e84b065-cf7e-4799-b0a3-43b3233d0ae6'} `, config)
        .then((res) => {
            if (res.data.success) {
                setData(res.data.body);
            }
            else {
                setData([])
            }
        })
        .catch(() => setData([]))
}