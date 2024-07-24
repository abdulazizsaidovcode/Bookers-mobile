import axios from "axios";
import { getConfig } from "@/app/(tabs)/(master)/main";
import { getCategory_Client, getClient_filter, getClient_freeTime } from "@/helpers/api";
import useGetMeeStore from '@/helpers/state_managment/getMee';
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";
import useTopMastersStore from "@/helpers/state_managment/masters";
import { config } from "@/helpers/token";

// Client get all Category
export const getAllCategory = async () => {
  try {
    const { userLocation } = useGetMeeStore.getState();
    const config = await getConfig();
    const { data } = await axios.get(
      `${getCategory_Client}?lat=${userLocation.coords.latitude}&lng=${userLocation.coords.longitude}`,
      config ? config : {}
    );
    if (data.success) {
      ClientStory.getState().setAllCategory(data.body);
    } else {
      console.log('Data fetch was not successful:', data.message);
    }
  } catch (error) {
    console.log('Error fetching categories:', error);
  }
};

// Client post filter
  export const postClientFilter = async (categoryId?: any, gender?: boolean | null, nextToMe?: number | null, rating?: number | null, lat?: number | null, lng?: number | null, inputValue?: string | null, toggleModal?: () => void) => {
    try {
      const config = await getConfig();
      const postData = { categoryId, gender, nextToMe, rating, lat, lng };
      const { data } = await axios.post(`${getClient_filter}${inputValue ? `?nameOrPhone=${inputValue}`: ""}`, postData, config ? config : {});
      if (data.success) {
        ClientStory.getState().setClientData(data.body)
        toggleModal ? toggleModal() : null 
      };
      ClientStory.getState().setClientId(data.body.id)
    } catch (error) {
      console.log('Error:', error);
    }
  };
// Clinet commnet by master 
interface CommentData {
  clientId: string | null;
  masterId: string | null;
  adminId: string | null;
  message: string;
  messageStatus: string;
}
export const postComment = async (commentData: CommentData) => {
  try {
    console.log('Posting comment data:', commentData);
    const response = await axios.post(`${postComment}`, commentData, config ? config : {});
    console.log(config);
    
    console.log('Comment posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting comment:', error);
  }
};


// Client masterlarni bo'sh vaqti borlarini  chiqarib ber 
export const getFreeTime = async () => {
  try {
    const config = await getConfig();
    const response = await axios.post(`${getClient_freeTime}`, {}, config ? config : {});
    const freeTime = response.data.body;
    return freeTime;
  } catch (error) {
    console.log("Error:", error);
  }
};

