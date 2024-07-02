import {
  workday_get,
  workday_put,
  workday_save,
  worktime_get,
  worktime_put,
  worktime_save,
} from "@/helpers/api";
import { config } from "@/helpers/token";
import { TimeList, saveweekList, weekList } from "@/type/graficWork/graficWork";
import axios from "axios";
import { router } from "expo-router";
import Toast from 'react-native-simple-toast';

// Get api

export const getWorkDay = (setData: (val: weekList[]) => void) => {
  axios
    .get(`${workday_get}`, config)
    .then((res) => {
      if (res.data.success) {
        setData(res.data.body);
      } else {
        setData([]);
      }
    })
    .catch(() => {
      setData([]);
    });
};

export const getWorkTime = (
  setData: (val: any) => void,
  masterID: string
) => {
  if (masterID) {
    axios
      .get(`${worktime_get}${masterID}`, config)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.body);
        } else {
          setData([]);
        }
      })
      .catch(() => {
        setData([]);
      });
  }
};

// Post api

export const postWorkDay = (workDayWeeks: any, date: string) => {
  const data = {
    workDayWeeks: workDayWeeks,
    date: date,
  };

  if (workDayWeeks && date) {
    axios
      .post(`${workday_save}`, data, config)
      .then((res) => {
        if (res.data.success) {
          Toast.show('Work day saved successfully', Toast.LONG);
        } else {
          Toast.show(res.data.message, Toast.LONG);
        }
      })
      .catch(() => {
        Toast.show('Error saving work day', Toast.LONG);
      });
  }
};

export const postWorkTime = (
  fromTimeHour: number,
  fromTimeMin: number,
  endTimeHour: number,
  endTimeMin: number
) => {
  const data = {
    fromTimeHour: fromTimeHour,
    fromTimeMin: fromTimeMin,
    endTimeHour: endTimeHour,
    endTimeMin: endTimeMin,
  };
  if (fromTimeHour && fromTimeMin && endTimeHour && endTimeMin) {
    axios
      .post(`${worktime_save}`, data, config)
      .then(() => {
        Toast.show('Work time saved successfully', Toast.LONG);
      })
      .catch(() => {
        Toast.show('Error saving work time', Toast.LONG);
      });
  }
};

// Put api

export const putWorkDay = (workDayWeeks: any, date: string) => {
  const data = {
    workDayWeeks: workDayWeeks,
    date: date,
  };

  if (workDayWeeks && date) {
    axios
      .put(`${workday_put}`, data, config)
      .then((res) => {
        if (res.data.success) {
          router.push("(free)/(work-grafic-edit)/workMain");
          Toast.show('Work day updated successfully', Toast.LONG);
        } else {
          Toast.show(res.data.message, Toast.LONG);
        }
      })
      .catch(() => {
        Toast.show('Error updating work day', Toast.LONG);
      });
  }
};

export const putWorkTime = (
  fromTimeHour: number,
  fromTimeMin: number,
  endTimeHour: number,
  endTimeMin: number
) => {
  const data = {
    fromTimeHour: fromTimeHour,
    fromTimeMin: fromTimeMin,
    endTimeHour: endTimeHour,
    endTimeMin: endTimeMin,
  };

  if (data) {
    axios
      .put(`${worktime_put}`, data, config)
      .then(() => {
        router.push("(free)/(work-grafic-edit)/workMain");
        Toast.show('Work time updated successfully', Toast.LONG);
      })
      .catch(() => {
        Toast.show('Error updating work time', Toast.LONG);
      });
  }
};
