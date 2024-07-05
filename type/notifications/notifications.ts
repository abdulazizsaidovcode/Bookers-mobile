export interface NotificationsStore {
    appoinmentData: NotificationsAllData;
    isMainSwitch: boolean;
    windowData: NotificationsAllData;
    smsData: NotificationsAllData;
    feedbackData: NotificationsAllData;
    isAppoinmentModal: boolean;
    changingData: NotificationsAllData;
    cancelData: NotificationsAllData;
    setCancelData: (val: NotificationsAllData) => void;
    setSmsData: (val: NotificationsAllData) => void;
    setChangingData: (val: NotificationsAllData) => void;
    setWindowData: (val: NotificationsAllData) => void;
    setFeedbackData: (val: NotificationsAllData) => void;
    setIsAppoinmentModal: (val: boolean) => void;
    setIsMainSwitch: (val: boolean) => void;
    setAppoinmentData: (val: NotificationsAllData) => void;
  }

export interface NotificationsAllData {
    id: string;
    isActive?: boolean;
    text: string;
    hour?: number,
    minute?: number,
}