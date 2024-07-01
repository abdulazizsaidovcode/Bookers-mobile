import { WepPageData } from "@/type/wepPageType/wepPage";
import { create } from "zustand";

interface wepPage {
    getme: any;
    setGetMee: (val: any) => void
    data: WepPageData[],
    setdata: (val: WepPageData[]) => void;
  }

  const webPageStore = create<wepPage>((set) => ({
    getme: null,
    setGetMee: (val: any) => set({getme: val}),
    data: [],
    setdata: (val: WepPageData[]) => set({ data: val }),
  }));
  
  export default webPageStore;