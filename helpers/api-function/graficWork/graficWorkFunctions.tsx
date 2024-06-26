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
import { Alert } from "react-native";

// Get api

export const getWorkDay = (setData: (val: weekList[]) => void) => {
  axios
    .get(`${workday_get}`, config)
    .then((res) => {
      if (res.data.success) {
        setData(res.data.body);
      }
      else {
        setData([])
      }
    })
    .catch(() => setData([]))
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
        }
        else {
            setData([])
        }
      })
      .catch(() => setData([]));
  } else {
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
          Alert.alert("succsess");
        }
        else {
          Alert.alert(res.data.message);
        }
      })
      .catch((err) => {
        Alert.alert("errr");
      });
  } else {
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
        Alert.alert("success");
      })
      .catch();
  } else {
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
          }
          else {
            Alert.alert(res.data.message);
          }
        })
        .catch((err) => {
          Alert.alert(err.config.data);
        });
    } else {
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
          router.push("(free)/(work-grafic-edit)/workMain")
        })
        .catch((err) =>  {}
        );
    } else {
    }
  };