import {
  address_url,
  category_Father,
  gallery_list,
  getCategory_master,
  master_get_Service,
  master_get_specialization,
} from "@/helpers/api";
import { config } from "@/helpers/token";
import axios from "axios";

export const getServiseWith = async (
  setData: (val: any[] | null) => void,
  categoryId: string
) => {
  try {
    if (categoryId) {
      const { data } = await axios.get(
        `${master_get_Service}${categoryId}`,
        config
      );

      if (data.success) setData(data.body);
      else setData(null);
    } else setData(null);
  } catch (err) {
    setData(null);
  }
};

export const getCategoryF = async (setData: (val: any[] | null) => void) => {
  try {
    const { data } = await axios.get(`${getCategory_master}`, config);

    if (data.success) setData(data.body);
    else setData(null);
  } catch (err) {
    setData(null);
  }
};

export const getspecialization = async (
  setData: (val: any[] | null) => void,
  id: any
) => {
  try {
    if (id) {
      const { data } = await axios.get(`${master_get_specialization}/${id}`, config);
      if (data.success) setData(data.body);
      else setData(null);
    }
    else { 
        setData(null)
    }
  } catch (err) {
    setData(null);
  }
};

export const getAddress = (setData: (val: any[] | null) => void) => {
    axios.get(address_url, config) 
    .then((res) => {
      if ( res.data.success ) setData(res.data.body)
      else setData(res.data.message)
        })
    .catch(() => {
      setData(null)
    })
}

export const getGaleriya = (setData: (data: any) => void) => {
    axios.get(gallery_list, config)
    .then((res) => {
      setData(res.data.body);
    })
   .catch ((error) => {
    setData([])
  })
}
