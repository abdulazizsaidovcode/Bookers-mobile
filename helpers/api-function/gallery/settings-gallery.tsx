import { config, imageConfig } from "@/helpers/token";
import { EditMainPhoto, GalleryData } from "@/type/gallery/gallery";
import { main_gallery, gallery_add_photo, gallery_edit_main_photo, gallery_full_data, gallery_list, } from "@/helpers/api";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { getConfig, getConfigImg } from "@/app/(tabs)/main";

export const fetchData = async (setData: (data: GalleryData[]) => void) => {
  try {
    const config = await getConfig()
    const { data } = await axios.get(gallery_list, config);
    setData(data.body);
  } catch (error) {
    console.log(error);
  }
};

export const fetchFullData = async (id: number, setFullData: (data: GalleryData) => void) => {
  try {
    const config = await getConfig()
    const { data } = await axios.get(`${gallery_full_data}/${id}`, config);
    setFullData(data.body);
  } catch (error) {
    console.log(error);
  }
};

export const addData = async (formData: FormData, name: string, setData: (data: GalleryData[]) => void, setImages: (val: string[]) => void, setAlbumName: (val: string) => void, setMainImageIndices: (val: number[]) => void, goBack: void) => {
  try {
    const config = await getConfigImg()
    console.log(config);
    
    const { data } = await axios.post(`${main_gallery}?name=${name}`, formData, config);
    if (data.success) {
      fetchData(setData)
      setImages([])
      setAlbumName('')
      setMainImageIndices([])
      goBack
      Toast.show("Ваша галерея добавлена", Toast.LONG);
    }
  } catch (error) {
    Toast.show(`Пожалуйста, повторите попытку позже`, Toast.LONG);
    console.log(error);
  }
};

export const addPhoto = async (galleryId: number, formData: FormData, setFullData: (data: GalleryData) => void, setImages: (val: string[]) => void) => {
  try {
    const config = await getConfigImg()
    const { data } = await axios.post(`${gallery_add_photo}/${galleryId}`, formData, config);
    if (data.success) {
      fetchFullData(galleryId, setFullData);
      setImages([]);
      Toast.show('Пожалуйста, подождите, администратор должен одобрить вашу фотографию.', Toast.LONG)
    }
  } catch (error) {
    Toast.show(`Пожалуйста, повторите попытку позже`, Toast.LONG);
    console.log(error);
  }
};

export const editName = async (id: number, setFullData: (data: GalleryData) => void, editedName: string, toggleModal: () => void, setData: (data: GalleryData[]) => void) => {
  try {
    const config = await getConfig()
    const { data } = await axios.put(`${main_gallery}/${id}?name=${editedName}`, {}, config);
    if (data.success) {
      fetchFullData(id, setFullData);
      fetchData(setData)
      toggleModal();
      Toast.show('Название галереи успешно обновлено.', Toast.LONG)
    }
  } catch (error) {
    console.log(error);
  }
};

export const editMainPhoto = async (setFullData: (data: GalleryData) => void, setData: (data: GalleryData[]) => void, galleryId: number, payload: EditMainPhoto[]) => {
  try {
    const config = await getConfig()
    const { data } = await axios.put(`${gallery_edit_main_photo}/${galleryId}`, payload, config);
    if (data.success) {
      fetchFullData(galleryId, setFullData);
      fetchData(setData);
      Toast.show('Ваша основная фотография успешно обновлена.', Toast.LONG)
    }
  } catch (error) {
    console.log(error);
  }
}

export const delPhoto = async (
  id: number,
  attachmentIds: string[],
  setFullData: (data: GalleryData) => void,
  setData: (data: GalleryData[]) => void,
  toggleModal: () => void
) => {
  const url = `${main_gallery}/${id}/attachmentIds`;
  try {
    const config = await getConfig()
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
      fetchData(setData);
      toggleModal()
      Toast.show('Фото успешно удалено из галереи.', Toast.LONG);
    }
  } catch (error) {
    console.log(error);
  }
};

export const delGallery = async (id: number | null, setData: (data: GalleryData[]) => void, toggleModal: () => void, toggleCheckboxes: () => void) => {
  try {
    const config = await getConfig()
    const res = await axios.delete(`${main_gallery}/${id}`, config);
    if (res.data.success) {
      fetchData(setData);
      toggleModal()
      toggleCheckboxes()
      Toast.show('Ваша галерея успешно удалена', Toast.LONG)
    }
  } catch (error) {
    console.log(error);
  }
}