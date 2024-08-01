import { create } from "zustand";
import { FavouriteOrdersStoreTypes, FavouriteOrdersType } from "@/type/favourite-orders/favourite-orders";

const useFavoutiteOrders = create<FavouriteOrdersStoreTypes>((set) => ({
    masterId: '',
    setMasterId: (data: string) => set({ masterId: data }),
    favouriteOrders: [],
    setFavouriteOrders: (data: FavouriteOrdersType[]) => set({ favouriteOrders: data }),
    isLoading: false,
    setIsLoading: (data: boolean) => set({ isLoading: data }),
    isModal: false,
    setIsModal: (data: boolean) => set({ isModal: data }),
}));

export default useFavoutiteOrders;