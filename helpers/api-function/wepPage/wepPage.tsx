import { getConfig } from "@/app/(tabs)/main";
import {
  address_url,
  category_Father,
  gallery_list,
  getCategory_master,
  master_get_Service,
  master_get_specialization,
} from "@/helpers/api";
import axios from "axios";

export const getServiseWith = async (
  setData: (val: any[] | null) => void,
  categoryId: any
) => {
  try {
    if (categoryId) {
      const config = await getConfig()
      const { data } = await axios.get(
        `${master_get_Service}${categoryId}`,
        config
      );

      if (data.success) setData(data.body);
      else setData([]);
    } else setData([]);
  } catch (err) {
    setData([]);
  }
};

export const getCategoryF = async (setData: (val: any[] | null) => void) => {
  try {
    const config = await getConfig(); // Ensure getConfig is awaited to handle async behavior
    const response = await axios.get(`${getCategory_master}`, config);

    if (response.data.success) {
      setData(response.data.body);
    } else {
      setData(null);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    setData(null);
  }
};

export const getSpecialization = async (
  setData: (val: any[] | null) => void,
  id: any
) => {
  try {
    if (!id) {
      setData(null);
      return;
    }

    const config = await getConfig(); // Ensure getConfig is awaited to handle async behavior
    const response = await axios.get(`${master_get_specialization}/${id}`, config);

    if (response.data.success) {
      setData(response.data.body);
    } else {
      setData(null);
    }
  } catch (error) {
    console.error('Error fetching specialization:', error);
    setData(null);
  }
};

export const getAddress = async (setData: (val: any | null) => void) => {
  try {
    const config = await getConfig(); // Ensure getConfig is awaited to handle async behavior
    const response = await axios.get(address_url, config);

    if (response.data.success) {
      setData(response.data.body);
      console.log(response.data.body);
    } else {
      console.log(response.data.message);
      setData(null)
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    setData(null);
  }
};
export const getGaleriya = async (setData: (data: any | null) => void) => {
  try {
    const config = await getConfig(); // Ensure getConfig is awaited to handle async behavior
    const response = await axios.get(gallery_list, config);

    setData(response.data.body);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    setData([]);
  }
};
