import { expene_category_list, expene_list } from "@/helpers/api";
import { config } from "@/helpers/token";
import axios from "axios"


export const getExpenceCategory = (setExpenceCategory: any) => {
    axios.get(expene_category_list, config)
        .then((res) => {
            setExpenceCategory(res.data.body)
        }).catch((err) => {
            console.log(err);
            setExpenceCategory([])
        })
}

export const getExpence = (categoryid: string, setExpence: any) => {
    axios.get(`${expene_list}?categoryid=${categoryid}`, config)
        .then((res) => {
            setExpence(res.data.body)
        }).catch((err) => {
            console.log(err);
            setExpence([])
        })
}