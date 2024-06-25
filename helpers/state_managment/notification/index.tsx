import { create } from "zustand";

type CreateNotification = {
  isModal: boolean;
  notification: any;
  onOpen: () => void;
  onClose: () => void;
  setNotification: (notification: any) => void;
};

const NotificationSelect = create<CreateNotification>((set) => ({
  isModal: false,
  notification: {},
  onOpen: () => set({ isModal: true }),
  onClose: () => set({ isModal: false }),
  setNotification: (notification) => set({ notification }),
}));

export default NotificationSelect;