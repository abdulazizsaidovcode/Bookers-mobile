import { ProductType } from "@/type/history";
import { create } from "zustand";

interface Type {
  pastentries: ProductType[];
  isChecked: boolean;
  setChecked: (value: any) => void;
  setPastentries: (pastentries: ProductType[]) => void;
}

const Pastentries = create<Type>((set) => ({
  pastentries: [],
  isChecked: false,
  setChecked: (value) => set({ isChecked: value }),
  setPastentries: (pastentries: ProductType[]) => set({ pastentries }),
}));

export default Pastentries;
