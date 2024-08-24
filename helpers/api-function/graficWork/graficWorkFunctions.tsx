import { getConfig } from "@/app/(tabs)/(master)/main";
import {
  workday_get,
  workday_put,
  workday_save,
  worktime_get,
  worktime_put,
  worktime_save,
} from "@/helpers/api";
import { weekList } from "@/type/graficWork/graficWork";
import axios from "axios";
import Toast from "react-native-simple-toast";

// Get api

export const getWorkDay = async (
  setData: (val: weekList[]) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => { };
  try {
    const config = await getConfig();
    const response = await axios.get(`${workday_get}`, config ? config : {});

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => { };
      setData(response.data.body);
    } else {
      setIsLoading ? setIsLoading(false) : () => { };
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching work days:", error);
    setIsLoading ? setIsLoading(false) : () => { };
    setData([]);
  }
};

export const getWorkTime = async (
  setData: (val: any) => void,
  masterID: string,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => { };
  try {
    if (!masterID) {
      setData([]);
      return;
    }

    const config = await getConfig();
    const response = await axios.get(
      `${worktime_get}${masterID}`,
      config ? config : {}
    );

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => { };
      setData(response.data.body);
    } else {
      setIsLoading ? setIsLoading(false) : () => { };
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching work times:", error);
    setIsLoading ? setIsLoading(false) : () => { };
    setData([]);
  }
};

export const postWorkDay = async (
  workDayWeeks: any,
  date: string,
  router: () => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => { };
  try {
    if (!workDayWeeks || !date) {
      return null;
    }

    const data = {
      workDayWeeks: workDayWeeks,
      date: date,
    };

    const config = await getConfig();
    const response = await axios.post(
      `${workday_save}`,
      data,
      config ? config : {}
    );

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => { };
      Toast.show("Work day saved successfully", Toast.LONG);
      router();
    } else {
      setIsLoading ? setIsLoading(false) : () => { };
      Toast.show(response.data.message, Toast.LONG);
    }
  } catch (error: any) {
    setIsLoading ? setIsLoading(false) : () => { };
    Toast.show(error.response.data.message, Toast.LONG);
  }
};

export const postWorkTime = async (
  fromTimeHour: number,
  fromTimeMin: number,
  endTimeHour: number,
  endTimeMin: number,
  router: () => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => { };
  try {
    const data = {
      fromTimeHour: fromTimeHour,
      fromTimeMin: fromTimeMin,
      endTimeHour: endTimeHour,
      endTimeMin: endTimeMin,
    };

    const config = await getConfig();
    const response = await axios.post(
      `${worktime_save}`,
      data,
      config ? config : {}
    );
    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => { };
      Toast.show("Work time saved successfully", Toast.LONG);
      router();
    } else {
      setIsLoading ? setIsLoading(false) : () => { };
      Toast.show(response.data.message, Toast.LONG);
    }
  } catch (error) {
    setIsLoading ? setIsLoading(false) : () => { };
    Toast.show("Error saving work time", Toast.LONG);
  }
};

export const putWorkDay = async (
  workDayWeeks: any,
  date: string,
  router: () => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => { };
  try {
    if (!workDayWeeks || !date) {
      Toast.show("hdhdhdhd", Toast.LONG);
    }

    const data = {
      workDayWeeks: workDayWeeks,
      date: date,
    };

    const config = await getConfig();
    const response = await axios.put(
      `${workday_put}`,
      data,
      config ? config : {}
    );

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => { };
      Toast.show("Work day updated successfully", Toast.LONG);
      router();
    } else {
      setIsLoading ? setIsLoading(false) : () => { };
      Toast.show(response.data.message, Toast.LONG);
    }
  } catch (error) {
    console.error("Error updating work day:", error);
    setIsLoading ? setIsLoading(false) : () => { };
    Toast.show("Error updating work day", Toast.LONG);
  }
};

export const putWorkTime = async (
  fromTimeHour: number,
  fromTimeMin: number,
  endTimeHour: number,
  endTimeMin: number,
  router: () => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => { };
  try {
    const data = {
      fromTimeHour: fromTimeHour,
      fromTimeMin: fromTimeMin,
      endTimeHour: endTimeHour,
      endTimeMin: endTimeMin,
    };

    const config = await getConfig();
    const response = await axios.put(
      `${worktime_put}`,
      data,
      config ? config : {}
    );

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => { };
      Toast.show("Work time updated successfully", Toast.LONG);
      router();
    } else {
      setIsLoading ? setIsLoading(false) : () => { };
      Toast.show(response.data.message, Toast.LONG);
    }
  } catch (error) {
    setIsLoading ? setIsLoading(false) : () => { };
    console.error("Error updating work time:", error);
    Toast.show("Error updating work time", Toast.LONG);
  }
};


export function formatTime(time: string) {
  const timePattern = /^(\d{1,2}):0$/;

  if (timePattern.test(time)) {
    const [hours] = time.split(":");
    return `${hours}:00`;
  } else return time;
}