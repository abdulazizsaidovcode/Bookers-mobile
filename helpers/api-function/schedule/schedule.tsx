import { getConfig } from "@/app/(tabs)/main";
import { master_service_list, schedule_list } from "@/helpers/api";
import { weekList } from "@/type/graficWork/graficWork";
import axios from "axios";


export const getBookedSchedule = async (date: string, setData: (val: weekList[]) => void) => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${schedule_list}?localDate=${date}`, config);
        if (response.data.success) {
            setData(response.data.body);
        } else {
            setData([]);
        }
    } catch (error) {
        console.log(error);
        setData([]);
    }
};



export const getAvialable = async (setData: (val: weekList[]) => void) => {
    try {
        const config = await getConfig(); // Fetch the config asynchronously
        const response = await axios.get(`${master_service_list}`, config);
        if (response.data.success) {
            setData(response.data.body);
        } else {
            setData([]);
        }
    } catch (error) {
        console.log(error);
        setData([]);
    }
};