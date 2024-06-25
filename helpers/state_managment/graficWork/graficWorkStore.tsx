import { TimeList, weekList } from "@/type/graficWork/graficWork";
import { create } from "zustand";

interface graficWorkData {
    getme: any;
    setGetMee: (val: any) => void
    calendarDate: string,
    setCalendarDate: (val: string) => void;
    week: weekList[];
    setWeek: (data: weekList[]) => void
    weekData: weekList[];
    setWeekData: (data: weekList[]) => void
    timeData: any;
    setTimeData: (data: any) => void
    startTime: string,
    setStartTime: (val: string) => void;
    endTime: string,
    setEndTime: (val: string) => void;
  }

  const graficWorkStore = create<graficWorkData>((set) => ({
    getme: null,
    setGetMee: (val: any) => set({getme: val}),
    calendarDate: 'master',
    setCalendarDate: (val: string) => set({ calendarDate: val }),
    startTime: "",
    setStartTime: (val: string) => set({startTime: val}),
    endTime: "",
    setEndTime: (val: string) => set({endTime: val}),
    week: [],
    setWeek: (data: weekList[]) => set({week: data}),
    weekData: [],
    setWeekData: (data: weekList[]) => set({weekData: data}),
    timeData: [],
    setTimeData: (data: any) => set({timeData: data})
  }));
  
  export default graficWorkStore;