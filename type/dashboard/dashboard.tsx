export interface DashboardState {
    waitingData: DashboardWaitingOrder[],
    todayGraficData: TodayWorkGrafic,
    hallData: DashboardHallingOrder[],
    isConfirmModal: boolean;
    isRejectedModal: boolean;
    dailyTimeData: DashboardDailyTimeOrders[],
    mainStatisticData: DashboardMainStatistic,
    isLoading: boolean,
    setIsLoading: (val: boolean) => void,
    setDailyTimeData: (data: DashboardDailyTimeOrders[]) => void;
    setWaitingData: (data: DashboardWaitingOrder[]) => void;
    setTodayGraficData: (data: TodayWorkGrafic) => void;
    setHallData: (data: DashboardHallingOrder[]) => void;
    setConfirmIsModal: (isDel: boolean) => void;
    setRejectedIsModal: (isDel: boolean) => void;
    setMainStatisticData: (data: DashboardMainStatistic) => void;
}

export interface DashboardDailyTimeOrders {
    type: string,
    time: string,
}

export interface DashboardMainStatistic {
    completedSessions: string,
    incomeToday: string,
    rejectedOrder: number,
    incomeThisMonth: number
}

export interface DashboardWaitingOrder {
    id: string,
    paid: number,
    clientStatus: string[],
    fullName: string,
    serviceName: string,
    clientAttachmentId: string,
    orderDate: string,
    request: string,
    startTime: string,
    finishTime: string,
}

export interface TodayWorkGrafic {
    from: string;
    end: string;
}

export interface DashboardHallingOrder {
    id: string,
    paid: number,
    clientStatus: string[],
    fullName: string,
    serviceName: string,
    clientAttachmentId: string,
    orderDate: string,
    request: string
}

export interface ScheduleSectionProps {
    dailyTimeData: DashboardDailyTimeOrders[];
    regularVisitCount: number;
    todayGraficData: TodayWorkGrafic;
    notVisitCount: number;
    vipCientsCount: number;
    newClientsCount: number;
    workPending: boolean;
}

export interface StatisticsProps {
    mainStatisticData: any;
    chartNumerator: number;
    chartDenominator: number;
    statisticNumerator: string;
    statisticDenominator: string;
}
export interface BookingRequestsProps {
    waitingData: DashboardWaitingOrder[];
    toggleConfirmModal: () => void;
    toggleRejectedModal: () => void;
    isConfirmModal: boolean;
    isRejectedModal: boolean;
    setWaitingData: (val: DashboardWaitingOrder[]) => void
    status: boolean

}

export interface BookingRequestsHallProps {
    hallData: DashboardHallingOrder[];
    toggleConfirmModal: () => void;
    toggleRejectedModal: () => void;
    isConfirmModal: boolean;
    isRejectedModal: boolean;
    setHallData: (val: DashboardHallingOrder[]) => void
    status: boolean
}

export interface RenderBookingRequestProps {
    item: DashboardWaitingOrder;
    toggleConfirmModal: (id: string) => void;
    toggleRejectedModal: (id: string) => void;
    setWaitingData: (val: DashboardWaitingOrder[]) => void
    setHallData: (val: DashboardHallingOrder[]) => void
    isRejectedModal: boolean;
    isConfirmModal: boolean;
    status: boolean
}

export interface StatusContainerProps {
    regularVisitCount: number;
    notVisitCount: number;
    vipCientsCount: number;
    newClientsCount: number;
}