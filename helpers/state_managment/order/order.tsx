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


// master order confirmed saqlash

type masterOrderConfirmedType = {
    ConfirmedData: [];
    setConfirmedData: (newSchedule: any) => void;
};

export const masterOrderConfirmedStore = create<masterOrderConfirmedType>((set) => ({
    ConfirmedData: [],
    setConfirmedData: (conferm) => set({ ConfirmedData: conferm }),
}));

// master order hall saqlash
type masterOrderHallType = {
    hallData: [];
    setHallData: (newSchedule: any) => void;
};

export const masterOrderHallStore = create<masterOrderHallType>((set) => ({
    hallData: [],
    setHallData: (hall) => set({ hallData: hall }),
}));

// master order wait saqlash
type masterOrderWaitType = {
    waitData: [];
    setWaitData: (newSchedule: any) => void;
};

export const masterOrderHWaitStore = create<masterOrderWaitType>((set) => ({
    waitData: [],
    setWaitData: (wait) => set({ waitData: wait }),
}));


