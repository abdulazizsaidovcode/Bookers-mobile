import { create } from "zustand";

export interface ClientOrderHistory {
  orderId: string | null;
  serviceIds: string[] | null;
  serviceName: string | null;
  orderDate: string | null;
  firstName: string | null;
  lastName: string | null;
  specializations: string[] | null;
  salonName: string | null;
  userAttachmentId: string | null;
  feedbackCount: number | null;
  orderPrice: number | null;
  address: string | null;
  phoneNumber: string | null;
  lng: number | null;
  lat: number | null;
  orderCount: number | null;
  clientCount: number | null;
  instagram: string | null;
  telegram: string | null;
}

interface DashboardStore {
  dashboardData: ClientOrderHistory[] | null;
  setDashboardData: (data: ClientOrderHistory[] | null) => void;
  isLoading: boolean
  setIsLoading: (val: boolean) => void
  isBottomLoading: boolean
  setIsBottomLoading: (val: boolean) => void
}

export const useDashboardClientStore = create<DashboardStore>((set) => ({
  dashboardData: null,
  setDashboardData: (data) => set({ dashboardData: data }),
  isLoading: false,
  setIsLoading: (val: boolean) => set({isLoading: val}),
  isBottomLoading: false,
  setIsBottomLoading: (val: boolean) => set({isBottomLoading: val})
}));
