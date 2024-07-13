import { getConfig } from "@/app/(tabs)/main";
import { help_url } from "@/helpers/api";
import { Help } from "@/helpers/state_managment/help/helpStore";
import axios from "axios";
import { router } from "expo-router";

export const getHelpOne = async (
  setData: (val: Help | null) => void,
  status: string,
  route: string
) => {
  try {
    const config = await getConfig();
    const response = await axios.get(`${help_url}${status}`, config);

    if (response.data.success) {
      setData(response.data.body);
      router.push(route);
    } else {
      setData(null);
    }
  } catch (error) {
    console.error("Error fetching age by ID:", error);
    setData(null);
  }
};

export const getHelpType = async (
  setData: (val: Help | null) => void,
  status: string,
  route: string
) => {
  try {
    const config = await getConfig();
    const response = await axios.get(`${help_url}${status}`, config);

    if (response.data.success) {
      setData(response.data.body);
      router.push(route);
    } else {
      setData(null);
    }
  } catch (error) {
    console.error("Error fetching age by ID:", error);
    setData(null);
  }
};
