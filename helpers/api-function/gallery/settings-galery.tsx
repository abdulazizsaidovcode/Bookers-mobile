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

export const addData = async (setData: (data: GalleryData[]) => void, albumName: string, photos: string[], mainPhotos: string[]) => {
    const payload = {
        albumName: albumName,
        photos: photos,
        mainPhotos: mainPhotos,
    }
    try {
        const res = await axios.post(gallery_add, payload, config);
        fetchData(setData)
    } catch (error) {
        console.log(error);
    }
}
