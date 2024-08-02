import { create } from "zustand";

interface Types {
    districtId: number | null;
    homeNumber: string | null;
    id: number | null;
    salonId: string | null;
    street: string | null;
    target: string | null;
}

interface State {
    data: Types | null;
    setData: (data: Types) => void;
}

export const createLocation = create<State>((set) => ({
    data: null,
    setData: (data: Types) => set({ data }),
}));