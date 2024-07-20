import { create } from "zustand";
interface AccardionStoreState {
  orderExpand:boolean
  expanded: boolean;
  expanded2: boolean;
  expanded3: boolean;
  expanded4: boolean;
  expanded5: boolean;
  genderIndex: boolean;
  isSelected: boolean;
  setOrderExpand: (val: boolean) => void;
  setExpanded: (val: boolean) => void;
  setGenderIndex: (val: boolean) => void;
  setSelection: (val: boolean) => void;
  setExpended2: (val: boolean) => void;
  setExpended3: (val: boolean) => void;
  setExpended4: (val: boolean) => void;
  setExpended5: (val: boolean) => void;
}

export const useAccardionStore = create<AccardionStoreState>((set) => ({
  orderExpand: false,
  expanded: true,
  genderIndex: false,
  isSelected: false,
  expanded2: true,
  expanded3: true,
  expanded4: true,
  expanded5: true,
  setOrderExpand: (val: boolean) => set({ orderExpand: val }),
  setExpended2: (val: boolean) => set({ expanded2: val }),
  setExpended3: (val: boolean) => set({ expanded3: val }),
  setExpended4: (val: boolean) => set({ expanded3: val }),
  setExpended5: (val: boolean) => set({ expanded3: val }),
  setExpanded: (val: boolean) => set({ expanded: val }),
  setGenderIndex: (val: boolean) => set({ genderIndex: val }),
  setSelection: (val: boolean) => set({ isSelected: val }),
}));
