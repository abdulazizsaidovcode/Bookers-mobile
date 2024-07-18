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
    const { data } = await axios.get(url, config);
    setTopMasters(data.body);
  } catch (error) {
    console.error("Error fetching top masters:", error);
  } finally {
    setIsloading(false);
  }
};
