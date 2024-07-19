import { create } from 'zustand';

interface CommunitySlider {
    value: number
    setValue: (value: number) => void
    rating: number
    setRating: (value: number) => void
}

export const useCommunitySlider = () => create<CommunitySlider>((set) => ({
    value: 0,
    setValue: (value) => set({ value }),
    rating: 0,
    setRating: (value) => set({ rating: value }),
}))