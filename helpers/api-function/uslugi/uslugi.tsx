import axios from "axios";
import { getConfig } from "@/app/(tabs)/(master)/main";
import { getCategory_Client } from "@/helpers/api";
import useGetMeeStore from '@/helpers/state_managment/getMee';
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";

// Client get all Category
export const getAllCategory = async () => {
  try {
    const { userLocation } = useGetMeeStore.getState();
    const config = await getConfig();
    const { data } = await axios.get(`${getCategory_Client}?lat=${userLocation.coords.latitude}&lng=${userLocation.coords.longitude}`, config);
    ClientStory.getState().setAllCategory(data.body);
  } catch (error) {
    console.log('Error:', error);
  }
};