import { expene_category_list } from "@/helpers/api";
import axios from "axios"


export const getExpence = (setCategory: any) => {
    axios.get(expene_category_list)
        .then((res) => {
            setCategory(res.data.body)
        }).catch((err) => {
            console.log(err);
            setCategory([])
        })
}