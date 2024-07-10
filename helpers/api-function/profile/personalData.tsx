import { base_url } from "@/helpers/api";
import { config } from "@/helpers/token";
import axios from "axios";
import Toast from "react-native-simple-toast";

interface data {
  setName?: string;
  setSurname?: string;
  setPhone?: string;
  setNickname?: string | null;
  setGender?: string | null;
  setAge?: string | null;
  setRegion?: string | null;
  setCity?: string | null;
  setTelegram?: string | null;
  setInstagram?: string | null;
}

// PUT URL

export const putPersonalData = ({
  setAge,
  setGender,
  setInstagram,
  setName,
  setNickname,
  setPhone,
  setRegion,
  setSurname,
  setTelegram,
}: data) => {
  const Data = {
    firstName: setName,
    lastName: setSurname,
    nickname: setNickname ? setNickname : null,
    phoneNumber: setPhone,
    gender: setGender,
    telegram: setTelegram ? setTelegram : null,
    instagram: setInstagram ? setInstagram : null,
    ageId: setAge,
    districtId: setRegion ? setRegion : null,
  };

  console.log(Data);
  
//   if (setName && setAge && setGender && setPhone && setSurname) {
    axios
      .put(`${base_url}user`, Data, config)
      .then((res) => {
        if (res.data.success) {
          Toast.show("salom", Toast.SHORT);
        } else {
          Toast.show("error", Toast.SHORT);
        }
      })
      .catch((err) => {
        Toast.show("server error", Toast.SHORT);
        console.log(err);
      });
//   } else {
//     Toast.show("value is not found", Toast.SHORT);
//   }
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
        if (res.data.success)  setData({key: res.data.body.id, value: res.data.body.ageRange}) ;
         else setData(null);
      })
      .catch(() => {
        setData(null)
      });
  }
  else {
    setData(null)
  }
};

export const getRegion = (setData: (data: any) => void) => {
    axios.get(`${base_url}region`, config)
    .then((res) => {
        if (res.data.success) {
            setData(res.data.body)
        }
        else setData([])
    })
    .catch(() => setData([]))
}

export const getRegionId = (setData: (data: any) => void, id: number | string) => {
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

  export const getDistrict = (setData: (data: any) => void, regionId: number | string) => {
    axios.get(`${base_url}district?regionId=${regionId}`, config)
    .then((res) => {
        if (res.data.success) {
            return(res.data.body)
        }
        else setData([])
    })
    .catch(() => setData([]))
}

export const getDistrictId = (id: number | string) => {
    if (id) {
      axios
        .get(`${base_url}district/${id}`, config)
        .then((res) => {
          if (res.data.success) {
            return res.data.body
          } else return []
        })
        .catch(() => {
            return []
        } );
    }
  };
// POST URL
