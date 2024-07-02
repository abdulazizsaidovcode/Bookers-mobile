import axios from "axios";
import { getMe } from "../api";
import { config } from "../token";
import { GetMee } from "@/type/getMee";

export const getUser = async (setGetMee: (val: GetMee) => void) => {
    try {
        const { data } = await axios.get(getMe, config);
        if (data.success) {
            setGetMee(data.body);
        }
    } catch { }
}
