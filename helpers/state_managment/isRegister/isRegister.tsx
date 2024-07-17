import { create } from "zustand";

interface RegType {
    isRegtered: boolean;
    setIsRegtered: (val: boolean) => void;
    userRole: string
    setUserRole: (val: string) => void
}

const isRegister = create<RegType>((set) => ({
    isRegtered: false,
    setIsRegtered: (val: boolean) => set({ isRegtered: val }), 
    userRole: "",
    setUserRole: (val: string) => set({ userRole: val }),
}));

export default isRegister;