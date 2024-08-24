import { BooleanState, GalleryData } from '@/type/gallery/gallery';
import { create } from 'zustand';

interface GalleryState {
  data: GalleryData[],
  fullData: GalleryData | null,
  setData: (data: GalleryData[]) => void;
  setFullData: (data: GalleryData | null) => void;
  booleanState: BooleanState;
  isLoading: boolean,
  setIsLoading: (val: boolean) => void,
  setBooleanState: (val: BooleanState) => void;
}

const useGalleryStore = create<GalleryState>((set) => ({
  data: [],
  images: [],
  fullData: {
    id: 0,
    albumName: '',
    date: '',
    photos: null,
    mainPhotos: null,
    resGalleryAttachments: [
      {
        attachmentId: '',
        attachmentStatus: '',
        message: null,
        main: false,
        newStatus: false,
      },
    ],
  },
  setData: (val: GalleryData[]) => set({ data: val }),
  setFullData: (val: GalleryData | null) => set({ fullData: val }),
  setIsLoading: (val: boolean) => set({ isLoading: val }),
  isLoading: false,
  booleanState: {
    isOpen: false,
    isAllOpen: false,
    isDeleteMode: false,
    isBottomModalOpen: false,
    showMainSwitch: false,
    selectAll: false,
    textModal: false,
    isLoading: false
  },
  setBooleanState: (val: BooleanState) => set({ booleanState: val }),
}));

export default useGalleryStore;
