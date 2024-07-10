import { create } from "zustand";

export interface IState {
    allowClient: boolean
    setAllowClient: (val: boolean) => void
    isEnabled: boolean
    setIsEnabled: (val: boolean) => void
    isEnabled2: boolean
    setIsEnabled2: (val: boolean) => void
    isEnabled3: boolean
    setIsEnabled3: (val: boolean) => void
    data: IsActive | null
    setData: (val: IsActive | null) => void
}
export interface IState2 {
    isEnabled: boolean
    setIsEnabled: (val: boolean) => void
    isEnabled2: boolean
    setIsEnabled2: (val: boolean) => void
}
export interface Urgently {
    Urgently: boolean
    setUrgentlyt: (val: boolean) => void
}

export interface IsActive {
    allClient: boolean
    newClient: boolean
    notConfirm: boolean
}
export const OnlineBookingStory2 = create<IState2>((set) => ({
    isEnabled: false,
    setIsEnabled: (val: boolean) => set({ isEnabled: val }),
    isEnabled2: false,
    setIsEnabled2: (val: boolean) => set({ isEnabled2: val }),
}))
export const OnlineBookingStory = create<IState>((set) => ({
    allowClient: false,
    setAllowClient: (val: boolean) => set({ allowClient: val }),
    isEnabled: false,
    setIsEnabled: (val: boolean) => set({ isEnabled: val }),
    isEnabled2: false,
    setIsEnabled2: (val: boolean) => set({ isEnabled2: val }),
    isEnabled3: false,
    setIsEnabled3: (val: boolean) => set({ isEnabled3: val }),
    data: null,
    setData: (val: IsActive | null) => set({ data: val }),
}));

export const OnlineBookingSettingsUrgentlyStory = create<Urgently>((set) => ({
    Urgently: false,
    setUrgentlyt: (val: boolean) => set({ Urgently: val }),
}));