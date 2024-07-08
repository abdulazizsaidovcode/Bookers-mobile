import {free_time_list} from "@/helpers/api";
import {config} from "@/helpers/token";
import axios from "axios";

export function getFreeTime(date: string | null, setData: (val: any) => void, masterID?: string) {
    axios.get(`${free_time_list}?date=${date}&masterId=${masterID ? masterID : 'accec2c2-a471-4da8-ad26-812b83d2b103'}`, config)
        .then((res) => {
            setData(res.data.body);
        })
        .catch(() => {
            setData([]);
        });
}
