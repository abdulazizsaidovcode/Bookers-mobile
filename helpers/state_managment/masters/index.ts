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
  attachmentId: string | null;
}

interface useTopMasters {
  masters: Master[];
  mastersSearched: Master[];
  isLoading: boolean;
  err: any;
  category: CategoryType[];
  setCategory: (category: CategoryType[]) => void;
  setTopMasters: (data: Master[]) => void;
  setSearchTopMasters: (data: Master[]) => void;
  setIsloading: (val: boolean) => void;
  setErr: (res: any) => void;
}

const useTopMastersStore = create<useTopMasters>((set) => ({
  masters: [],
  mastersSearched: [],
  isLoading: false,
  category: [],
  err: null,
  setCategory: (category: CategoryType[]) => set({ category }),
  setTopMasters: (data: Master[]) => set({ masters: data }),
  setSearchTopMasters: (data: Master[]) => set({ mastersSearched: data }),
  setIsloading: (val: boolean) => set({ isLoading: val }),
  setErr: (err: any) => set({ err }),
}));

export default useTopMastersStore;
