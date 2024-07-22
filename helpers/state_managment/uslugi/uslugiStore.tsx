import { create } from 'zustand';

export interface Service {
  id: string;
  name: string;
  distanceMasterCount: number;
  icon?: string;
  onPress?: () => void;
}

export interface ClientAllCategory {
  id: string;
  setId: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  distanceMasterCount: number;
  setDistanceMasterCount: (val: number) => void;
  allCategory: Service[];
  setAllCategory: (val: Service[]) => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  clientData: any | null;
  setClientData: (data: any) => void;
  clientId:string | null
  setClientId: (id:string | null) => void
}

const ClientStory = create<ClientAllCategory>((set) => ({
  id: '',
  setId: (val: string) => set({ id: val }),
  name: '',
  setName: (val: string) => set({ name: val }),
  distanceMasterCount: 0,
  setDistanceMasterCount: (val: number) => set({ distanceMasterCount: val }),
  allCategory: [],
  setAllCategory: (val: Service[]) => set({ allCategory: val }),
  selectedServiceId: null,
  setSelectedServiceId: (id: string | null) => set({ selectedServiceId: id }),
  clientData: null,
  setClientData: (data: any) => set({ clientData: data }),
  clientId:'',
  setClientId:(val:string | null) => set({clientId:val}),
}));

export default ClientStory;

