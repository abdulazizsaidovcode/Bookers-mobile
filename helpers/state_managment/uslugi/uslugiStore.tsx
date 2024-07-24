import { create } from 'zustand';

// Define the interfaces
export interface Service {
  id: string;
  name: string;
  distanceMasterCount: number;
  icon?: string;
  onPress?: () => void;
}

export interface Client {
  id: string;
  masterId: string;
  salon: string;
  imageUrl: string;
  name: string;
  zaps: string;
  masterType: string;
  orders: number;
  feedbackCount: number;
  clients: number;
  address: string;
}

export interface CommentData {
  clientId: string | null;
  masterId: string;
  adminId: string | null;
  message: string;
  messageStatus: string;
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
  clientId: string | null;
  setClientId: (val: string | null) => void;
  selectedClient: Client | null;
  setSelectedClient: (client: Client | null) => void;
  commentData: CommentData | null;  // Added
  setCommentData: (data: CommentData | null) => void;  // Added
  services:any | null;
  setServices:(data:any) => void;
}

// Create the Zustand store
const ClientStory = create<ClientAllCategory>((set) => ({
  id: '',
  setId: (val: string) => set({ id: val }),
  name: '',
  setName: (val: string) => set({ name: val }),
  distanceMasterCount: 0,
  setDistanceMasterCount: (val: number) => set({ distanceMasterCount: val }),
  allCategory: [],
  setAllCategory: (val: Service[]) => {
    console.log('Setting allCategory:', val); // Debugging log
    set({ allCategory: val });
  },
  selectedServiceId: null,
  setSelectedServiceId: (id: string | null) => set({ selectedServiceId: id }),
  clientData: null,
  setClientData: (data: any) => set({ clientData: data }),
  clientId: '',
  setClientId: (val: string | null) => set({ clientId: val }),
  selectedClient: null,  // Initialize with null
  setSelectedClient: (client: Client | null) => set({ selectedClient: client }),
  commentData: null,  // Initialize with null
  setCommentData: (data: CommentData | null) => set({ commentData: data }),  // Add method to set comment data
  services:'',
  setServices:(val:string | null) => set({services:val})
}));

export default ClientStory;
