import {
  onlineBookingAllowClient_url,
  onlineBookingHallWaitin_url,
  onlineBookingRecordDay_url,
  onlineBookingUgly_url,
  onlineBookingUserviceTimeAll_url,
  onlineBookingUserviceTimeservice_url,
  onlineConfirmationServices_url,
} from "@/helpers/api";
import axios from "axios";
import { Alert } from "react-native";
import Toast from "react-native-simple-toast";
import { IsActive } from "@/helpers/state_managment/onlinBooking/onlineBooking";
import { getConfig } from "@/app/(tabs)/(master)/main";
import { ServiceTime } from "@/app/(standart)/(onlineBooking)/(booking)/breakBetweenSessionIn";

export const onlineBookingAllowClient = async (
  isEnabled: boolean,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);
  try {
    if (isEnabled === true || isEnabled === false) {
      const config = await getConfig();
      const res = await axios.put(
        `${onlineBookingAllowClient_url}?allowClient=${isEnabled}`,
        {},
        config ? config : {}
      );
      if (res.data.success) {
        Toast.show(res.data.message, Toast.SHORT);
        setIsLoading && setIsLoading(true);
      }
    }
  } catch (error: any) {
    Toast.show(error.response.data.message, Toast.SHORT);
  }
};

export const getOnlineBookingAllowClient = async (
  setData: (val: boolean) => void,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    const config = await getConfig();
    const res = await axios.get(
      `${onlineBookingAllowClient_url}`,
      config ? config : {}
    );
    if (res.data.success) {
      setData(res.data.body);
    } else {
      setData(false);
    }
  } catch (error) {
    setData(false);
  }
};

export const onlineBookingSettingsUrgently = async (
  isEnabled: boolean,
  setIsEnabled: (data: boolean) => void,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    if (isEnabled === true || isEnabled === false) {
      const config = await getConfig();
      const res = await axios.post(
        `${onlineBookingUgly_url}?isUrgent=${isEnabled}`,
        {},
        config ? config : {}
      );

      if (res.data.success) {
        Toast.show(res.data.message, Toast.SHORT);
        setIsEnabled(isEnabled);
      } else {
        Toast.show(res.data.message, Toast.SHORT);
      }
    }
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

export const GetOnlineBookingSettingsUrgently = async (
  setStatus: any,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    const config = await getConfig();
    const res = await axios.get(onlineBookingUgly_url, config ? config : {});
    setStatus(res.data.body);
  } catch (error) {
    console.log(error);
    setStatus(false);
  }
};

export const postOnlineBookingUserviceTimeAll = async (
  val: ServiceTime,
  navigation?: any,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    if (val) {
      const config = await getConfig();
      const res: any = await axios.post(
        `${onlineBookingUserviceTimeAll_url}`,
        val,
        config ? config : {}
      );
      if (res.data.success) {
        Toast.show(res.data.message, Toast.SHORT);
        navigation ? navigation.goBack() : () => null;
      } else {
        Toast.show(res.data.message, Toast.SHORT);
      }
    }
  } catch (error: any) {
    Toast.show(error.response.data.message, Toast.SHORT);
  }
};

export const getOnlineBookingUserviceTimeAll = async (
  setHour: (val: number) => void,
  setMinute: (val: number) => void,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    const config = await getConfig();
    const res: any = await axios.get(
      `${onlineBookingUserviceTimeAll_url}`,
      config ? config : {}
    );

    if (res.data.success) {
      setHour(res.data.body.hour);
      setMinute(res.data.body.minute);
      console.log(res.data.body);
    } else {
      Toast.show(res.data.message, Toast.SHORT);
      setHour(0);
      setMinute(0);
    }
  } catch (error: any) {
    Toast.show(error.response.data.message, Toast.SHORT);
    setHour(0);
    setMinute(0);
  }
};

export const postOnlineBookingserviceTime = async (
  val: ServiceTime[],
  navigation?: any,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    if (val) {
      const config = await getConfig();
      const res: any = await axios.post(
        `${onlineBookingUserviceTimeservice_url}`,
        val,
        config ? config : {}
      );
      if (res.data.success) {
        Toast.show(res.message, Toast.SHORT);
        navigation ? navigation.goBack() : () => null;
      } else {
        Toast.show(res.data.message, Toast.SHORT);
      }
    }
  } catch (error:any) {
    Toast.show(error.response.data.message, Toast.SHORT);
  }
};

export const onlineConfirmationServices = async (
  isEnabled: boolean,
  isEnabled2: boolean,
  isEnabled3: boolean,
  navigation: any,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    const data = {
      allClient: isEnabled,
      newClient: isEnabled2,
      notConfirm: isEnabled3,
    };
    console.log(data);

    const config = await getConfig();
    const res = await axios.post(
      `${onlineConfirmationServices_url}`,
      data,
      config ? config : {}
    );
    if (res.data.success) {
      Toast.show(res.data.message, Toast.SHORT);
      navigation.goBack();
    }
  } catch (error: any) {
    Toast.show(error.response.data.message, Toast.SHORT);
  }
};

export const getOnlineConfirmationServices = async (
  setData: (val: IsActive | null) => void,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    const config = await getConfig();
    const res = await axios.get(
      `${onlineConfirmationServices_url}`,
      config ? config : {}
    );

    if (res.data.success) {
      setData(res.data.body);
    } else {
      setData(null);
    }
  } catch (error) {
    console.log(error);
    setData(null);
  }
};

// hall waiting post API function

export const onlineBookingHallWaiting = async (
  isEnabled: boolean,
  isEnabled2: boolean,
  navigation: any,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    const data = {
      allClient: isEnabled,
      regularClient: isEnabled2,
    };
    const config = await getConfig();
    const res = await axios.post(
      `${onlineBookingHallWaitin_url}`,
      data,
      config ? config : {}
    );

    if (res.data.success) {
      Toast.show("res.data.message", Toast.LONG);
      navigation.goBack();
      console.log(res);
    }
  } catch (error) {
    console.log(error);
    Toast.show("Something is error?", Toast.LONG);
    console.log(isEnabled, isEnabled2);
  }
};

//hall waiting get API function
export const getOnlineBookingHallWaiting = async (
  setData: (val: any | null) => void,
  setIsLoading?: (val: boolean) => void
) => {
  try {
    const config = await getConfig();
    const res = await axios.get(
      `${onlineBookingHallWaitin_url}`,
      config ? config : {}
    );
    if (res.data.success) {
      setData(res.data.body);
      console.log(res.data.body);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOnlineBookingRecordDay = async (
  setData: (val: any) => void,
  status?: "DAY" | "PERIOD",
  setIsLoading?: (val: boolean) => void
) => {
  try {
    const config = await getConfig();
    const res = await axios.get(
      `${onlineBookingRecordDay_url}?status=${status ? status : "DAY"}`,
      config ? config : {}
    );
    if (res.data.success) {
      console.log(res.data.body);
    }
    setData(res.data.body);
  } catch (error) {
    console.log(error);
  }
};
