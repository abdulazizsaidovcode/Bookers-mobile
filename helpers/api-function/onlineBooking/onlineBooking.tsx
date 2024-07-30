import {
    master_service_list,
  onlineBookingAllowClient_url,
  onlineBookingHallWaitin_url,
  onlineBookingRecordDay_url,
  onlineBookingUgly_url,
  onlineBookingUserviceTime_url,
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
        setIsLoading && setIsLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
      } else {
        setIsLoading && setIsLoading(false);
      }
    }
  } catch (error: any) {
    setIsLoading && setIsLoading(false);
    Toast.show(error.response.data.message, Toast.SHORT);
  }
};

export const getOnlineBookingAllowClient = async (
  setData: (val: boolean) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);

  try {
    const config = await getConfig();
    const res = await axios.get(
      `${onlineBookingAllowClient_url}`,
      config ? config : {}
    );
    if (res.data.success) {
      setIsLoading && setIsLoading(false);
      setData(res.data.body);
    } else {
      setIsLoading && setIsLoading(false);
      setData(false);
    }
  } catch (error) {
    setIsLoading && setIsLoading(false);
    setData(false);
  }
};

export const onlineBookingSettingsUrgently = async (
  isEnabled: boolean,
  setIsEnabled: (data: boolean) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);
  try {
    if (isEnabled === true || isEnabled === false) {
      const config = await getConfig();
      const res = await axios.post(
        `${onlineBookingUgly_url}?isUrgent=${isEnabled}`,
        {},
        config ? config : {}
      );

      if (res.data.success) {
        setIsLoading && setIsLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
        setIsEnabled(isEnabled);
      } else {
        setIsLoading && setIsLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
      }
    }
  } catch (error) {
    setIsLoading && setIsLoading(false);
  }
};

export const GetOnlineBookingSettingsUrgently = async (
  setStatus: any,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);
  try {
    const config = await getConfig();
    const res = await axios.get(onlineBookingUgly_url, config ? config : {});
    if (res.data.success) {
      setIsLoading && setIsLoading(false);
      setStatus(res.data.body);
    } else {
      setIsLoading && setIsLoading(false);
      setStatus(false);
    }
  } catch (error) {
    setIsLoading && setIsLoading(false);
    setStatus(false);
  }
};

export const postOnlineBookingUserviceTimeAll = async (
  val: ServiceTime,
  navigation?: any,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);
  try {
    if (val) {
      const config = await getConfig();
      const res: any = await axios.post(
        `${onlineBookingUserviceTimeAll_url}`,
        val,
        config ? config : {}
      );
      if (res.data.success) {
        setIsLoading && setIsLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
        navigation ? navigation.goBack() : () => null;
      } else {
        setIsLoading && setIsLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
      }
    }
  } catch (error: any) {
    setIsLoading && setIsLoading(false);
    Toast.show(error.response.data.message, Toast.SHORT);
  }
};

export const getOnlineBookingUserviceTimeAll = async (
  setHour: (val: number) => void,
  setMinute: (val: number) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);
  try {
    const config = await getConfig();
    const res: any = await axios.get(
      `${onlineBookingUserviceTimeAll_url}`,
      config ? config : {}
    );

    if (res.data.success) {
      setIsLoading && setIsLoading(false);
      setHour(res.data.body.hour);
      setMinute(res.data.body.minute);
      console.log(res.data.body);
    } else {
      setIsLoading && setIsLoading(false);
      Toast.show(res.data.message, Toast.SHORT);
      setHour(0);
      setMinute(0);
    }
  } catch (error: any) {
    setIsLoading && setIsLoading(false);
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
  setIsLoading && setIsLoading(true);
  try {
    if (val) {
      const config = await getConfig();
      const res: any = await axios.post(
        `${onlineBookingUserviceTimeservice_url}`,
        val,
        config ? config : {}
      );
      if (res.data.success) {
        setIsLoading && setIsLoading(false);
        Toast.show(res.message, Toast.SHORT);
        navigation ? navigation.goBack() : () => null;
      } else {
        setIsLoading && setIsLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
      }
    }
  } catch (error:any) {
    setIsLoading && setIsLoading(false);
    Toast.show(error.response.data.message, Toast.SHORT);
  }
};

export const getOnlineBookingserviceTime = async (
    setData: (data: any) => void,
    setIsLoading?: (val: boolean) => void
  ) => {
    setIsLoading && setIsLoading(true);
    try {
        const config = await getConfig();
        const res: any = await axios.get(
          `${master_service_list}`,
          config ? config : {}
        );
        if (res.data.success) {
          setIsLoading && setIsLoading(false);
          setData(res.data.body)
        } else {
          setIsLoading && setIsLoading(false);
          setData([])
        }
    } catch (error:any) {
      setIsLoading && setIsLoading(false);
      setData([])
    }
  };

export const onlineConfirmationServices = async (
  isEnabled: boolean,
  isEnabled2: boolean,
  isEnabled3: boolean,
  navigation: any,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);
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
      setIsLoading && setIsLoading(false);
      Toast.show(res.data.message, Toast.SHORT);
      navigation.goBack();
    } else {
      setIsLoading && setIsLoading(false);
      Toast.show(res.data.message, Toast.SHORT);
    }
  } catch (error: any) {
    setIsLoading && setIsLoading(false);
    Toast.show(error.response.data.message, Toast.SHORT);
  }
};

export const getOnlineConfirmationServices = async (
  setData: (val: IsActive | null) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);
  try {
    const config = await getConfig();
    const res = await axios.get(
      `${onlineConfirmationServices_url}`,
      config ? config : {}
    );

    if (res.data.success) {
      setIsLoading && setIsLoading(false);
      setData(res.data.body);
    } else {
      setIsLoading && setIsLoading(false);
      setData(null);
    }
  } catch (error) {
    setIsLoading && setIsLoading(false);
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
  setIsLoading && setIsLoading(true);
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
      setIsLoading && setIsLoading(false);
      Toast.show(res.data.message, Toast.LONG);
      navigation.goBack();
    } else {
      setIsLoading && setIsLoading(false);
      Toast.show(res.data.message, Toast.LONG);
    }
  } catch (error) {
    setIsLoading && setIsLoading(false);
    Toast.show("Something is error?", Toast.LONG);
  }
};

//hall waiting get API function
export const getOnlineBookingHallWaiting = async (
  setData: (val: any | null) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);
  try {
    const config = await getConfig();
    const res = await axios.get(
      `${onlineBookingHallWaitin_url}`,
      config ? config : {}
    );
    if (res.data.success) {
      setIsLoading && setIsLoading(false);
      setData(res.data.body);
    } else {
      setIsLoading && setIsLoading(false);
    }
  } catch (error) {
    setIsLoading && setIsLoading(false);
    console.log(error);
  }
};

export const getOnlineBookingRecordDay = async (
  setData: (val: any) => void,
  status?: "DAY" | "PERIOD",
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading && setIsLoading(true);
  try {
    const config = await getConfig();
    const res = await axios.get(
      `${onlineBookingRecordDay_url}?status=${status ? status : "DAY"}`,
      config ? config : {}
    );
    if (res.data.success) {
      setIsLoading && setIsLoading(true);
    } else {
      setIsLoading && setIsLoading(false);
    }
    setData(res.data.body);
  } catch (error) {
    setIsLoading && setIsLoading(true);
  }
};
