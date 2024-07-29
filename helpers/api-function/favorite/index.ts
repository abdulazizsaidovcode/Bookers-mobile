import { base_url } from "@/helpers/api";
import useFavoutite from "@/helpers/state_managment/favourite";
import axios from "axios";

const addfavorite = async (id: number | string) => {
  const { setData } = useFavoutite();

  try {
    const { data } = await axios.post(`${base_url}favourite/save/${id}`);
    if (data.success) setData(data);
  } catch (error: any) {
    return new Error(error);
  }
};

export default addfavorite;
