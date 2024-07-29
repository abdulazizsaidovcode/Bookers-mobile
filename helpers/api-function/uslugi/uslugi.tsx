import axios from "axios";
import { getConfig } from "@/app/(tabs)/(master)/main";
import { feedbackMasterForClient, getCategory_Client, getClient_filter, getClient_freeTime, masterGalery, serviceClient, serviceMaster } from "@/helpers/api";
import useGetMeeStore from '@/helpers/state_managment/getMee';
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";
import useTopMastersStore from "@/helpers/state_managment/masters";
import { config } from "@/helpers/token";
import { useReviewsStore } from "@/helpers/state_managment/reviews/reviewsStore";

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
export const postClientFilter = async (categoryId?: string[], gender?: boolean | null, nextToMe?: number | null, rating?: number | null, lat?: number | null, lng?: number | null, inputValue?: string | null, toggleModal?: () => void, page?: number, size?: number) => {
  try {
      const config = await getConfig();
      const postData = { categoryId, gender, nextToMe, rating, lat, lng };
      console.log('Sending POST data:', postData);
      const url = `${getClient_filter}?page=${page ? page : 0}&size=${size ? size : 10}${inputValue ? `?nameOrPhone=${inputValue}` : ""}`;
      const { data } = await axios.post(url, postData, config ? config : {});
      console.log(data.body.object);
      if (data.success) {
          ClientStory.getState().setClientData(data.body.object);
          if (toggleModal) toggleModal();
      }
      ClientStory.getState().setClientId(data.body.id);
  } catch (error) {
      console.log('Error:', error);
  }
};



// Servuces Get
export const ServicesClient = async (masterId?: string, categoryId?: string) => {
  try {
    const config = await getConfig();
    const url = `${serviceClient}/${masterId}/${categoryId}`;
    const { data } = await axios.get(url, config ? config : {});
    if (data.success) {
      ClientStory.getState().setServices(data.body);
    }
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
    const response = await axios.post(`${postComment}`, commentData, config ? config : {});
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


// Galery master 
export const getMasterGallery = async (id: string) => {
  try {
    const config = await getConfig();
    const { data } = await axios.get(`${masterGalery}${id}`, config ? config : {});
    if (data.success) {
      ClientStory.getState().setMasterGallery(data.body);
    }
  } catch (error) {
    console.log(error);
  }
};

// Bitta masterga tegishli bo'lgan Отзывы lar
export const getMasterOtzif = async (id:string) => {
  try{
    const config = await getConfig();
    const response = await axios.get(`${feedbackMasterForClient}/${id}`, config ? config : {});
    console.log(response.data.body);
    if (response.data.success) {
      useReviewsStore.getState().setReviews(response.data.body);
    }
    
  }catch(error){
    console.log(error);
    
  }
}

export const getMAstersServeses = async (id: string) => {
  try {
    const config = await getConfig();
    const { data } = await axios.get(`${serviceMaster}${id}`, config ? config : {});
    if (data.success) {
      
      ClientStory.getState().setmasterServis(data.body);
    }
  } catch (error) {
    console.log(error);
  }
};



