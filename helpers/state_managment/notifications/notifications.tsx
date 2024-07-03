import { NotificationsStore } from "@/type/notifications/notifications";
import { create } from "zustand";

const useNotificationsStore = create<NotificationsStore>((set) => ({
    isSwitch: false,
    setIsSwitch: (val: boolean) => set({ isSwitch: val }),
}));

export default useNotificationsStore