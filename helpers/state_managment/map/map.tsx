import { MapStoreTypes } from "@/type/map/map";
import { create } from "zustand";

export const useMapStore = create<MapStoreTypes>((set) => ({
    categoryId: null,
    setCategoryId: (id) => set((state) => ({
        categoryId: typeof id === 'function' ? id(state.categoryId) : id
    })),
}));