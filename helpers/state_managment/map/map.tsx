import { ProductType } from "@/type/history";
import { MapStoreTypes } from "@/type/map/map";
import { create } from "zustand";

export const useMapStore = create<MapStoreTypes>((set) => ({
  mapData: {},
  setMapData: (data: ProductType) => set({ mapData: data }),
  categoryId: null,
  setCategoryId: (id) =>
    set((state) => ({
      categoryId: typeof id === "function" ? id(state.categoryId) : id,
    })),
}));
