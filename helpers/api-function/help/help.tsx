import { help_url } from "@/helpers/api";
import { Help } from "@/helpers/state_managment/help/helpStore";
import { config } from "@/helpers/token";
import axios from "axios";
import { router } from "expo-router";



export const getHelpOne = (setData: (val: Help | null) => void, status: string, route: string) => {
    axios
      .get(`${help_url}${status}`, config)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.body);
          router.push(route)
        }
        else {
          setData(null)
        }
      })
      .catch(() => setData(null))
  };

export const getHelpType = (setData: (val: Help | null) => void, status: string, route: string) => {
    axios
      .get(`${help_url}${status}`, config)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.body);
          router.push(route)
        }
        else {
          setData(null)
        }
      })
      .catch(() => setData(null))
  };