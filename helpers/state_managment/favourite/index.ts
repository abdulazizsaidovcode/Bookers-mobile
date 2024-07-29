import { create } from "zustand";

interface Type {
  data: any;
  setData: (data: any) => void;
}

const useFavoutite = create<Type>((set) => ({
  data: {},
  setData: (data: any) => set({ data }),
}));

export default useFavoutite;
