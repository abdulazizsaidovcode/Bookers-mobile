import { finance_top_client } from "@/helpers/api"
import { config } from "@/helpers/token"
import axios from "axios"

export const getTopClients = () => {
    // try {
    //     const res = axios.get(`${finance_top_client}`, config)
    //     console.log(res);
    // } catch (err) {
    //     console.log(err);
    // }
    console.log(finance_top_client);
    console.log(config);
    
    axios.get(`${finance_top_client}`, config)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
}