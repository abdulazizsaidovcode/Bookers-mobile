import { workday_get } from "@/helpers/api";
import { config } from "@/helpers/token";
import axios from "axios";



export const getWorkDay = (setData: (val: []) => void) => {
    axios
      .get(`${workday_get}`, config)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.body);
        }
        else {
          setData([])
        }
      })
      .catch(() => setData([]))
  };