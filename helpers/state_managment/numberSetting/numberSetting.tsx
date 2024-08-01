import { create } from "zustand";

interface NumberSetting {
    number: number[];
    setNumber: (val: number[]) => void
    isWaitModal: boolean
    setIsWaitModal: (val: boolean) => void
  }

  const numberSettingStore = create<NumberSetting>((set) => ({
    number: [1],
    setNumber: (val: number[]) => set({number: val}),
    isWaitModal: false,
    setIsWaitModal: (val: boolean) => set({isWaitModal: val})
    
  }));
  
  export default numberSettingStore;