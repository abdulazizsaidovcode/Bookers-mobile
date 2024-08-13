    
import { getConfig } from "@/app/(tabs)/(master)/main";
import axios from "axios";
import {
  client_profile_delete_url,
  client_profile_edit_url,
  clientReadNotification_url,
  getNotification_url,
  getNotificationNotReady_url,
} from "@/helpers/api";
import { getClientNotififcations } from "@/type/client/editClient";

export const updateClientProfile = async (
  datas: any,
  navigate?: () => void,
  getMe?: () => void,
  clearData?: () => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    if (datas) {
      const config = await getConfig();
      const { data } = await axios.put(
        `${client_profile_edit_url}`,
        datas,
        config ? config : {}
      );
      if (data.success) {
        setIsLoading ? setIsLoading(false) : () => {};
         alert("Successfully update",   );
        navigate ? navigate() : null;
        getMe ? getMe() : null;
        clearData ? clearData() : null;
      } else {
        setIsLoading ? setIsLoading(false) : () => {};
         alert("An error occurred on the console",   );
      }
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
       alert("Something went wrong",   );
    }
  } catch (err) {
    setIsLoading ? setIsLoading(false) : () => {};
     alert("An error occurred on the server",   );
  }
};

export const updateMasterProfile = async (
  datas: any,
  navigate?: () => void,
  getMe?: () => void,
  clearData?: () => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    if (datas) {
      const config = await getConfig();
      const { data } = await axios.put(
        `${client_profile_delete_url}`,
        datas,
        config ? config : {}
      );
      if (data.success) {
        setIsLoading ? setIsLoading(false) : () => {};
         alert(data.message,   );
        navigate ? navigate() : null;
        getMe ? getMe() : null;
        clearData ? clearData() : null;
      } else {
        setIsLoading ? setIsLoading(false) : () => {};
         alert(data.message,   );
      }
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
       alert("Something went wrong",   );
    }
  } catch (err) {
    setIsLoading ? setIsLoading(false) : () => {};
     alert("An error occurred on the server",   );
    console.log(err);
  }
};

// Profile notification function
export const clientNotification = async (
  setData: (val: getClientNotififcations[]) => void,
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  const config = await getConfig();
  const ClientNotification = await axios.get(
    getNotification_url,
    config ? config : {}
  );
  try {
    if (ClientNotification.data.success) {
      setIsLoading ? setIsLoading(false) : () => {};
      setData(ClientNotification.data.body.reverse());
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
      setData([]);
    }
  } catch {
    setIsLoading ? setIsLoading(false) : () => {};
     alert("Notification client ishlamadi",   );
    setData([]);
  }
};
export const deleteClientProfile = async (
  setIsLoading?: (val: boolean) => void
) => {
  setIsLoading ? setIsLoading(true) : () => {};
  try {
    const config = await getConfig();
    const { data } = await axios.delete(
      client_profile_delete_url,
      config ? config : {}
    );
    if (data.success) {
      setIsLoading ? setIsLoading(false) : () => {};
       alert("Successfully deleted",   );
    } else {
      setIsLoading ? setIsLoading(false) : () => {};
       alert("An error occurred on the server",   );
      console.log(data);
    }
  } catch (err) {
    setIsLoading ? setIsLoading(false) : () => {};
     alert("An error occurred on the server",   );
    console.log(err);
  }
};

export const clientNotificationDelete = async (
  datas: any,
  getData: () => void, setIsLoading?: (val: boolean) => void

) => {
    setIsLoading ? setIsLoading(true) : () => {}
  const config = await getConfig();

  const clientNotificationDel = await axios.post(
    `${getNotification_url}/delete`,
    datas,
    config ? config : {}
  );
  try {
    if (clientNotificationDel.data.success) {
    setIsLoading ? setIsLoading(false) : () => {}
     alert("Successfully deleted",   );
      getData();
    } else {
    setIsLoading ? setIsLoading(false) : () => {}
       alert("An error occurred on the server",   );
    }
  } catch {
    setIsLoading ? setIsLoading(false) : () => {}
     alert("An error occurred on the server",   );
  }
};
//client notification not ready or ready
export const clientPostReadyORnotReady = async (
  datas: any,
  getData: () => void, setIsLoading?: (val: boolean) => void
) => {
    setIsLoading ? setIsLoading(true) : () => {}
    const config = await getConfig();

  const res = await axios.post(
    clientReadNotification_url,
    datas,
    config ? config : {}
  );

  try {
    setIsLoading ? setIsLoading(false) : () => {}
    if (res.data.success) {
      getData();
    } else {
    setIsLoading ? setIsLoading(false) : () => {}
       alert("An error occurred on the server",   );
    }
  } catch {
    setIsLoading ? setIsLoading(false) : () => {}
     alert("An error occurred on the server",   );
  }
};
// client notification not ready
export const getNotificationNor_ReadyClient = async (
  setNotification: (val: any) => void, setIsLoading?: (val: boolean) => void
) => {
    setIsLoading ? setIsLoading(true) : () => {}
  const config = await getConfig();
  const res = await axios.get(
    getNotificationNotReady_url,
    config ? config : {}
  );
  try {
    if (res.data.success) {
    setIsLoading ? setIsLoading(false) : () => {}
    setNotification(res.data.body);
    } else {
    setIsLoading ? setIsLoading(false) : () => {}
    setNotification([]);
    }
  } catch {
    setIsLoading ? setIsLoading(false) : () => {}
     alert("Not ready yulida catchga utkazildi",   );
  }
};
