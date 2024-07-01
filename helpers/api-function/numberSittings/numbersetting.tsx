import { master_get_number, master_put_number } from "@/helpers/api";
import { config } from "@/helpers/token";
import axios from "axios";

export const getNumbers = (setData: (data: any) => void) => {
  axios
    .get(master_get_number, config)
    .then((res) => {
      if (res.data.success) {
        setData(res.data.body);
      } else {
        setData([1]);
      }
    })
    .catch(() => setData([1]));
};

export const putNumbers = (number: number) => {
  if (number) {
    axios
      .put(`${master_put_number}?number=${number}`, '', config)
      .then((res) => {
        console.log(res);
        
      })
      .catch((err) => {
        console.log(err);
        
      });
  }
  
};
