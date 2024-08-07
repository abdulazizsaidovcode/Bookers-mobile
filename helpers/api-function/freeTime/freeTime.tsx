import { free_time_list } from "@/helpers/api";
import axios from "axios";
import { getConfig } from "@/app/(tabs)/(master)/main";

export async function getFreeTime(date: string | null, setData: (val: any) => void, masterID?: string, setLoading?: any) {

    const config = await getConfig()

    await axios.get(`${free_time_list}?date=${date}&masterId=${masterID}`, config ? config : {})
        .then((res) => {
            if (res.data.success) {
                const seen = new Map();

                res.data.body.forEach((item: any) => {
                    seen.set(item, true);
                });

                const uniqueTimes = Array.from(seen.keys());

                console.log(res.data.body, 'data');

                setData(uniqueTimes);
                setLoading(false);
            }
            else {
                console.log(res.data, 'salom');
                setLoading(false)
            }

        })
        .catch(() => {
            setData([]);
            setLoading(false)
        });
}
