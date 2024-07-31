import { getConfig } from "@/app/(tabs)/(master)/main";
import { ClientMasterByCategory, ClientOrderHistory } from "@/helpers/api";
import { useDashboardClientStore } from "@/helpers/state_managment/dashboardClient/dashboardClient";
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

export const getDashboradMaster = async () => {
    try {
      const config = await getConfig();
      const response = await axios.get(ClientMasterByCategory, config || {});
      const { setDashboardData } = useDashboardClientStore.getState();
      setDashboardData(response.data.body);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  export const ClientAllCategory = async () =>{
    try {
      const config = await getConfig();
      const response = await axios.get(ClientMasterByCategory, config || {});
      const { setDashboardData } = useDashboardClientStore.getState();
      setDashboardData(response.data.body);
    } catch (error) {
      console.error("Error:", error);
    }
  }


