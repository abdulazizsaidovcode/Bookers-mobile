import { getConfig } from "@/app/(tabs)/(master)/main";
import { ClientOrderHistory } from "@/helpers/api";
import axios from "axios";

export const getClientDashboard = async () => {
    try {
        const config = await getConfig();
        const response = await axios.get(`${ClientOrderHistory}`, config ? config : {});
        console.log("Config:", config);
        console.log("Data:", response);
    } catch (error) {
        console.error("Error:", error); 
    }
};
