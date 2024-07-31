import { MapStoreTypes, MasterLocation } from "@/type/map/map";
import { create } from "zustand";
import { ClientOrderHistory } from "../dashboardClient/dashboardClient";

export const useMapStore = create<MapStoreTypes>((set) => ({
    mapData: {
        id: '',
        firstName: '',
        salonName: '',
        gender: '',
        orderCount: 0,
        clientCount: 0,
        lat: 0,
        lng: 0,
        district: '',
        street: '',
        house: '',
        attachmentId: '',
        nextEntryDate: null,
        attachmentCount: 0,
        servicePrice: 0,
        favoriteCount: 0,
        categoryNames: [],
        nearestOrder: null
    },
    setOrderData: (data: ClientOrderHistory) => set({ orderData: data }),
    orderData: {
        address: '',
        clientCount: 0,
        feedbackCount: 0,
        firstName: '',
        instagram: '',
        lastName: '',
        lat: 0,
        lng: 0,
        orderCount: 0,
        orderDate: '',
        orderId: '',
        orderPrice: 0,
        phoneNumber: '',
        salonName: '',
        serviceIds: [],
        serviceName: '',
        specializations: [],
        telegram: '',
        userAttachmentId: ''
    },
    setMapData: (data: MasterLocation) => set({ mapData: data }),
    categoryId: null,
    setCategoryId: (id) =>
        set((state) => ({
            categoryId: typeof id === "function" ? id(state.categoryId) : id,
        })),
}));
