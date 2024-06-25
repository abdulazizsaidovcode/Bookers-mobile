import { weekList } from "@/type/graficWork/graficWork";
import { create } from "zustand";

interface graficWorkData {
    calendarDate: string,
    setCalendarDate: (val: string) => void;
    week: weekList[];
    setWeek: (data: weekList[]) => void
    startTime: string,
    setStartTime: (val: string) => void;
    endTime: string,
    setEndTime: (val: string) => void;
  }

  const graficWorkStore = create<graficWorkData>((set) => ({
    calendarDate: 'master',
    setCalendarDate: (val: string) => set({ calendarDate: val }),
    startTime: "",
    setStartTime: (val: string) => set({startTime: val}),
    endTime: "",
    setEndTime: (val: string) => set({endTime: val}),
    week: [],
    setWeek: (data: weekList[]) => set({week: data})
  }));
  
  export default graficWorkStore;