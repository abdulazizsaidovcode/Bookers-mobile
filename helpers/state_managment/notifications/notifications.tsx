import { NotificationsAllData, NotificationsStore } from "@/type/notifications/notifications";
import { create } from "zustand";

const useNotificationsStore = create<NotificationsStore>((set) => ({
    isMainSwitch: false,
    isReminderEnabled: false,
    cancelData: {
        id: '',
        isActive: false,
        text: ''
    },
    isChangingEnabled: false,
    changingMessage: '',
    feedbackMessage: '',
    windowMessage: '',
    smsData:  {
        id: '',
        isActive: false,
        text: ''
    },
    setChangingMessage: (val: string) => set({ changingMessage: val }),
    setSmsData: (val: NotificationsAllData) => set({ smsData: val }),
    setFeedbackMessage: (val: string) => set({ feedbackMessage: val }),
    setWindowMessage: (val: string) => set({ windowMessage: val }),
    setIsMainSwitch: (val: boolean) => set({ isMainSwitch: val }),
    setIsReminderEnabled: (val: boolean) => set({ isReminderEnabled: val }),
    setCancelData: (val: NotificationsAllData) => set({ cancelData: val }),
    setIsChangingEnabled: (val: boolean) => set({ isChangingEnabled: val }),
}));

export default useNotificationsStore;
