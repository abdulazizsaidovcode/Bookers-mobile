import axios from "axios";
import { getMe } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('registerToken');
    if (value !== null) return value
  } catch (e) {
    console.error(e);
  }
};

const tokens: any = getData()

export const config = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og",
  },
};

export const imageConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og`
  }
}

export const setConfig = (): string | null =>
  (config.headers.Authorization =
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og");

// export const config = {
//   headers: {
//     Authorization: `Bearer ${tokens}`,
//   },
// };
//
// export const imageConfig = {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     Authorization: `Bearer ${tokens}`
//   }
// }
//
// export const setConfig = (): string | null => config.headers.Authorization = `Bearer ${tokens}`

export const getMee = ( setData: (val: any) => void ) => {
  axios.get(getMe, config)
  .then((res) => {
    setData(res.data.body);
  })
  .catch()

}
