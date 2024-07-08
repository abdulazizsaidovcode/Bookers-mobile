import { WepPageData } from "@/type/wepPageType/wepPage";
import { create } from "zustand";

interface wepPage {
    getme: any;
    setGetMee: (val: any) => void
    data: WepPageData[],
    setdata: (val: WepPageData[]) => void;
    galeriya: any
    setGaleriya: (val: any) => void
    galeriyaDetail: any
    setGaleriyaDetail: (val: any) => void
    servise: any
    setServise: (val: any) => void
    category: any
    setCategory: (val: any) => void
    categoryId: any
    setCategoryId: (val: any) => void
    specialization: any
    setspecialization: (val: any) => void
    address: any
    setAddress: (val: any) => void
  }

  const webPageStore = create<wepPage>((set) => ({
    getme: null,
    setGetMee: (val: any) => set({getme: val}),
    data: [],
    setdata: (val: WepPageData[]) => set({ data: val }),
    galeriya: null,
    setGaleriya: (val: any) => set({galeriya: val}),
    galeriyaDetail: null,
    setGaleriyaDetail: (val: any) => set({galeriyaDetail: val}),
    servise: null,
    setServise: (val: any) => set({servise: val}),
    category: null,
    setCategory: (val: any) => set({category: val}),
    categoryId: null,
    setCategoryId: (val: any) => set({categoryId: val}),
    specialization: null,
    setspecialization: (val: any) => set({specialization: val}),
    address: null,
    setAddress: (val: any) => set({address: val})
  }));
  
  export default webPageStore;