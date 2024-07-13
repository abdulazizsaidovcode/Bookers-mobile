import { getConfig } from "@/app/(tabs)/main";
import { base_url } from "@/helpers/api";
import axios from "axios";
import Toast from "react-native-simple-toast";

interface data {
  setName?: string;
  setSurname?: string;
  setPhone?: string | null;
  setNickname?: string | null;
  setGender?: string | null;
  setAge?: string | null;
  setRegion?: string | null;
  setCity?: string | null;
  setTelegram?: string | null;
  setInstagram?: string | null;
  birthdate?: string | null
  navigate: ()=>void
}

// PUT URL

export const putPersonalData = async ({
  setName,
  setSurname,
  setNickname,
  setPhone,
  setGender,
  setTelegram,
  setInstagram,
  setAge,
  birthdate,
  setRegion,
  setCity,
  navigate
}: data) => {
  const Data = {
    firstName: setName,
    lastName: setSurname,
    nickname: setNickname,
    phoneNumber: setPhone,
    gender: setGender,
    telegram: setTelegram,
    instagram: setInstagram,
    ageId: setAge,
    birthDate: birthdate,
    districtId: setCity,
    starCount: null,
    clientCount: null,
    orderCount: null, 
    attachmentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  };

  if (setCity && setRegion) {
    try {
      const config = await getConfig(); // Ensure getConfig is awaited to handle async behavior
      const response = await axios.put(`${base_url}user`, Data, config);

      if (response.data.success) {
        Toast.show("Sizning profilingiz yangilandi", Toast.SHORT);
        navigate();
      } else {
        Toast.show("Sizning profilingiz yangilanmadi", Toast.SHORT);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Toast.show("Sizning profilingiz yangilanmadi", Toast.SHORT);
    }
  } else {
    Toast.show("Siz viloyatingiz va shahringizni kiritishingiz kerak", Toast.SHORT);
  }
};

// GET URL
export const getAge = async (setData: (data: any) => void) => {
  try {
    const config = await getConfig();
    const response = await axios.get(`${base_url}age`, config);

    if (response.data.success) {
      setData(response.data.boy.map((item: any) => {
        return { key: item.id, value: item.ageRange }
      }));
    } else {
      setData([]);
    }
  } catch (error) {
    console.error('Error fetching age:', error);
    setData([]);
  }
};



export const getAgeId = async (id: string | number, setData: (data: any | null) => void) => {
  if (!id) {
    setData([]);
    return;
  }

  try {
    const config = await getConfig();
    const response = await axios.get(`${base_url}age/${id}`, config);

    if (response.data.success) {
      setData({ key: response.data.body.id, value: response.data.body.ageRange });
    } else {
      setData([]);
    }
  } catch (error) {
    console.error('Error fetching age by ID:', error);
    setData([]);
  }
};

export const getRegion = async (setData: (data: any | null) => void) => {
  try {
    const config = await getConfig();
    const response = await axios.get(`${base_url}region`, config);

    if (response.data.success) {
      setData(response.data.body);
    } else {
      setData([]);
    }
  } catch (error) {
    console.error('Error fetching regions:', error);
    setData([]);
  }
};

export const getRegionId = async (id: string | number, setData: (data: any | null) => void) => {
  if (!id) {
    setData([]);
    return;
  }

  try {
    const config = await getConfig();
    const response = await axios.get(`${base_url}region/${id}`, config);

    if (response.data.success) {
      setData(response.data.body);
    } else {
      setData([]);
    }
  } catch (error) {
    console.error('Error fetching region by ID:', error);
    setData([]);
  }
};

export const getDistrict = async (regionId: string | number, setData: (data: any | null) => void) => {
  console.log("Request sent for districts");
  try {
    const config = await getConfig();
    const response = await axios.get(`${base_url}district?regionId=${regionId}`, config);

    if (response.data.success) {
      setData(response.data.body);
    } else {
      setData([]);
    }
  } catch (error) {
    console.error('Error fetching districts:', error);
    setData([]);
  }
};

export const getDistrictId = async (id: string | number, setData: (data: any | null) => void) => {
  if (!id) {
    setData(null);
    return;
  }

  try {
    const config = await getConfig();
    const response = await axios.get(`${base_url}district/${id}`, config);

    if (response.data.success) {
      setData(response.data.body);
    } else {
      setData(null);
    }
  } catch (error) {
    console.error('Error fetching district by ID:', error);
    setData(null);
  }
};

// Format phone number function
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.startsWith("+998")) {
    let numberPart = phoneNumber.slice(4);

    if (numberPart.length < 9) {
      numberPart = numberPart.padStart(9, '0');
    } else if (numberPart.length > 9) {
      numberPart = numberPart.slice(-9);
    }

    return numberPart;
  } else {
    return phoneNumber;
  }
};