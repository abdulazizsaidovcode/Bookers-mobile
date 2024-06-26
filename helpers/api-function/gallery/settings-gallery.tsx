import { gallery_add, gallery_full_data, gallery_list } from "@/helpers/api";
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

export const fetchFullData = async (id: number, setFullData: (data: GalleryData) => void) => {
    try {
        const res = await axios(`${gallery_full_data}/${id}`, config);
        console.log(res.data.body);
        setFullData(res.data.body)
    } catch (error) {
        console.log(error);
    }
}

export const addData = async (formData: any) => {
    try {
        const { data } = await axios.post(gallery_add, formData, config);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

export const editName = async (id: number, setFullData: (data: GalleryData) => void, editedName: string, toggleModal: () => void) => {
    const payload = {
        name: editedName
    }
    try {
        const res = await axios.put(`${gallery_add}/${id}`, payload, config);
        if (res.data.success) {
            fetchFullData(id, setFullData);
            toggleModal()
        }
    } catch (error) {
        console.log(error);
    }
}

export const delPhoto = async (id: number, attachmentId: string[], setFullData: (data: GalleryData) => void) => {
    try {
        const res = await axios.delete(`${gallery_add}/${id}/${attachmentId}`, config);
        if (res.data.success) {
            fetchFullData(id, setFullData);
        }
    } catch (error) {
        console.log(error);
    }
} 