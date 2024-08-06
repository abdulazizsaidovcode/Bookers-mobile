import { free_time_list } from "@/helpers/api";
import axios from "axios";
import { getConfig } from "@/app/(tabs)/(master)/main";

export async function getFreeTime(date: string | null, setData: (val: any) => void, masterID?: string, setLoading?: any) {

    const config = await getConfig()
    
    await axios.get(`${free_time_list}?date=${date}&masterId=${masterID}`, config ? config : {})
        .then((res) => {
            setData(res.data.body);
            console.log(res.data.body,'salom');
            
            if(res.data.success) setLoading(false)
            else setLoading(false)
        })
        .catch(() => {
            setData([]);
            setLoading(false)
        });
}
