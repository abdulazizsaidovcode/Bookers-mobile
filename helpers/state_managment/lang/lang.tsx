import { create } from "zustand";

interface langType {
    language: string;
    setLanguage: (lang: string) => void;
}
export const langstore = create<langType>((set) => ({
    language: 'en',
    setLanguage: (lang: string) => set({ language: lang }),
}
))