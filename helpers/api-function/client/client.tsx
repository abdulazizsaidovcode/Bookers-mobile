import axios from "axios";
import {config} from "@/helpers/token";
import {client_statistics} from "@/helpers/api";

const getClientStatistics = async () => {
    try {
        const {data} = await axios.get(client_statistics, config);
        console.log(data)
    } catch (err) {
        console.error(err);
    }
}