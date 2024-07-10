import { base_url } from "@/helpers/api";
import { config } from "@/helpers/token";
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

export const putPersonalData = ({
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
  axios
    .put(`${base_url}user`, Data, config)
    .then((res) => {
      if (res.data.success) {
        Toast.show("Sizning profilingiz yangilandi", Toast.SHORT);
        navigate()
      } else {
        Toast.show("Sizning profilingiz yangilanmadi", Toast.SHORT);
      }
    })
    .catch(() => {
        Toast.show("Sizning profilingiz yangilanmadi", Toast.SHORT);
      // Toast.show("Siz viloyatingiz va shahringizni kiritishingiz kerak", Toast.SHORT);
    });
    } else {
      Toast.show("Siz viloyatingiz va shahringizni kiritishingiz kerak", Toast.SHORT);
    }
};

// GET URL

export const getAge = (setData: (data: any) => void) => {
  axios
    .get(`${base_url}age`, config)
    .then((res) => {
      if (res.data.success) {
        setData(res.data.body);
      } else setData(null);
    })
    .catch(() => setData(null));
};

export const getAgeId = (id: any, setData: (data: any) => void) => {
  if (id) {
    axios
      .get(`${base_url}age/${id}`, config)
      .then((res) => {
        if (res.data.success)
          setData({ key: res.data.body.id, value: res.data.body.ageRange });
        else setData(null);
      })
      .catch(() => {
        setData(null);
      });
  } else {
    setData(null);
  }
};

export const getRegion = (setData: (data: any) => void) => {
  axios
    .get(`${base_url}region`, config)
    .then((res) => {
      if (res.data.success) {
        setData(res.data.body);
      } else setData([]);
    })
    .catch(() => setData([]));
};

export const getRegionId = (
  setData: (data: any) => void,
  id: number | string
) => {
  if (id) {
    axios
      .get(`${base_url}region/${id}`, config)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.body);
        } else setData([]);
      })
      .catch(() => setData([]));
  }
};

export const getDistrict = (
  setData: (data: any) => void,
  regionId: number | string
) => {
  console.log("so'rov ketdi");
  axios
    .get(`${base_url}district?regionId=${regionId}`, config)

    .then((res) => {
      if (res.data.success) {
        setData(res.data.body);
        // console.log(res.data.body);
      } else setData([]);
    })
    .catch((err) => {
      setData([]);
      console.log(err);
    });
};

export const getDistrictId = (
  setData: (data: any) => void,
  id: number | string
) => {
  if (id) {
    axios
      .get(`${base_url}district/${id}`, config)
      .then((res) => {
        if (res.data.success) {
          setData(res.data.body);
        } else setData([]);
      })
      .catch(() => setData([]));
  }
};
// CHECK PHONE URL

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