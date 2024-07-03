export interface NotificationsStore {
    isMainSwitch: boolean;
    windowData: NotificationsAllData;
    smsData: NotificationsAllData;
    feedbackData: NotificationsAllData;
    isReminderEnabled: boolean;
    changingData: NotificationsAllData;
    cancelData: NotificationsAllData;
    setCancelData: (val: NotificationsAllData) => void;
    setSmsData: (val: NotificationsAllData) => void;
    setChangingData: (val: NotificationsAllData) => void;
    setWindowData: (val: NotificationsAllData) => void;
    setFeedbackData: (val: NotificationsAllData) => void;
    setIsReminderEnabled: (val: boolean) => void;
    setIsMainSwitch: (val: boolean) => void;
  }

export interface NotificationsAllData {
    id: string;
    isActive: boolean;
    text: string;
}