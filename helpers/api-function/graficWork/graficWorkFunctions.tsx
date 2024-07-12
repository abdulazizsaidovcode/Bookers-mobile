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

export const postWorkDay = async (workDayWeeks: any, date: string) => {
  try {
    if (!workDayWeeks || !date) {
      return;
    }

    const data = {
      workDayWeeks: workDayWeeks,
      date: date,
    };

    const config = await getConfig();
    const response = await axios.post(`${workday_save}`, data, config);

    if (response.data.success) {
      Toast.show('Work day saved successfully', Toast.LONG);
    } else {
      Toast.show(response.data.message, Toast.LONG);
    }
  } catch (error) {
    console.error('Error saving work day:', error);
    Toast.show('Error saving work day', Toast.LONG);
  }
};

export const postWorkTime = async (fromTimeHour: number, fromTimeMin: number, endTimeHour: number, endTimeMin: number) => {
  try {
    if (!fromTimeHour || !fromTimeMin || !endTimeHour || !endTimeMin) {
      return;
    }

    const data = {
      fromTimeHour: fromTimeHour,
      fromTimeMin: fromTimeMin,
      endTimeHour: endTimeHour,
      endTimeMin: endTimeMin,
    };

    const config = await getConfig();
    await axios.post(`${worktime_save}`, data, config);

    Toast.show('Work time saved successfully', Toast.LONG);
  } catch (error) {
    console.error('Error saving work time:', error);
    Toast.show('Error saving work time', Toast.LONG);
  }
};

export const putWorkDay = async (workDayWeeks: any, date: string, router: any) => {
  try {
    if (!workDayWeeks || !date) {
      return;
    }

    const data = {
      workDayWeeks: workDayWeeks,
      date: date,
    };

    const config = await getConfig();
    const response = await axios.put(`${workday_put}`, data, config);

    if (response.data.success) {
      Toast.show('Work day updated successfully', Toast.LONG);
      router.push("(free)/(work-grafic-edit)/workMain");
    } else {
      Toast.show(response.data.message, Toast.LONG);
    }
  } catch (error) {
    console.error('Error updating work day:', error);
    Toast.show('Error updating work day', Toast.LONG);
  }
};

export const putWorkTime = async (fromTimeHour: number, fromTimeMin: number, endTimeHour: number, endTimeMin: number, router: any) => {
  try {
    if (!fromTimeHour || !fromTimeMin || !endTimeHour || !endTimeMin) {
      return;
    }

    const data = {
      fromTimeHour: fromTimeHour,
      fromTimeMin: fromTimeMin,
      endTimeHour: endTimeHour,
      endTimeMin: endTimeMin,
    };

    const config = await getConfig();
    await axios.put(`${worktime_put}`, data, config);

    Toast.show('Work time updated successfully', Toast.LONG);
    router.push("(free)/(work-grafic-edit)/workMain");
  } catch (error) {
    console.error('Error updating work time:', error);
    Toast.show('Error updating work time', Toast.LONG);
  }
};