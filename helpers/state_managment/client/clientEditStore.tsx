import { getClientNotififcations } from "@/type/client/editClient";
import create from "zustand";

export interface RouteData {
    id: number,
    value: string | null
}

interface ProfileState {
  nickName: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: string | number | null;
  job: string | null;
  phoneNumber: string | null;
  regionId: string| number | null;
  districtId: number | string| null;
  telegram: string | null;
  gender: boolean | string | null;
  gender1: string | null;
  ageId: number | null;
  attachmentId: string | null;
  instagram:  string | null;
  setProfile: (profile: Partial<ProfileState>) => void;
  updateProfileField: (key: keyof ProfileState | string, value: any) => void;
  routeName: RouteData
  setRoute: (data: RouteData) => void
  setAttachmentId: (data: string | null) => void
  showCalendar: boolean
  setShowCalendar: (data: boolean) => void
  regionIdData: any
  setRegionIdData: (data: any) => void
  ageIdData: any
  setAgeIdData: (data: any) => void
  distiricyIdData: any
  setDistirictIdData: (data: any) => void
  clientNotificationData:getClientNotififcations[]
  setClientNotificationData: (data: getClientNotififcations[]) => void
}

const useProfileStore = create<ProfileState>((set) => ({
  nickName: null,
  firstName: null,
  lastName: null,
  birthDate: null,
  job: null,
  phoneNumber: null,
  regionId: null,
  districtId: 0,
  telegram: null,
  gender: true,
  gender1 : "",
  attachmentId: null,
  instagram: null,
  ageId: 0,
  setProfile: (profile) => set((state) => ({ ...state, ...profile })),
  updateProfileField: (key, value) => set((state) => ({ ...state, [key]: value })),
  routeName: {
    id: 0,
    value: null
  },
  setRoute: (data: RouteData) => set({routeName: data}),
  setAttachmentId: (data: string | null) => set({attachmentId: data}),
  showCalendar: false,
  setShowCalendar: (data: boolean) => set({showCalendar: data}),
  regionIdData: [],
  setRegionIdData: (data: any) => set({regionIdData: data}),
  ageIdData: [],
  setAgeIdData: (data: any) => set({ageIdData: data}),
  distiricyIdData: [],
  setDistirictIdData: (data: any) => set({distiricyIdData: data}),
  clientNotificationData: [],
  setClientNotificationData: (data: getClientNotififcations[]) => set({clientNotificationData: data})
}));

export default useProfileStore;
