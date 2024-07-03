import { WepPageData } from "@/type/wepPageType/wepPage";
import { create } from "zustand";

interface wepPage {
    getme: any;
    setGetMee: (val: any) => void
    data: WepPageData[],
    setdata: (val: WepPageData[]) => void;
    galeriya: any
    setGaleriya: (val: any) => void
    servise: any
    setServise: (val: any) => void
  }

  const webPageStore = create<wepPage>((set) => ({
    getme: null,
    setGetMee: (val: any) => set({getme: val}),
    data: [],
    setdata: (val: WepPageData[]) => set({ data: val }),
    galeriya: null,
    setGaleriya: (val: any) => set({galeriya: val}),
    servise: null,
    setServise: (val: any) => set({servise: val})
  }));
  
  export default webPageStore;