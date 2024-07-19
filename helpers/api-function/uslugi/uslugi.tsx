import axios from "axios";
import { getConfig } from "@/app/(tabs)/(master)/main";
import { getCategory_Client, getClient_filter } from "@/helpers/api";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";
import useTopMastersStore from "@/helpers/state_managment/masters";

// Client get all Category
export const getAllCategory = async () => {
  try {
    const { userLocation } = useGetMeeStore.getState();
    const config = await getConfig();
    const { data } = await axios.get(
      `${getCategory_Client}?lat=${userLocation.coords.latitude}&lng=${userLocation.coords.longitude}`,
      config ? config : {}
    );
    ClientStory.getState().setAllCategory(data.body);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const postClientFilter = async (
  categoryId: any,
  gender?: boolean | null,
  nextToMe?: number | null,
  rating?: number | null,
  lat?: number | null,
  lng?: number | null
) => {
  try {
    const config = await getConfig();
    const { setTopMasters } = useTopMastersStore.getState();
    const postData = { categoryId, gender, nextToMe, rating, lat, lng };
    console.log("Data being sent to backend:", postData);
    const { data } = await axios.post(
      `${getClient_filter}`,
      postData,
      config ? config : {}
    );
    // console.log("Response data:", data);
    if (data.success) {
      ClientStory.getState().setClientData(data.body);
      setTopMasters(data.body);
      console.log("Success response data:", data);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
