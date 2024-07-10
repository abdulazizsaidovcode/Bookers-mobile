export interface Client {
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    isClientModal: boolean;
    setIsClientModal: (val: boolean) => void;
    selectedClientList: number[];
    setSelectedClientList: (val: any) => void;
    statusData: ClientStatus | null
    setStatusData: (val: ClientStatus | null) => void;
    addressBookData: null | ClientAddressBook[]
    setAddressBookData: (val: ClientAddressBook[] | null) => void;
    updateClientDef: UpdateClient
    updateClient: UpdateClient
    setUpdateClient: (val: any) => void;
    ageData: AgeData[] | null
    setAgeData: (val: AgeData[] | null) => void;
    regionData: RegionData[] | null
    setRegionData: (val: RegionData[] | null) => void;
    districtData: DistrictData[] | null
    setDistrictData: (val: DistrictData[] | null) => void;
    attachmentID: null | string
    setAttachmentID: (val: null | string) => void;
    allClientsList: AllClient[] | null
    setAllClients: (val: AllClient[] | null) => void;
    clientNotVisit: ClientNotVisit[] | null
    setClientNotVisit: (val: ClientNotVisit[] | null) => void;
    clientStoppedVisiting: null | ClientStoppedVisiting[]
    setClientStoppedVisit: (val: ClientStoppedVisiting[] | null) => void;
    newClient: NewClient[] | null
    setNewClient: (val: NewClient[] | null) => void;
    permanentClient: PermanentClient[] | null
    setPermanentClient: (val: PermanentClient[] | null) => void;
    services: any[] | null;
    setServices: (services: any[] | null) => void;
    historyCountData: null | HistoryCount;
    setHistoryCountData: (val: HistoryCount | null) => void;
    upcomingData: HistorySessions[] | null
    setUpcomingData: (val: HistorySessions[] | null) => void;
    pastData: HistorySessions[] | null
    setPastData: (val: HistorySessions[] | null) => void;
    canceledData: HistorySessions[] | null
    setCanceledData: (val: HistorySessions[] | null) => void;
    refreshing: boolean;
    setRefreshing: (val: boolean) => void;
}

export interface AllClient {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    attachmentId: null | string
    orderDate: null | string
    orderTime: null | string
    clientBirthday: null | string
    telegram: null | string
    instagram: null | string
    nickname: null | string
}

export interface ClientStatus {
    fromTheAddressBook: number
    allClient: number
    stoppedVisiting: number
    didNotVisit: number
    newClient: number
    permanent: number
}

export interface ClientAddressBook {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    attachmentId: null | string
    orderDate: null | string
    orderTime: null | string
    clientBirthday: null | string
}

export interface UpdateClient {
    firstName: string
    lastName: string
    job: string
    ageId: number | string
    phoneNumber: string
    gender: boolean | null | string
    birthDate: string | null
    districtId: number | string
    regionId: number | string
    attachmentId: string | null
    clientPreferences: string | null
}

export interface AgeData {
    id: number
    ageRange: string
}

export interface RegionData {
    id: number
    name: string
}

export interface DistrictData {
    id: number
    name: string
    regionId: number
}

export interface ClientNotVisit {
    id: string
    firstName: string
    lastName: string
    phoneNumber: string
    gender: string | null
    birthDate: string | null
    role: string
    telegram: null | string
    ageId: null | number
    email: null | string
    status: string | null
    specialist: null | string
    comment: null | string
    attachmentId: null | string
}

export interface ClientStoppedVisiting {
    "id": string
    "firstName": string
    "lastName": string
    "phoneNumber": string
    "gender": string
    "birthDate": string
    "role": string
    "telegram": null | string
    "ageId": number | null
    "email": null | string
    "status": string
    "specialist": null | string
    "comment": null | string
    "attachmentId": null | string
}

export interface NewClient {
    id: string
    firstName: string
    lastName: string | null
    phoneNumber: string
    gender: string | null
    birthDate: string | null
    role: string
    telegram: null | string
    ageId: null | string
    email: null | string
    status: string
    specialist: null | string
    comment: null | string
    attachmentId: null | string
}

export interface PermanentClient {
    "id": string
    "firstName": string
    "lastName": string | null
    "phoneNumber": string
    "attachmentId": null | string
    "orderDate": null | string
    "orderTime": null | string
    "clientBirthday": null | string
}

export interface HistoryCount {
    upcomingSessions: number
    pastSessions: number
    cancelledSessions: number
}

export interface HistorySessions {
    "id": string
    "fullName": string
    "clientStatus": string[]
    "phone": string
    "serviceName": string
    "servicePrice": number
    "serviceHour": number
    "serviceMinute": number
    "orderDate": string
    "prePayment": number
    "paid": number
    "toPay": number
    "startTime": string
    "finishTime": string
    "notifyForHour": number
    "notifyForMinute": number
    "orderStatus": string
    "hallStatus": string
    "attachmentId": null | string
}


export interface ClientData {
    id: number;
    name: string;
    phone: string;
    image: string;
}

export interface ClientItemProps {
    client: ClientData;
    isSelected: boolean;
    onSelect: (id: number) => void;
}


//vaqtinchalik data
export const clientsData: ClientData[] = [
    {id: 1, name: 'Гузаль Шерматова', phone: '+998 93 123-45-67', image: 'https://via.placeholder.com/150'},
    {id: 2, name: 'Севара Юнусова', phone: '+998 93 171-63-80', image: 'https://via.placeholder.com/150'},
    {id: 3, name: 'Ноила Азизова', phone: '+998 93 455-45-67', image: 'https://via.placeholder.com/150'},
    {id: 4, name: 'Шахло Акбарова', phone: '+998 93 874-63-90', image: 'https://via.placeholder.com/150'},
    {id: 5, name: 'Максуд Акбаров', phone: '+998 93 455-45-67', image: 'https://via.placeholder.com/150'},
    {id: 6, name: 'Нодир Расулов', phone: '+998 93 874-63-90', image: 'https://via.placeholder.com/150'},
];
