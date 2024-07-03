import { NotificationsAllData, NotificationsStore } from "@/type/notifications/notifications";
import { create } from "zustand";

const useNotificationsStore = create<NotificationsStore>((set) => ({
    isMainSwitch: false,
    isReminderEnabled: false,
    feedbackData: {
        text: '',
        id: '',
        isActive: false
    },
    windowData: {
        id: '',
        isActive: false,
        text: ''
    },
    cancelData: {
        id: '',
        isActive: false,
        text: ''
    },
    changingData: {
        id: '',
        isActive: false,
        text: ''
    },
    smsData: {
        id: '',
        isActive: false,
        text: ''
    },
    setCancelData: (val: NotificationsAllData) => set({ cancelData: val }),
    setSmsData: (val: NotificationsAllData) => set({ smsData: val }),
    setChangingData: (val: NotificationsAllData) => set({ changingData: val }),
    setWindowData: (val: NotificationsAllData) => set({ windowData: val }),
    setFeedbackData: (val: NotificationsAllData) => set({ feedbackData: val }),
    setIsMainSwitch: (val: boolean) => set({ isMainSwitch: val }),
    setIsReminderEnabled: (val: boolean) => set({ isReminderEnabled: val }),
}));

export default useNotificationsStore;