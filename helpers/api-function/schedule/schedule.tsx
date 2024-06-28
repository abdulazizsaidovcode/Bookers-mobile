import { master_service_list, schedule_list } from "@/helpers/api";
import { config } from "@/helpers/token";
import { weekList } from "@/type/graficWork/graficWork";
import axios from "axios";

export const getBookedSchedule = (date: string, setData: (val: weekList[]) => void) => {
    axios
        .get(`${schedule_list}?localDate=2024-06-26`, config)
        .then((res) => {
            if (res.data.success) {
                setData(res.data.body);
            }
            else {
                setData([])
            }
        })
        .catch(() => setData([]))
};


export const getAvialable = (setData: (val: weekList[]) => void) => {
    axios
        .get(`${master_service_list}`, config)
        .then((res) => {
            if (res.data.success) {
                setData(res.data.body);
            }
            else {
                setData([])
            }
        })
        .catch(() => setData([]))
};