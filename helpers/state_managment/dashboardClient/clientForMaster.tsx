import {create} from "zustand";

export interface ClientMasterByCategory {
    id: string
    firstName: string | null
    salonName: string | null
    orderCount: number | null
    clientCount: number | null
    lng: number | null;
    district: string | null
    street: string | null
    house: string | null
    attachmentId: string | null
    favoriteCount: number | null
    nearestOrder: string | null
    categoryNames: [] | null
    attachmentCount: number | null
    gender: string | null
    servicePrice: number | null
    nextEntryDate: number | null
}

interface DashboardMasterStore {
    dashboardMasterDataAll: ClientMasterByCategory[] | null;
    setDashboardMasterDataAll: (data: ClientMasterByCategory[] | null) => void;
    dashboardMasterData: ClientMasterByCategory[] | null;
    setDashboardMasterData: (data: ClientMasterByCategory[] | null) => void;
}

export const useDashboardMasterStore = create<DashboardMasterStore>((set) => ({
    dashboardMasterData: null,
    setDashboardMasterData: (data) => set({dashboardMasterData: data}),
    dashboardMasterDataAll: null,
    setDashboardMasterDataAll: (data) => set({dashboardMasterData: data}),
}));
