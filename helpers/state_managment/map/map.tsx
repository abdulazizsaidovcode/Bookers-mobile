import { ProductType } from "@/type/history";
import { MapStoreTypes } from "@/type/map/map";
import { create } from "zustand";

export const useMapStore = create<MapStoreTypes>((set) => ({
    mapData: {
        id: '',
        fullName: '',
        clientStatus: [],
        phone: '',
        serviceName: '',
        servicePrice: 0,
        serviceHour: 0,
        serviceMinute: 0,
        orderDate: '',
        prePayment: 0,
        paid: 0,
        toPay: 0,
        startTime: '',
        finishTime: '',
        notifyForHour: 0,
        notifyForMinute: 0,
        orderStatus: '',
        hallStatus: '',
        attachmentId: '',
    },
    setMapData: (data: ProductType) => set({ mapData: data }),
    categoryId: null,
    setCategoryId: (id) =>
        set((state) => ({
            categoryId: typeof id === "function" ? id(state.categoryId) : id,
        })),
}));
