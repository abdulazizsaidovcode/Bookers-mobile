export interface FavouriteOrdersType {
    id: string,
    firstName: string,
    salonName: string,
    orderCount: number,
    clientCount: number,
    lat: number,
    lng: number,
    district: string,
    street: string,
    house: string,
    attachmentId: string | null,
    favoriteCount: number,
    nearestOrder: string | null,
    categoryNames: string[],
    attachmentCount: number,
    gender: string,
    servicePrice: number,
    nextEntryDate: string | null
}

export interface FavouriteOrdersStoreTypes {
    masterId: string,
    setMasterId: (val: string) => void;
    isModal: boolean,
    setIsModal: (val: boolean) => void;
    isLoading: boolean,
    setIsLoading: (val: boolean) => void;
    favouriteOrders: FavouriteOrdersType[];
    setFavouriteOrders: (val: FavouriteOrdersType[]) => void;
}