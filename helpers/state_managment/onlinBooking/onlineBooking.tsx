import { create } from "zustand";

export interface IState {
    allowClient: boolean
    setAllowClient: (val: boolean) => void
    isEnabled: boolean
    setIsEnabled: (val: boolean) => void
}
export interface Urgently {
    Urgently: boolean
    setUrgentlyt: (val: boolean) => void
}

export const OnlineBookingStory = create<IState>((set) => ({
    allowClient: false,
    setAllowClient: (val: boolean) => set({ allowClient: val }),
    isEnabled: false,
    setIsEnabled: (val: boolean) => set({ isEnabled: val }),
}));

export const OnlineBookingSettingsUrgentlyStory = create<Urgently>((set) => ({
    Urgently: false,
    setUrgentlyt: (val: boolean) => set({ Urgently: val }),
}));

;