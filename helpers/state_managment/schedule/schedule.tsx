import { create } from "zustand";

type ScheduleState = {
    schedule: any[];
    setSchedule: (newSchedule: any[]) => void;
};
type ScheduleStateBooked = {
    scheduleBooked: any[];
    setScheduleBooked: (newSchedule: any[]) => void;
};
type ScheduleStatedate = {
    date: string;
    setScheduleDate: (newSchedule: string) => void;
};

export const useScheduleBookedStore = create<ScheduleState>((set) => ({
    schedule: [],
    setSchedule: (newSchedule) => set({ schedule: newSchedule }),
}));


export const useScheduleAvialableStore = create<ScheduleStateBooked>((set) => ({
    scheduleBooked: [],
    setScheduleBooked: (newSchedule) => set({ scheduleBooked: newSchedule }),
}));

export const useScheduleDateStore = create<ScheduleStatedate>((set) => ({
    date: '',
    setScheduleDate: (newSchedule) => set({ date: newSchedule }),
}));
