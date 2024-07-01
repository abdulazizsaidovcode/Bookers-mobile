import { create } from "zustand";

interface NumberSetting {
    number: number[];
    setNumber: (val: number[]) => void
  }

  const numberSettingStore = create<NumberSetting>((set) => ({
    number: [1],
    setNumber: (val: number[]) => set({number: val}),
   
  }));
  
  export default numberSettingStore;