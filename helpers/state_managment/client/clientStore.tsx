import {create} from 'zustand'
import {Client} from "@/type/client/client";

const clientStore = create<Client>((set) => ({
    isClientModal: false,
    setIsClientModal: (val: boolean) => set({isClientModal: val}),
    selectedClientList: [],
    setSelectedClientList: (val: any) => set({selectedClientList: val}),
}))

export default clientStore