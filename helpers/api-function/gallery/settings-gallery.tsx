import { Alert } from "react-native";
import { config } from "@/helpers/token";
import { GalleryData } from "@/type/gallery/gallery";
import { gallery_add, gallery_add_photo, gallery_full_data, gallery_list, } from "@/helpers/api";
import axios from "axios";

export const fetchData = async (setData: (data: GalleryData[]) => void) => {
  try {
    const res = await axios.get(gallery_list, config);
    setData(res.data.body);
  } catch (error) {
    console.log(error);
  }
};

export const fetchFullData = async (id: number, setFullData: (data: GalleryData) => void) => {
  try {
    const res = await axios.get(`${gallery_full_data}/${id}`, config);
    console.log(res.data.body);
    setFullData(res.data.body);
  } catch (error) {
    console.log(error);
  }
};

export const addData = async (formData: FormData, name: string) => {
  try {
    const { data } = await axios.post(`${gallery_add}?name=${name}`, formData, config);
    console.log(data);
    Alert.alert("success");
  } catch (error) {
    Alert.alert("error");
    console.log(error);
  }
};

export const addPhoto = async (galleryId: number, formData: any, setFullData: (data: GalleryData) => void) => {
  console.log(formData);

  try {
    const res = await axios.post(`${gallery_add_photo}/${galleryId}`, formData, config);
    fetchFullData(galleryId, setFullData);
  } catch (error) {
    console.log(error);
  }
};

export const editName = async (id: number, setFullData: (data: GalleryData) => void, editedName: string, toggleModal: () => void) => {
  const payload = {
    name: editedName,
  };
  try {
    const res = await axios.put(`${gallery_add}/${id}`, payload, config);
    if (res.data.success) {
      fetchFullData(id, setFullData);
      toggleModal();
    }
  } catch (error) {
    console.log(error);
  }
};

export const delPhoto = async (
  id: number,
  attachmentIds: string[],
  setFullData: (data: GalleryData) => void
) => {
  const url = `${gallery_add}/${id}/attachmentIds`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      body: JSON.stringify(attachmentIds),
    });

    const data = await response.json();
    if (data.success) {
      fetchFullData(id, setFullData);
    }
  } catch (error) {
    console.log(error);
  }
};



export const delGallery = async (id: number, setData: (data: GalleryData[]) => void) => {
  try {
    const res = await axios.delete(`${gallery_add}/${id}`, config);
    if (res.data.success) {
      fetchData(setData);
    }
  } catch (error) {
    ;
  }
}