import { getConfig } from "@/app/(tabs)/main";
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
import Toast from 'react-native-simple-toast';

// Get api

export const getWorkDay = async (setData: (val: weekList[]) => void) => {
  try {
    const config = await getConfig();
    const response = await axios.get(`${workday_get}`, config);

    if (response.data.success) {
      setData(response.data.body);
    } else {
      setData([]);
    }
  } catch (error) {
    console.error('Error fetching work days:', error);
    setData([]);
  }
};

export const getWorkTime = async (setData: (val: any) => void, masterID: string) => {
  try {
    if (!masterID) {
      setData([]);
      return;
    }

    const config = await getConfig();
    const response = await axios.get(`${worktime_get}${masterID}`, config);

    if (response.data.success) {
      setData(response.data.body);
    } else {
      setData([]);
    }
  } catch (error) {
    console.error('Error fetching work times:', error);
    setData([]);
  }
};

export const postWorkDay = async (workDayWeeks: any, date: string, router: () => void) => {
  try {
    if (!workDayWeeks || !date) {
      return null

    }

    const data = {
      workDayWeeks: workDayWeeks,
      date: date,
    };

    const config = await getConfig();
    const response = await axios.post(`${workday_save}`, data, config);

    if (response.data.success) {
      Toast.show('Work day saved successfully', Toast.LONG);
      router();
    } else {
      Toast.show(response.data.message, Toast.LONG);
    }
  } catch (error: any) {
    Toast.show(error.response.data.message, Toast.LONG);
  }
};

export const postWorkTime = async (fromTimeHour: number, fromTimeMin: number, endTimeHour: number, endTimeMin: number, router: () => void) => {
  try {
    const data = {
      fromTimeHour: fromTimeHour,
      fromTimeMin: fromTimeMin,
      endTimeHour: endTimeHour,
      endTimeMin: endTimeMin,
    };

    const config = await getConfig();
    const response = await axios.post(`${worktime_save}`, data, config);
    if (response.data.success) {
      Toast.show('Work time saved successfully', Toast.LONG);
      router();
    } else {
      
      Toast.show(response.data.message, Toast.LONG);
    }
  } catch (error) {
    Toast.show('Error saving work time', Toast.LONG);
  }
};

export const putWorkDay = async (workDayWeeks: any, date: string, router: () => void) => {
  try {
    if (!workDayWeeks || !date) {
      Toast.show('hdhdhdhd', Toast.LONG);
      
    }

    const data = {
      workDayWeeks: workDayWeeks,
      date: date,
    };

    const config = await getConfig();
    const response = await axios.put(`${workday_put}`, data, config);

    if (response.data.success) {
      Toast.show('Work day updated successfully', Toast.LONG);
      router();
    } else {
      Toast.show(response.data.message, Toast.LONG);
    }
  } catch (error) {
    console.error('Error updating work day:', error);
    Toast.show('Error updating work day', Toast.LONG);
  }
};

export const putWorkTime = async (fromTimeHour: number, fromTimeMin: number, endTimeHour: number, endTimeMin: number, router: () => void) => {
  try {

    const data = {
      fromTimeHour: fromTimeHour,
      fromTimeMin: fromTimeMin,
      endTimeHour: endTimeHour,
      endTimeMin: endTimeMin,
    };
    

    const config = await getConfig();
    await axios.put(`${worktime_put}`, data, config);

    Toast.show('Work time updated successfully', Toast.LONG);
    router()
  } catch (error) {
    console.error('Error updating work time:', error);
    Toast.show('Error updating work time', Toast.LONG);
  }
};