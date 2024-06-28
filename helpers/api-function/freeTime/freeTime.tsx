import { free_time_list } from "@/helpers/api";
import { config } from "@/helpers/token";
import axios from "axios";

export function getFreeTime(date: string | null, setData: (val: any) => void) {
    const url = `${free_time_list}?date=${date}&masterId=0e84b065-cf7e-4799-b0a3-43b3233d0ae6`;
    
    axios
        .get(url, config)
        .then((res) => {
            setData(res.data.body);
        })
        .catch((err) => {
            setData([]);
        });
}
