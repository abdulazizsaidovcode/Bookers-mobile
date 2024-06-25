import {create} from 'zustand'
import {Client, ClientAddressBook, ClientStatus} from "@/type/client/client";

const clientStore = create<Client>((set) => ({
    isClientModal: false,
    setIsClientModal: (val: boolean) => set({isClientModal: val}),
    selectedClientList: [],
    setSelectedClientList: (val: any) => set({selectedClientList: val}),
    statusData: null,
    setStatusData: (val: ClientStatus | null) => set({statusData: val}),
    addressBookData: null,
    setAddressBookData: (val: ClientAddressBook[] | null) => set({addressBookData: val}),
}))

export default clientStore