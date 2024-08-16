import { create } from 'zustand';


// Define the interfaces
export interface Service {
  id: string;
  name: string;
  distanceMasterCount: number;
  attachmentId?: string | undefined;
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
export interface ClientData {
  attachmentId:  string,
  clientCount: number,
  district: string,
  feedbackCount: number,
  fullName: string,
  house: string,
  id: string,
  lat: string,
  lng: string,
  mainPhoto: string,
  masterSpecialization: string,
  nextEntryDate: string,
  orderCount: number,
  phone: string,
  salonName: string,
  street: string
}

export interface CommentData {
  clientId: string | null;
  masterId: string;
  adminId: string | null;
  message: string;
  messageStatus: string;
}
export interface ClientCardProps {
  salon: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  zaps: string | undefined;
  masterType: string | undefined;
  orders: number | undefined;
  clients: number | undefined;
  address: string | undefined;
  feedbackCount: number | undefined;
  services: any
  onPress?: () => void;
  locationIcon?: React.ReactNode
  btntext?: string | undefined;
  anotherIcon?: React.ReactNode
  phoneIcon?: React.ReactNode
  phone: string
};

export interface ServiceCategory {
  id: string;
  name: string;
  genderId: number[];
  price: number;
  serviceTime: 90,
  description: string,
  attachmentId: string | null,
  servisece: Service[];
  paymentPercent: 0,
  paymentPrice: 0,
  message: string,
  serviceStatus: string,
  active: false
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
  clientData: ClientData | null;
  setClientData: (data: any) => void;
  clientId: string | null;
  setClientId: (val: string | null) => void;
  selectedClient: Client | null;
  setSelectedClient: (client: any) => void;
  commentData: CommentData | null;
  setCommentData: (data: CommentData | null) => void;
  services: any | null;
  setServices: (data: any) => void;
  activeTab: string | null;
  setActiveTab: (val: string | null) => void;
  masterGallery: any[];
  setMasterGallery: (data: any[]) => void;
  feedbackForMaster: []
  setFeedbackForMaster: (data: []) => void;
  masterServis: ServiceCategory[]
  setmasterServis: (data: []) => void;
  selectedCategoryId: string[] | null;
  setSelectedCategoryId: (val: string[]) => void;
  categoryId: string | null
  setCategoryId: (val: string | null) => void;
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
  setAllCategory: (val: Service[]) => set({ allCategory: val }),
  selectedServiceId: null,
  setSelectedServiceId: (id: string | null) => set({ selectedServiceId: id }),
  clientData: null,
  setClientData: (data: any) => set({ clientData: data }),
  clientId: '',
  setClientId: (val: string | null) => set({ clientId: val }),
  selectedClient: null,
  setSelectedClient: (client: Client | null) => set({ selectedClient: client }),
  commentData: null,
  setCommentData: (data: CommentData | null) => set({ commentData: data }),
  services: '',
  setServices: (val: string | null) => set({ services: val }),
  activeTab: '',
  setActiveTab: (val: string | null) => set({ activeTab: val }),
  masterGallery: [],
  setMasterGallery: (data: any[]) => set({ masterGallery: data }),
  feedbackForMaster: [],
  setFeedbackForMaster: (data: []) => set({ feedbackForMaster: data }),
  masterServis: [],
  setmasterServis: (data: any) => set({ masterServis: data }),
  selectedCategoryId: [],
  setSelectedCategoryId: (val: string[]) => set({ selectedCategoryId: val }),
  categoryId: '',
  setCategoryId: (val: string | null) => set({ categoryId: val }),
}));

export default ClientStory;

