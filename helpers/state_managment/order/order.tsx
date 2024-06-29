import { create } from "zustand";

type ScheduleStatedate = {
    OrderData: {};
    setOrderData: (newSchedule: any) => void;
    status: string;
    setStatus: (newStatus: any) => void;
};

export const useOrderPosdData = create<ScheduleStatedate>((set) => ({
    OrderData: {},
    setOrderData: (newSchedule) => set({ OrderData: newSchedule }),
    status: "",
    setStatus: (newStatus) => set({ status: newStatus }),
}));