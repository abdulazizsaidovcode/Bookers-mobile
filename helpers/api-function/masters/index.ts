import { getConfig } from "@/app/(tabs)/(master)/main";
import { base_url } from "@/helpers/api";
import axios from "axios";

export const getTopMasters = async (name?: string) => {
  try {
    const config = await getConfig();
    if (name) {
      const { data } = await axios.get(
        `${base_url}user/top/masters?nameOrPhone=${name}`,
        config
      );
      console.log(data);
    } else {
      const { data } = await axios.get(`${base_url}user/top/masters`, config);
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
};
