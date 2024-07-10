import { create } from "zustand";

interface RegType {
    isRegtered: boolean;
    setIsRegtered: (val: boolean) => void;
}

const isRegister = create<RegType>((set) => ({
    isRegtered: false,
    setIsRegtered: (val: boolean) => set({ isRegtered: val }),
}));

export default isRegister;