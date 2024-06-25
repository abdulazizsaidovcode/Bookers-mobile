import React from "react";
import { create } from "zustand";

interface Type {
  pastentries: [];
  isChecked: boolean;
  setChecked: (value: any) => void;
  setPastentries: (pastentries: any) => void;
}

const Pastentries = create<Type>((set) => ({
  pastentries: [],
  isChecked: false,
  setChecked: (value) => set({ isChecked: value }),
  setPastentries: (pastentries) => set({ pastentries }),
}));

export default Pastentries;
