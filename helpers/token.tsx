import axios from "axios";
import { getMe } from "./api";

// export const config = {
//   headers: {
//     Authorization:
//       "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og",
//   },
// };

// local hostda ishlash uchun 
export const config = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTA4OTA0ODExIn0.HMmXsybX0YzxBKUm8It7cd3msVThLw0M3yN_AO-kv7CRnNxpF6Ft12s-Wmi_E4KrX6qIKU440lCvTuNh5Gz40w",
  },
};

export const imageConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTA4OTA0ODExIn0.HMmXsybX0YzxBKUm8It7cd3msVThLw0M3yN_AO-kv7CRnNxpF6Ft12s-Wmi_E4KrX6qIKU440lCvTuNh5Gz40w`
  }
}

export const setConfig = (): string | null =>
  (config.headers.Authorization =
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTAwMDQzMDUxIn0.K-7YCoydy9DsZOkdan4QTWcnrWnFhSWRhqSXqa_PrxfOx4K_VCffMjfdejuZKSuWF4055eHy1m3Y81qxYfg2og");

export const getMee = ( setData: (val: any) => void ) => {
  axios.get(getMe, config)
  .then((res) => {
    setData(res.data.body);
  })
  .catch()

}
