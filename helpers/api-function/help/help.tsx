import { getConfig } from "@/app/(tabs)/(master)/main";
import { help_url } from "@/helpers/api";
import { Help } from "@/helpers/state_managment/help/helpStore";
import axios from "axios";

export const getHelpOne = async (
  setData: (val: Help | null) => void,
  status: string,
  route: string,
  navigation: any,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {}
  try {
    const config = await getConfig();
    const response = await axios.get(`${help_url}${status}`, config ? config : {});
    if (response.data.success) {
  setIsLoading ? setIsLoading(false) : () => {}
  setData(response.data.body);
      navigation.navigate(route);
    } else {
  setIsLoading ? setIsLoading(false) : () => {}
  setData(null);
    }
  } catch (error) {
  setIsLoading ? setIsLoading(false) : () => {}
    console.error("Error fetching age by ID:", error);
    setData(null);
  }
};
export const getHelpType = async (
  setData: (val: Help | null) => void,
  status: string,
  route: string,
  navigation: any,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {}
  try {
  const config = await getConfig();
    const response = await axios.get(`${help_url}${status}`, config ? config : {});
    if (response.data.success) {
  setIsLoading ? setIsLoading(false) : () => {}
  setData(response.data.body);
      navigation.navigate(route);
    } else {
  setIsLoading ? setIsLoading(false) : () => {}
  setData(null);
    }
  } catch (error) {
  setIsLoading ? setIsLoading(false) : () => {}
    console.error("Error fetching age by ID:", error);
    setData(null);
  }
};
