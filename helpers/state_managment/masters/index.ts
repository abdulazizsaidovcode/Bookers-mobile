import { create } from "zustand";

// Define the type for a master
interface Master {
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

// Define the interface for the store
interface useTopMasters {
  masters: Master[];
  isLoading: boolean;
  setTopMasters: (data: Master[]) => void;
  setIsloading: (val: boolean) => void;
}

// Create the Zustand store
const useTopMastersStore = create<useTopMasters>((set) => ({
  masters: [],
  isLoading: false,
  setTopMasters: (data: Master[]) => set({ masters: data }),
  setIsloading: (val: boolean) => set({ isLoading: val }),
}));

export default useTopMastersStore;
