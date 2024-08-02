import { getConfig } from "@/app/(tabs)/(master)/main";
import { base_url } from "@/helpers/api";
import axios from "axios";
import { useState } from "react";


export const getLocationData = async () => {
    const [data, setData] = useState();
    try {
        const config = await getConfig();
        const { data } = await axios.get(`${base_url}address`, config ? config : {});
        console.log(data);
        setData(data.body);

        const salonName = await axios.get(`${base_url}salon/${data.body.salonId}`, config ? config : {});
        setData({ ...data.body, salonId: salonName.data.body.name });
        return data;
    } catch (error) {
        console.log(error);
    }
};