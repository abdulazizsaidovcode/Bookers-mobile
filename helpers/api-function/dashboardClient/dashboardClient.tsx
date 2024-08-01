import { getConfig } from "@/app/(tabs)/(master)/main";
import { ClientMasterByCategory, ClientOrderHistory } from "@/helpers/api";
import { useDashboardMasterStore } from "@/helpers/state_managment/dashboardClient/clientForMaster";
import { useDashboardClientStore } from "@/helpers/state_managment/dashboardClient/dashboardClient";
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";
import axios from "axios";

export const getClientDashboard = async () => {
  try {
    const config = await getConfig();
    const response = await axios.get(ClientOrderHistory, config || {});
    const { setDashboardData } = useDashboardClientStore.getState();
    setDashboardData(response.data.body);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getDashboradMaster = async (setData:(data:any) =>void) => {
  try {
    const config = await getConfig();
    const categoryId = ClientStory.getState().categoryId;
    console.log('Request URL:', `${ClientMasterByCategory}${categoryId ? `?categoryId=${categoryId}` : ''}`);
    const { data } = await axios.get(
      `${ClientMasterByCategory}${categoryId ? `?categoryId=${categoryId}` : ''}`,
      config ? config : {}
    );
    console.log('Response Data:', data.body);
    if (data.success) {
      setData(data.body);
    }
    else{
      setData(null)
    }
  } catch (error) {
    console.error('Error:', error);
    setData(null)
  }
};

export const 
getDashboradMasterAll = async (setData:(data:any) =>void) => {
  try {
    const config = await getConfig();
    const { data } = await axios.get(
      `${ClientMasterByCategory}`,config ? config : {}
    );
    if (data.success) {
      setData(data.body);
    }
    else{
      setData([])
    }
  } catch (error) {
    console.error('Error:', error);
    setData([])
  }
};



