export interface DashboardState {
    waitingData: DashboardWaitingOrder[],
    hallData: DashboardHallingOrder[],
    isModal: boolean;
    dailyTimeData: DashboardDailyTimeOrders[],
    mainStatisticData: DashboardMainStatistic,
    setDailyTimeData: (data: DashboardDailyTimeOrders[]) => void;
    setWaitingData: (data: DashboardWaitingOrder[]) => void;
    setHallData: (data: DashboardHallingOrder[]) => void;
    setIsModal: (isDel: boolean) => void;
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

export interface DashboardHallingOrder {
    orderId: string,
    paid: number,
    clientStatus: string[],
    clientName: string,
    categoryName: string,
    clientAttachmentId: string,
    orderDate: string,
    request: string
}

export interface ScheduleSectionProps {
    dailyTimeData: DashboardDailyTimeOrders[];
    regularVisitCount: number;
    notVisitCount: number;
    vipCientsCount: number;
    newClientsCount: number;
}

export interface StatisticsProps {
    mainStatisticData: any;
    chartNumerator: string;
    chartDenominator: string;
    statisticNumerator: string;
    statisticDenominator: string;
}
export interface BookingRequestsProps {
	waitingData: DashboardWaitingOrder[];
	toggleConfirmModal: () => void;
	isModal: boolean;
	setWaitingData: (val: DashboardWaitingOrder[]) => void
}

export interface BookingRequestsHallProps {
	hallData: DashboardHallingOrder[];
	toggleConfirmModal: () => void;
	isModal: boolean;
	setHallData: (val: DashboardHallingOrder[]) => void
}

export interface RenderBookingRequestProps {
	item: DashboardWaitingOrder;
	toggleConfirmModal: () => void;
	setWaitingData: (val: DashboardWaitingOrder[]) => void
	isModal: boolean;

}

export interface StatusContainerProps {
	regularVisitCount: number;
	notVisitCount: number;
	vipCientsCount: number;
	newClientsCount: number;
}