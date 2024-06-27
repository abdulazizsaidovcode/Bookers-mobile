import {create} from 'zustand'
import {
    AgeData,
    Client,
    ClientAddressBook,
    ClientNotVisit,
    ClientStatus, ClientStoppedVisiting,
    DistrictData, NewClient, PermanentClient,
    RegionData,
} from "@/type/client/client";

const clientStore = create<Client>((set) => ({
    isClientModal: false,
    setIsClientModal: (val: boolean) => set({isClientModal: val}),
    selectedClientList: [],
    setSelectedClientList: (val: any) => set({selectedClientList: val}),
    statusData: null,
    setStatusData: (val: ClientStatus | null) => set({statusData: val}),
    addressBookData: null,
    setAddressBookData: (val: ClientAddressBook[] | null) => set({addressBookData: val}),
    updateClientDef: {
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
    regionData: null,
    setRegionData: (val: RegionData[] | null) => set({regionData: val}),
    districtData: null,
    setDistrictData: (val: DistrictData[] | null) => set({districtData: val}),
    attachmentID: null,
    setAttachmentID: (val: null | string) => set({attachmentID: val}),
    allClientsList: null,
    setAllClients: (val: any | null) => set({allClientsList: val}),
    clientNotVisit: null,
    setClientNotVisit: (val: null | ClientNotVisit[]) => set({clientNotVisit: val}),
    clientStoppedVisiting: null,
    setClientStoppedVisit: (val: null | ClientStoppedVisiting[]) => set({clientStoppedVisiting: val}),
    newClient: null,
    setNewClient: (val: null | NewClient[]) => set({newClient: val}),
    permanentClient: null,
    setPermanentClient: (val: null | PermanentClient[]) => set({permanentClient: val}),
}))

export default clientStore