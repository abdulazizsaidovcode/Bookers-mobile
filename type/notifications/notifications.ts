export interface NotificationsStore {
    isMainSwitch: boolean;
    windowMessage: string;
    changingMessage: string;
    smsData: NotificationsAllData;
    feedbackMessage: string;
    isReminderEnabled: boolean;
    isChangingEnabled: boolean;
    cancelData: NotificationsAllData;
    setCancelData: (val: NotificationsAllData) => void;
    setSmsData: (val: NotificationsAllData) => void;
    setChangingMessage: (val: string) => void;
    setWindowMessage: (val: string) => void;
    setFeedbackMessage: (val: string) => void;
    setIsReminderEnabled: (val: boolean) => void;
    setIsMainSwitch: (val: boolean) => void;
    setIsChangingEnabled: (val: boolean) => void;
}

export interface NotificationsAllData {
    id: string;
    isActive: boolean;
    text: string;
}