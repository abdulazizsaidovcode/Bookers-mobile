import { getConfig } from "@/app/(tabs)/(master)/main";
import { base_url } from "@/helpers/api";
import useTopMastersStore from "@/helpers/state_managment/masters";
import axios from "axios";
export interface Master {
  id: string;
  fullName: string;
  phone: string;
  salonName: string | null;
  genderName: "MALE" | "FEMALE" | null;
  feedbackCount: number;
  orderCount: number;
  clientCount: number;
  lat: number | null;
  lng: number | null;
  district: string | null;
  street: string | null;
  house: string | null;
  attachmentId: string | null;
  nextEntryDate: string;
  mainPhoto: string | null;
}

interface ApiResponse {
  body: {
    page: number;
    size: number;
    totalElements: number;
    totalPage: number;
    object: Master[];
  };
  status: string;
  message: string;
  success: boolean;
}

export const getTopMasters = async (
  page = 1,
  size = 10,
  name?: string
): Promise<void> => {
  const { setTopMasters, setIsloading, masters } =
    useTopMastersStore.getState();
  setIsloading(true);
  try {
    const config = await getConfig();
    console.log(config);
    console.log(page);
    
    const url = name
      ? `${base_url}user/top/masters?page=${page}&size=${size}&nameOrPhone=${name}`
      : `${base_url}user/top/masters?page=${page}&size=${size}`;
    const { data } = await axios.get<ApiResponse>(url, config || {});
    if (data.success) {
      let arr = [...masters, ...data.body.object];
      const seen: any = {};
      const result: any = [];

      arr.forEach((item) => {
        if (!seen[item.id]) {
          seen[item.id] = true;
          result.push(item);
        }
      });

      setTopMasters([...result]);
    } else {
      setTopMasters([...masters]);
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
