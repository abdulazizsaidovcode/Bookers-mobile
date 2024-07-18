import create from "zustand";

interface ProfileState {
  nickName: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  job: string | null;
  phoneNumber: string | null;
  regionId: string | null;
  districtId: number;
  telegram: string | null;
  gender: boolean;
  attachmentId: string | null;
  setProfile: (profile: Partial<ProfileState>) => void;
  updateProfileField: (key: keyof ProfileState, value: any) => void;
  routeName: string | null
  setRoute: (data: string) => void
  setAttachmentId: (data: string | null) => void
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
  routeName: "",
  setRoute: (data: string) => set({routeName: data}),
  setAttachmentId: (data: string | null) => set({attachmentId: data})
}));

export default useProfileStore;
