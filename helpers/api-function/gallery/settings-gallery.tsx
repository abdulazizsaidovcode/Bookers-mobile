import { gallery_add, gallery_list } from "@/helpers/api";
import { config } from "@/helpers/token";
import { GalleryData } from "@/type/gallery/gallery";
import axios from "axios";

export const fetchData = async (setData: (data: GalleryData[]) => void) => {
    try {
        const res = await axios.get(gallery_list, config);
        setData(res.data.body);
    } catch (error) {
        console.log(error);
    }
}

export const addData = async (formData: any) => {
    try {
        const {data} = await axios.post(gallery_add, formData, config);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}
