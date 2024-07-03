import { NotificationsStore } from "@/type/notifications/notifications";
import { create } from "zustand";

const useNotificationsStore = create<NotificationsStore>((set) => ({
    isMainSwitch: false,
    isReminderEnabled: false,
    isCancelEnabled: false,
    isChangingEnabled: false,
    cacelMessage: '',
    changingMessage: '',
    feedbackMessage: '',
    windowMessage: '',
    setChangingMessage: (val: string) => set({ changingMessage: val }),
    setFeedbackMessage: (val: string) => set({ feedbackMessage: val }),
    setWindowMessage: (val: string) => set({ windowMessage: val }),
    setCacelMessage: (val: string) => set({ cacelMessage: val }),
    setIsMainSwitch: (val: boolean) => set({ isMainSwitch: val }),
    setIsReminderEnabled: (val: boolean) => set({ isReminderEnabled: val }),
    setIsCancelEnabled: (val: boolean) => set({ isCancelEnabled: val }),
    setIsChangingEnabled: (val: boolean) => set({ isChangingEnabled: val }),
}));

export default useNotificationsStore