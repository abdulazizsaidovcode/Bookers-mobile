import React from "react";
import { create } from "zustand";

interface Types {
  product: [];
  setProduct: (product: any) => void;
}

const History = create<Types>((set) => ({
  product: [],
  setProduct: (product) => set({ product }),
}));
export default History;
