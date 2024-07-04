import { create } from "zustand";

export interface IState {
    allowClient: boolean
    setAllowClient: (val: boolean) => void
}

const OnlineBookingStory = create<IState>((set) => ({
    allowClient: false,
    setAllowClient: (val: boolean) => set({ allowClient: val }),
}));
export default OnlineBookingStory;