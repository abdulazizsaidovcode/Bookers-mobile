import { getConfig } from "@/app/(tabs)/main";
import { expene_category_list, expene_category_post, expene_list } from "@/helpers/api";
// import { config } from "@/helpers/token";
import axios from "axios"

export const getExpenceCategory = async (setExpenceCategory: any) => {
    try {
        const config = await getConfig();
        const res = await axios.get(expene_category_list, config);
        if (res.data.success) {
            setExpenceCategory(res.data.body);
        } else {
            setExpenceCategory([]);
        }
    } catch (error) {
        console.log(error);
        setExpenceCategory([]);
    }
};

export const getExpence = async (categoryid: string, setExpence: any) => {
    try {
        if (categoryid) {
            const config = await getConfig();
            const response = await axios.get(`${expene_list}/${categoryid}`, config);
            setExpence(response.data.body);
            console.log(response.data.body);
        }
    } catch (error) {
        console.log(error);
        setExpence([]);
    }
};

export const postExpence = async (data: any, setResponse: any) => {
    try {
        if (data) {
            const config = await getConfig();
            const res = await axios.post(expene_list, data, config);
            setResponse(res.data.success);
            console.log(res.data);
        }
    } catch (error) {
        console.log(error);
    }
};

export const postExpenceCategory = async (data: any, setResponse: any) => {
    try {
        if (data) {
            const config = await getConfig();
            const res = await axios.post(expene_category_post, data, config);
            console.log(res.data.success);
            setResponse(res.data.success);
        }
    } catch (error) {
        setResponse(error);
    }
};


