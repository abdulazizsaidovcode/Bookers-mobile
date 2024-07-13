import { create } from "zustand";

interface RegType {
    isCreater: boolean;
    setIsCreater: (val: boolean) => void;
}

const isCreate = create<RegType>((set) => ({
    isCreater: false,
    setIsCreater: (val: boolean) => set({ isCreater: val }),
}));

export default isCreate;