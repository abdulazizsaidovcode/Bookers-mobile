import create from "zustand";

export interface RouteData {
    id: number,
    value: string | null
}

interface ProfileState {
  nickName: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  job: string | null;
  phoneNumber: string | null;
  regionId: string| number | null;
  districtId: number | string| null;
  telegram: string | null;
  gender: boolean;
  attachmentId: string | null;
  setProfile: (profile: Partial<ProfileState>) => void;
  updateProfileField: (key: keyof ProfileState | string, value: any) => void;
  routeName: RouteData
  setRoute: (data: RouteData) => void
  setAttachmentId: (data: string | null) => void
  showCalendar: boolean
  setShowCalendar: (data: boolean) => void
  regionIdData: any
  setRegionIdData: (data: any) => void
  distiricyIdData: any
  setDistirictIdData: (data: any) => void
}

const useProfileStore = create<ProfileState>((set) => ({
  nickName: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  job: "",
  phoneNumber: "",
  regionId: "",
  districtId: 0,
  telegram: "",
  gender: true,
  attachmentId: "",
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
  distiricyIdData: [],
  setDistirictIdData: (data: any) => set({distiricyIdData: data})
}));

export default useProfileStore;
