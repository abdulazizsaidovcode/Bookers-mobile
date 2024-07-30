import { getConfig } from "@/app/(tabs)/(master)/main";
import {
  address_url,
  gallery_list,
  getCategory_master,
  master_get_Service,
  master_get_specialization,
} from "@/helpers/api";
import axios from "axios";

export const getServiseWith = async (
  setData: (val: any[] | null) => void,
  categoryId: any,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    if (categoryId) {
      const config = await getConfig();
      const { data } = await axios.get(
        `${master_get_Service}${categoryId}`,
        config ? config : {}
      );
      if (data.success) {
        setIsLoading ? setIsLoading(false) : () => {};
        setData(data.body);
      } else {
        setIsLoading ? setIsLoading(false) : () => {};
        setData([]);
      }
    } else setData([]);
  } catch (err) {
    setIsLoading ? setIsLoading(false) : () => {};
    setData([]);
  }
};

export const getCategoryF = async (
  setData: (val: any[] | null) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    const config = await getConfig(); // Ensure getConfig is awaited to handle async behavior
    const response = await axios.get(
      `${getCategory_master}`,
      config ? config : {}
    );

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(response.data.body);
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(null);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    setIsLoading ? setIsLoading(false) : () => {};
    setData(null);
  }
};

export const getSpecialization = async (
  setData: (val: any[] | null) => void,
  id: any,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    if (!id) {
      setData(null);
      return;
    }

    const config = await getConfig(); // Ensure getConfig is awaited to handle async behavior
    const response = await axios.get(
      `${master_get_specialization}/${id}`,
      config ? config : {}
    );

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(response.data.body);
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(null);
    }
  } catch (error) {
    setIsLoading ? setIsLoading(false) : () => {};
    console.error("Error fetching specialization:", error);
    setData(null);
  }
};

export const getAddress = async (
  setData: (val: any | null) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    const config = await getConfig(); // Ensure getConfig is awaited to handle async behavior
    const response = await axios.get(address_url, config ? config : {});

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(response.data.body);
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(null);
    }
  } catch (error) {
    setIsLoading ? setIsLoading(false) : () => {};
    console.error("Error fetching address:", error);
    setData(null);
  }
};
export const getGaleriya = async (
  setData: (data: any | null) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    const config = await getConfig(); // Ensure getConfig is awaited to handle async behavior
    const response = await axios.get(gallery_list, config ? config : {});

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(response.data.body);
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(null);
    }
  } catch (error) {
    setIsLoading ? setIsLoading(false) : () => {};
    console.error("Error fetching gallery:", error);
    setData([]);
  }
};
