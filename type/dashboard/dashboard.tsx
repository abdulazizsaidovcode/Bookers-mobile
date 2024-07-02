export interface DashboardState {
    data: DashboardDailyTimeOrders[],
    mainStatisticData: DashboardMainStatistic,
    setData: (data: DashboardDailyTimeOrders[]) => void;
    setMainStatisticData: (data: DashboardMainStatistic) => void;
}

export interface DashboardDailyTimeOrders {
    type: string,
    times: string[],
    count: number
}

export interface DashboardMainStatistic {
    completedSessions: string,
    incomeToday: string,
    rejectedOrder: number,
    incomeThisMonth: number
}