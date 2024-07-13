import axios from "axios";
import { getMe } from "../../api";
import { GetMee } from "@/type/getMee";
import { getConfig } from "@/app/(tabs)/main";

export const getUser = async (setGetMee: (val: GetMee) => void) => {
    try {
        const config = await getConfig()
        const { data } = await axios.get(getMe, config);
        if (data.success) {
            setGetMee(data.body);
        }
    } catch { }
}
