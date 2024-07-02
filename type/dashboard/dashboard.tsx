export interface DashboardState {
    waitingData: DashboardWaitingOrder[],
    dailyTimeData: DashboardDailyTimeOrders[],
    mainStatisticData: DashboardMainStatistic,
    setDailyTimeData: (data: DashboardDailyTimeOrders[]) => void;
    setWaitingData: (data: DashboardWaitingOrder[]) => void;
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
    orderId: string,
    paid: number,
    clientStatus: string[],
    clientName: string,
    categoryName: string,
    clientAttachmentId: string,
    orderDate: string,
    request: string
}