import { getConfig } from "@/app/(tabs)/(master)/main";
import { category_Father } from "@/helpers/api";
import axios from "axios";

export const getAllCategory = async() =>{
    try {
        const config = await getConfig()
        const { data } = await axios.get(category_Father, config);
    } catch (error) {
        console.log(error)
    }
};