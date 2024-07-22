import { ProductType } from "@/type/history";
import { MapStoreTypes } from "@/type/map/map";
import { create } from "zustand";
import { Master } from "../masters";

export const useMapStore = create<MapStoreTypes>((set) => ({
    mapData: {
        id: '',
        fullName: '',
        phone: '',
        salonName: '',
        genderName: 'FEMALE',
        feedbackCount: 0,
        orderCount: 0,
        clientCount: 0,
        lat: 0,
        lng: 0,
        district: '',
        street: '',
        house: '',
        attachmentId: '',
        nextEntryDate: '',
        mainPhoto: '',
    },
    setMapData: (data: Master) => set({ mapData: data }),
    categoryId: null,
    setCategoryId: (id) =>
        set((state) => ({
            categoryId: typeof id === "function" ? id(state.categoryId) : id,
        })),
}));
