import { GalleryData } from '@/type/gallery/gallery';
import { create } from 'zustand';

interface GalleryState {
  data: GalleryData[],
  fullData: GalleryData,
  setData: (data: GalleryData[]) => void;
  setFullData: (data: GalleryData) => void;
}

const useGalleryStore = create<GalleryState>((set) => ({
  data: [],
  fullData: {
    id: 0,
    albumName: '',
    date: '',
    photos: null,
    mainPhotos: null,
    resGalleryAttachments: [
      {
        attachmentId: '',
        main: false,
        newStatus: false,
      },
    ],
  }, // Initialize with an appropriate structure
  setData: (val: GalleryData[]) => set({ data: val }),
  setFullData: (val: GalleryData) => set({ fullData: val }),
}));

export default useGalleryStore;
