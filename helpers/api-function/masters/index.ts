import { getConfig } from "@/app/(tabs)/(master)/main";
import { base_url } from "@/helpers/api";
import useTopMastersStore from "@/helpers/state_managment/masters";
import axios from "axios";

export const getTopMasters = async (name?: string) => {
  const { setTopMasters, setIsloading } = useTopMastersStore.getState();
  setIsloading(true);
  try {
    const config = await getConfig();
    const url = name
      ? `${base_url}user/top/masters?nameOrPhone=${name}`
      : `${base_url}user/top/masters`;
    const { data } = await axios.get(url, config || {});
    if (data.success) {
      setTopMasters(data.body);
    } else {
      setTopMasters([]);
    }
  } catch (error) {
    console.error("Error fetching top masters:", error);
    setTopMasters([]);
  } finally {
    setIsloading(false);
  }
};

export const getCategory = async () => {
  const { setCategory } = useTopMastersStore.getState();
  try {
    const config = await getConfig();
    const { data } = await axios.get(`${base_url}category`, config || {});
    if (data.success) {
      setCategory(data.body);
    } else {
      setCategory([]);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    setCategory([]);
  }
};
