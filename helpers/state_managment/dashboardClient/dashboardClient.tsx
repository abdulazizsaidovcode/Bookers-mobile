import { create } from "zustand";

interface DashboardClientState {
  orderId: string | null;
  serviceIds: string[] | null;
  serviceName: string | null;
  orderDate: string | null;
  firstName: string | null;
  lastName: string | null;
  specializations: string[] | null;
  salonName: string | null;
  userAttachmentId: string | null;
  feedbackCount: number | null;
  orderPrice: number | null;
  address: string | null;
  phoneNumber: string | null;
  lng: number | null;
  lat: number | null;
  orderCount: number | null;
  clientCount: number | null;
  instagram: string | null;
  telegram: string | null;
  setOrderId: (orderId: string) => void;
  setServiceIds: (serviceIds: string[]) => void;
  setServiceName: (serviceName: string) => void;
  setOrderDate: (orderDate: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setSpecializations: (specializations: string[]) => void;
  setSalonName: (salonName: string) => void;
  setUserAttachmentId: (userAttachmentId: string) => void;
  setFeedbackCount: (feedbackCount: number) => void;
  setOrderPrice: (orderPrice: number) => void;
  setAddress: (address: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setLng: (lng: number) => void;
  setLat: (lat: number) => void;
  setOrderCount: (orderCount: number) => void;
  setClientCount: (clientCount: number) => void;
  setInstagram: (instagram: string) => void;
  setTelegram: (telegram: string) => void;
}

const useDashboardClientStore = create<DashboardClientState>((set) => ({
  orderId: null,
  serviceIds: null,
  serviceName: null,
  orderDate: null,
  firstName: null,
  lastName: null,
  specializations: null,
  salonName: null,
  userAttachmentId: null,
  feedbackCount: null,
  orderPrice: null,
  address: null,
  phoneNumber: null,
  lng: null,
  lat: null,
  orderCount: null,
  clientCount: null,
  instagram: null,
  telegram: null,
  setOrderId: (orderId) => set({ orderId }),
  setServiceIds: (serviceIds) => set({ serviceIds }),
  setServiceName: (serviceName) => set({ serviceName }),
  setOrderDate: (orderDate) => set({ orderDate }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setSpecializations: (specializations) => set({ specializations }),
  setSalonName: (salonName) => set({ salonName }),
  setUserAttachmentId: (userAttachmentId) => set({ userAttachmentId }),
  setFeedbackCount: (feedbackCount) => set({ feedbackCount }),
  setOrderPrice: (orderPrice) => set({ orderPrice }),
  setAddress: (address) => set({ address }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setLng: (lng) => set({ lng }),
  setLat: (lat) => set({ lat }),
  setOrderCount: (orderCount) => set({ orderCount }),
  setClientCount: (clientCount) => set({ clientCount }),
  setInstagram: (instagram) => set({ instagram }),
  setTelegram: (telegram) => set({ telegram }),
}));

export default useDashboardClientStore;
