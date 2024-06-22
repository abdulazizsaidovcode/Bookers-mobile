import { GalleryData } from '@/type/gallery/gallery';
import { create } from 'zustand';

interface GalleryState {
    data: GalleryData[],
    setData: (data: GalleryData[]) => void;
}

const useGalleryStore = create<GalleryState>((set) => ({
    data: [],
    setData: (val: GalleryData[]) => set({ data: val }),
}));

export default useGalleryStore;
