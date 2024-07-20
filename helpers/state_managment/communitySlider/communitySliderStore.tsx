import { create } from 'zustand';

interface CommunitySlider {
    value: number
    setValue: (value: number) => void
    rating: number
    setRating: (value: number) => void
}
export const useCommunitySlider = create<CommunitySlider>((set) => ({
    value: 0, 
    setValue: (value: number) => set({ value: value }),
    rating: 0,
    setRating: (value: number) => set({ rating: value }),
}))