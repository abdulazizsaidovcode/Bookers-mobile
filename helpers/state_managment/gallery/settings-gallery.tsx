import { GalleryData } from '@/type/gallery/gallery';
import { create } from 'zustand';

interface GalleryState {
  data: GalleryData[],
  fullData: GalleryData,
  setData: (data: GalleryData[]) => void;
  setFullData: (data: GalleryData) => void;
  images: any[];
  setImages: (images: any[]) => void;
  mainImageIndex: number | null;
  setMainImageIndex: (index: number | null) => void;
  selectedImageIndices: number[];
  setSelectedImageIndices: (indices: number[]) => void;
  showCheckboxes: boolean;
  setShowCheckboxes: (show: boolean) => void;
  showMainSwitch: boolean;
  setShowMainSwitch: (show: boolean) => void;
  albumName: string;
  setAlbumName: (name: string) => void;
}

const useGalleryStore = create<GalleryState>((set) => ({
  data: [],
  images: [],
  setImages: (images) => set({ images }),
  mainImageIndex: null,
  setMainImageIndex: (index) => set({ mainImageIndex: index }),
  selectedImageIndices: [],
  setSelectedImageIndices: (indices) => set({ selectedImageIndices: indices }),
  showCheckboxes: false,
  setShowCheckboxes: (show) => set({ showCheckboxes: show }),
  showMainSwitch: false,
  setShowMainSwitch: (show) => set({ showMainSwitch: show }),
  albumName: '',
  setAlbumName: (name) => set({ albumName: name }),
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
