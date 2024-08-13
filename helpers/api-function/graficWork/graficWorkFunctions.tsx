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
    

// Get api

export const getWorkDay = async (
  setData: (val: weekList[]) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    const config = await getConfig();
    const response = await axios.get(`${workday_get}`, config ? config : {});

    if (response.data.success) {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(response.data.body);
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching work days:", error);
    setIsLoading ? setIsLoading(false) : () => {};
    setData([]);
  }
};

export const getWorkTime = async (
  setData: (val: any) => void,
  masterID: string,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
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
      setIsLoading ? setIsLoading(false) : () => {};
      setData(response.data.body);
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching work times:", error);
    setIsLoading ? setIsLoading(false) : () => {};
    setData([]);
  }
};

export const postWorkDay = async (
  workDayWeeks: any,
  date: string,
  router: () => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
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
      setIsLoading ? setIsLoading(false) : () => {};
       alert("Work day saved successfully",   );
      router();
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
       alert(response.data.message,   );
    }
  } catch (error: any) {
    setIsLoading ? setIsLoading(false) : () => {};
     alert(error.response.data.message,   );
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
  setIsLoading ? setIsLoading(true) : () => {};
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
      setIsLoading ? setIsLoading(false) : () => {};
       alert("Work time saved successfully",   );
      router();
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
       alert(response.data.message,   );
    }
  } catch (error) {
    setIsLoading ? setIsLoading(false) : () => {};
     alert("Error saving work time",   );
  }
};

export const putWorkDay = async (
  workDayWeeks: any,
  date: string,
  router: () => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    if (!workDayWeeks || !date) {
       alert("hdhdhdhd",   );
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
      setIsLoading ? setIsLoading(false) : () => {};
       alert("Work day updated successfully",   );
      router();
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
       alert(response.data.message,   );
    }
  } catch (error) {
    console.error("Error updating work day:", error);
    setIsLoading ? setIsLoading(false) : () => {};
     alert("Error updating work day",   );
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
  setIsLoading ? setIsLoading(true) : () => {};
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
      setIsLoading ? setIsLoading(false) : () => {};
       alert("Work time updated successfully",   );
      router();
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
       alert(response.data.message,   );
    }
  } catch (error) {
    setIsLoading ? setIsLoading(false) : () => {};
    console.error("Error updating work time:", error);
     alert("Error updating work time",   );
  }
};
