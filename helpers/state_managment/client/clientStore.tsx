import {create} from 'zustand'
import {Client} from "@/type/client";

const clientStore = create<Client>((set) => ({
    isClientModal: false,
    setIsClientModal: (val: boolean) => set({isClientModal: val}),
}))

export default clientStore