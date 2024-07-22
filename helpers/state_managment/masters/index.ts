import { create } from "zustand";

export interface Master {
  id: string;
  fullName: string;
  phone: string;
  salonName: string | null;
  genderName: "MALE" | "FEMALE" | null;
  feedbackCount: number;
  orderCount: number;
  clientCount: number;
  lat: number | null;
  lng: number | null;
  district: string | null;
  street: string | null;
  house: string | null;
  attachmentId: string | null;
  nextEntryDate: string;
  mainPhoto: string | null;
}

interface CategoryType {
  id: string;
  name: string;
  categoryFatherId: string | null;
  categoryFatherName: string | null;
  isNew: boolean;
}

interface useTopMasters {
  masters: Master[];
  isLoading: boolean;
  category: CategoryType[];
  setCategory: (category: CategoryType[]) => void;
  setTopMasters: (data: Master[]) => void;
  setIsloading: (val: boolean) => void;
}

const useTopMastersStore = create<useTopMasters>((set) => ({
  masters: [],
  isLoading: false,
  category: [],
  setCategory: (category: CategoryType[]) => set({ category }),
  setTopMasters: (data: Master[]) => set({ masters: data }),
  setIsloading: (val: boolean) => set({ isLoading: val }),
}));

export default useTopMastersStore;
