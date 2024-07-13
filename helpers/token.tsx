import axios from "axios";
import { getMe } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getConfig} from "@/app/(tabs)/main";

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("registerToken");
    if (value !== null) return value;
  } catch (e) {
    console.error(e);
  }
};

export const config = {
  headers: {
    Authorization: `Bearer ${getData()}`,
  },
};

export const imageConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${getData()}`,
  },
};

export const setConfig = (): string | null =>
  (config.headers.Authorization = `Bearer ${getData()}`);

export const getMee = async (setData: (val: any) => void) => {
  const configs = await getConfig()
  axios.get(getMe, configs)
    .then((res) => {
      setData(res.data.body);
    })
    .catch();
};

// export const config = {
//   headers: {
//     Authorization:
//       `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og`,
//   },
// };
//
// export const imageConfig = {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og`
//   }
// }
//
// export const setConfig = (): string | null =>
//   (config.headers.Authorization =
//     "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og");
