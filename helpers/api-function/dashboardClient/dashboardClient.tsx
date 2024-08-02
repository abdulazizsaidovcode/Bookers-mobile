import { getConfig } from "@/app/(tabs)/(master)/main";
import { ClientMasterByCategory, ClientOrderHistory } from "@/helpers/api";
import { useDashboardMasterStore } from "@/helpers/state_managment/dashboardClient/clientForMaster";
import { useDashboardClientStore } from "@/helpers/state_managment/dashboardClient/dashboardClient";
import ClientStory from "@/helpers/state_managment/uslugi/uslugiStore";
import axios from "axios";

export const getClientDashboard = async (setDashboardData: any, setIsLoading?: (val: boolean) => void) => {
  setIsLoading ? setIsLoading(true) : () => { }
  try {
    const config = await getConfig();
    const response = await axios.get(ClientOrderHistory, config || {});
    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => { }
      setDashboardData(response.data.body);
    }
    else {
      setIsLoading ? setIsLoading(false) : () => { }
      setDashboardData([]);
    }
  } catch (error) {
    setIsLoading ? setIsLoading(false) : () => { }
    setDashboardData([]);
  }
};

export const getDashboradMaster = async (setData: (data: any) => void, setIsLoading?: (val: boolean) => void) => {
  setIsLoading ? setIsLoading(true) : () => { }
  try {
    const config = await getConfig();
    const categoryId = ClientStory.getState().categoryId;
    const { data } = await axios.get(
      `${ClientMasterByCategory}${categoryId ? `?categoryId=${categoryId}` : ''}`,
      config ? config : {}
    );
    if (data.success) {
      setIsLoading ? setIsLoading(false) : () => { }
      setData(data.body);
    }
    else {
      setIsLoading ? setIsLoading(false) : () => { }
      setData(null)
    }
  } catch (error) {
    setIsLoading ? setIsLoading(false) : () => { }
    console.error('Error:', error);
    setData(null)
  }
};

export const
  getDashboradMasterAll = async (setData: (data: any) => void, setIsLoading?: (val: boolean) => void) => {
    setIsLoading ? setIsLoading(true) : () => { }
    try {
      const config = await getConfig();
      const { data } = await axios.get(
        `${ClientMasterByCategory}`, config ? config : {}
      );
      if (data.success) {
        setIsLoading ? setIsLoading(false) : () => { }
        setData(data.body);
      }
      else {
        setIsLoading ? setIsLoading(false) : () => { }
        setData([])
      }
    } catch (error) {
      setIsLoading ? setIsLoading(false) : () => { }
      console.error('Error:', error);
      setData([])
    }
  };



