import { getConfig } from "@/app/(tabs)/(master)/main";
import {getCategory_Client } from "@/helpers/api";
import axios from "axios";
import useGetMeeStore from '@/helpers/state_managment/getMee';

const { userLocation, setUserLocation } = useGetMeeStore();

export const getAllCategory = async() =>{
    try {
        const config = await getConfig()
        const { data } = await axios.get(`${getCategory_Client}`, config);
        console.log(data);
    } catch (error) {
        console.log(error)
    }
};