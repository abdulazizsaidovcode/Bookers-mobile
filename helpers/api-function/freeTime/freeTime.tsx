import {free_time_list} from "@/helpers/api";
import axios from "axios";
import {getConfig} from "@/app/(tabs)/main";

export async function getFreeTime(date: string | null, setData: (val: any) => void, masterID?: string) {
    const config = await getConfig()
    await axios.get(`${free_time_list}?date=${date}&masterId=${masterID}`, config)
        .then((res) => {
            setData(res.data.body);
        })
        .catch(() => {
            setData([]);
        });
}
