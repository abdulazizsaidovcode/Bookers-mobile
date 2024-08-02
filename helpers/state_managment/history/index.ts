import { ProductType } from "@/type/history";
import { create } from "zustand";

interface Types {
  product: ProductType | {};
  setProduct: (product: ProductType) => void;
}

const History = create<Types>((set) => ({
  product: {},
  setProduct: (product: ProductType) => set({ product }),
}));
export default History;
