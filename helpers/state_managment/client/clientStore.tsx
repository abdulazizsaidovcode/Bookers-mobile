import {create} from 'zustand'
import {AgeData, Client, ClientAddressBook, ClientStatus, UpdateClient} from "@/type/client/client";

const clientStore = create<Client>((set) => ({
    isClientModal: false,
    setIsClientModal: (val: boolean) => set({isClientModal: val}),
    selectedClientList: [],
    setSelectedClientList: (val: any) => set({selectedClientList: val}),
    statusData: null,
    setStatusData: (val: ClientStatus | null) => set({statusData: val}),
    addressBookData: null,
    setAddressBookData: (val: ClientAddressBook[] | null) => set({addressBookData: val}),
    updateClient: {
        firstName: '',
        lastName: '',
        job: '',
        ageId: '',
        phoneNumber: '',
        gender: '',
        birthDate: '',
        districtId: '',
        regionId: '',
        attachmentId: ''
    },
    setUpdateClient: (val: any) => set({updateClient: val}),
    ageData: null,
    setAgeData: (val: AgeData[] | null) => set({ageData: val}),
}))

export default clientStore