import { create } from "zustand";

interface TariffType {
    tariff: string;
    setTariff: (newTariff: string) => void;
}
export const tariffStore = create<TariffType>((set) => ({
    tariff: '',
    setTariff: (newTariff) => set({ tariff: newTariff }),
}))