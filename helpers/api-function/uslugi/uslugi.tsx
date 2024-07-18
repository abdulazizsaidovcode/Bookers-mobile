import axios from "axios";
import { getConfig } from "@/app/(tabs)/(master)/main";
import { getCategory_Client, getClient_filter } from "@/helpers/api";
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

// Client post filter
export const postClientFilter = async (categoryId: any, gender?: boolean | null, nextToMe?: number | null, rating?: number | null, lat: number | null, lng: number | null) => {
  try {
    const config = await getConfig();
    const postData = { categoryId, gender, nextToMe, rating, lat, lng };
    const { data } = await axios.post(`${getClient_filter}`, postData, config);
    if (data.success) {
      ClientStory.getState().setClientData(data.body);
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

// Master search client 

