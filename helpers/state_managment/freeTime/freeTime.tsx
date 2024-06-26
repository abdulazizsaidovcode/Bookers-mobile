import { create } from "zustand";

type ScheduleStatedate = {
    FreeTime: [];
    setFreeTime: (newSchedule: any) => void;
};

export const useScheduleFreeTime = create<ScheduleStatedate>((set) => ({
    FreeTime: [],
    setFreeTime: (newSchedule) => set({ FreeTime: newSchedule }),
}));