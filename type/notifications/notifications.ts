export interface NotificationsStore {
    isMainSwitch: boolean;
    cacelMessage: string;
    windowMessage: string;
    changingMessage: string;
    feedbackMessage: string;
    isReminderEnabled: boolean;
    isChangingEnabled: boolean;
    isCancelEnabled: boolean;
    setIsCancelEnabled: (val: boolean) => void;
    setCacelMessage: (val: string) => void;
    setChangingMessage: (val: string) => void;
    setWindowMessage: (val: string) => void;
    setFeedbackMessage: (val: string) => void;
    setIsReminderEnabled: (val: boolean) => void;
    setIsMainSwitch: (val: boolean) => void;
    setIsChangingEnabled: (val: boolean) => void;
}