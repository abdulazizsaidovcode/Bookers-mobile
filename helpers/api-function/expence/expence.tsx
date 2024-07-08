import { expene_category_list, expene_category_post, expene_list } from "@/helpers/api";
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
    if (categoryid) {
        axios.get(`${expene_list}/${categoryid}`, config)
            .then((res) => {
                setExpence(res.data.body)
                console.log(res.data.body);

            }).catch((err) => {
                console.log(err);
                setExpence([])
            })
    }
}

export const postExpence = (data: any, setResponse: any) => {
    if (data) {
        axios.post(expene_list, data, config)
            .then((res) => {
                setResponse(res.data.success);
                console.log(res.data);
                
            }).catch((err) => {
                setResponse(err.response?.data?.status || 'error');
                console.log(err.data);
            });
            
    }
};

export const postExpenceCategory = (data: any, setResponse: any) => {
    if (data) {
        axios.post(expene_category_post, data, config)
            .then((res) => {
                console.log(res.data.success);
                setResponse(res.data.success);
            }).catch((err) => {
                setResponse(err.response?.data?.status || 'error');
            })
    }
}


